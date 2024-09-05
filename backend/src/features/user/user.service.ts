import { eventEmitter } from '@utils/event.emitter';
import { AuthRepository } from '../auth/auth.repository';
import { Role, User } from '@prisma/client';

export class UserService {
  private authRepository = new AuthRepository();

  async getAllUsers(): Promise<User[]> {
    return this.authRepository.findAllUsers();
  }

  async updateUserRole(userId: number, role: Role): Promise<User> {
    const user = await this.authRepository.findById(userId);
    eventEmitter.emitEvent("onUserRoleUpdated", {user, role});
    return this.authRepository.updateUser(userId, { role });
  }
}