import { FileRepository } from './file.repository';
import { File } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

export class FileService {
  private fileRepository = new FileRepository();
  private uploadDir = path.join(__dirname, '../../../uploads');
  private baseUrl = 'http://localhost:4000/api/files'; // Base URL for file access

  async uploadFile(file: Express.Multer.File): Promise<void> {
    const filePath = path.join(this.uploadDir, file.originalname); // Use originalname instead of filename

    await fs.writeFile(filePath, file.buffer);

    await this.fileRepository.createFile({
      filename: file.originalname,
      filepath: filePath,
      mimetype: file.mimetype,
      size: file.size,
    });
  }

  async deleteFile(id: number): Promise<void> {
    const file = await this.fileRepository.getFileById(id);
    if (!file) throw new Error('File not found');

    await fs.unlink(file.filepath);
    await this.fileRepository.deleteFile(id);
  }

  public async getFileById(id: number, includeBuffer: boolean) {
    const file = await this.fileRepository.getFileById(id);
    if (!file) throw new Error('File not found');

    if (includeBuffer) {
      const filePath = path.resolve(file.filepath);
      const buffer = await fs.readFile(filePath);
      return { ...file, buffer };
    }

    return file;
  }

  async updateFile(id: number, newFile?: Express.Multer.File): Promise<void> {
    const file = await this.fileRepository.getFileById(id);
    if (!file) throw new Error('File not found');

    if (newFile) {
      const newFilePath = path.join(this.uploadDir, newFile.originalname);
      await fs.writeFile(newFilePath, newFile.buffer);

      // Eğer dosya ismi aynı değilse eski dosyayı sil
      if (file.filepath !== newFilePath) {
        await fs.unlink(file.filepath);
      }

      const data = {
        filename: newFile.originalname,
        filepath: newFilePath,
        mimetype: newFile.mimetype,
        size: newFile.size,
      };
      await this.fileRepository.updateFile(id, data);
    } else {
      throw new Error('No file provided for update');
    }
  }

  async getAllFiles(): Promise<File[]> {
    const files = await this.fileRepository.getAllFiles();
    return files.map(file => ({
        ...file,
        url: `${this.baseUrl}/${file.id}/buffer`
      }));
  }
}