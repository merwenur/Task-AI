import { PrismaClient, File } from '@prisma/client';

export class FileRepository {
  private prisma: PrismaClient = new PrismaClient();

  async createFile(data: { filename: string; filepath: string; mimetype: string; size: number }): Promise<File> {
    return this.prisma.file.create({ data });
  }

  async getFileById(id: number): Promise<File | null> {
    return this.prisma.file.findUnique({ where: { id } });
  }

  async updateFile(id: number, data: Partial<File>): Promise<File> {
    return this.prisma.file.update({ where: { id }, data });
  }

  async deleteFile(id: number): Promise<File> {
    return this.prisma.file.delete({ where: { id } });
  }

  async getAllFiles(): Promise<File[]> {
    return this.prisma.file.findMany();
  }
}