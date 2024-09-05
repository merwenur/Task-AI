import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository';
import { User } from '@prisma/client';
import MailService from '@features/mailer/mail.service';
import { eventEmitter } from '@utils/event.emitter';

export class AuthService {
  private authRepository = new AuthRepository();
  private mailService = new MailService();

  async register(name: string, email: string, password: string): Promise<User> {
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser) {
      throw new Error('Email is already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.authRepository.createUser({ name, email, password: hashedPassword });

    eventEmitter.emitEvent("onUserRegistered", user);
    return user;
  }

  async sendActivationEmail(user: User): Promise<void> {
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    console.log("Email sent to: ", user.email);
    await this.mailService.userActivationEmail({ to: user.email, hash: token });
    eventEmitter.emitEvent("onActivationEmailSent", user);
  }

  async confirmEmail(userId: number): Promise<void> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new Error('User not found');
    if (user.emailVerified) throw new Error('Email already verified');
    await this.authRepository.updateUser(userId, { emailVerified: new Date() });
    eventEmitter.emitEvent("onEmailConfirmed", user);
  }

  async login(email: string, password: string): Promise<User> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) throw new Error('User not found');
    if (!user.emailVerified) throw new Error('Email not verified');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    eventEmitter.emitEvent("onUserLoggedIn", user);
    return user;
  }

  async resetPassword(user: User, newPassword: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.authRepository.updatePassword(user.id, hashedPassword);
    eventEmitter.emitEvent("onPasswordReset", user);
  }

  async sendResetPasswordEmail(email: string): Promise<void> {
    const user = await this.authRepository.findByEmail(email);
    if (!user) throw new Error('User not found');
  
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  
    await this.mailService.forgotPassword({ to: email, hash: token, tokenExpires: 3600 });
    eventEmitter.emitEvent("onResetPasswordEmailSent", user);
  }

  async getProfile(userId: number): Promise<User> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new Error('User not found');
    eventEmitter.emitEvent("onProfileViewed", user);
    return user;
  }
  
  async updateProfile(userId: number, data: Partial<User>): Promise<User> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new Error('User not found');
    eventEmitter.emitEvent("onProfileUpdated", user);
    return this.authRepository.updateUser(userId, data);
  }

  async updateEmail(userId: number, email: string): Promise<void> {
    const user = await this.authRepository.findById(userId);
    if (!user) throw new Error('User not found');
  
    const existingUser = await this.authRepository.findByEmail(email);
    if (existingUser && existingUser.id !== userId) {
      throw new Error('Email is already in use by another user');
    }
  
    const token = jwt.sign({ userId: user.id, newEmail: email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    eventEmitter.emitEvent("onEmailUpdateRequested", user);
    await this.mailService.confirmNewEmail({ to: email, hash: token });
  }
  
  async confirmNewEmail(token: string): Promise<User> {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: number, newEmail: string };
    const user = await this.authRepository.findById(decoded.userId);
    if (!user) throw new Error('User not found');
    eventEmitter.emitEvent("onEmailUpdateConfirmed", user);
    return this.authRepository.updateUser(decoded.userId, { email: decoded.newEmail });
  }
}