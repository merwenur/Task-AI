import { Request, Response } from 'express';
import { FileService } from './file.service';
import { respond } from '@utils/http.handler';

class FileController {
  private fileService = new FileService();

  public uploadFile = async (req: Request, res: Response) => {
    try {
      if (!req.file) throw new Error('File is required');
      await this.fileService.uploadFile(req.file);
      return respond({
        res,
        message: 'File uploaded successfully',
        statusCode: 201,
        success: true,
      });
    } catch (err: any) {
      return respond({
        res,
        message: err.message,
        statusCode: 400,
        success: false,
      });
    }
  };

  public updateFile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.fileService.updateFile(Number(id), req.file);
      return respond({
        res,
        message: 'File updated successfully',
        statusCode: 200,
        success: true,
      });
    } catch (err: any) {
      return respond({
        res,
        message: err.message,
        statusCode: 400,
        success: false,
      });
    }
  }

  public deleteFile = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.fileService.deleteFile(Number(id));
      return respond({
        res,
        message: 'File deleted successfully',
        statusCode: 200,
        success: true,
      });
    } catch (err: any) {
      return respond({
        res,
        message: err.message,
        statusCode: 400,
        success: false,
      });
    }
  };

  public getFileEntity = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const file = await this.fileService.getFileById(Number(id), false);
      return respond({
        res,
        data: file,
        statusCode: 200,
        success: true,
        message: 'File retrieved successfully',
      });
    } catch (err: any) {
      return respond({
        res,
        message: err.message,
        statusCode: 400,
        success: false,
      });
    }
  };
  
  public getFileBuffer = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const file = await this.fileService.getFileById(Number(id), true);
      res.type(file.mimetype);
      if ('buffer' in file) {
        res.end(file.buffer, 'binary');
      } else {
        throw new Error('File buffer not found');
      }
    } catch (err: any) {
      return respond({
        res,
        message: err.message,
        statusCode: 400,
        success: false,
      });
    }
  };

  public getAllFiles = async (req: Request, res: Response) => {
    try {
      const files = await this.fileService.getAllFiles();
      return respond({
        res,
        data: files,
        statusCode: 200,
        success: true,
        message: 'Files retrieved successfully',
      });
    } catch (err: any) {
      return respond({
        res,
        message: err.message,
        statusCode: 400,
        success: false,
      });
    }
  };
}

export const fileController = new FileController();