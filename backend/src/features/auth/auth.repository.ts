import { PrismaClient, User } from '@prisma/client';

export class AuthRepository {
  private prisma: PrismaClient = new PrismaClient();

  async findAllUsers(): Promise<User[]> {
    return this.prisma.user.findMany();
  }

  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async createUser(data: { name: string; email: string; password: string }): Promise<User> {
    return this.prisma.user.create({ data });
  }

  async updateUser(id: number, data: Partial<User>): Promise<User> {
    return this.prisma.user.update({ where: { id }, data });
  }

  async updatePassword(id: number, password: string): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: { password } });
  }

  async confirmEmail(id: number): Promise<User> {
    return this.prisma.user.update({ where: { id }, data: { emailVerified: new Date() } });
  }
}
