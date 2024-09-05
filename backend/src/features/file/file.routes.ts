import { Router } from 'express';
import multer from 'multer';
import { fileController } from './file.controller';
import { authMiddleware } from '@features/auth/auth.middleware';
import { roleMiddleware } from '@features/auth/role.middleware';
import { Role } from '@prisma/client';

const upload = multer({ storage: multer.memoryStorage() });

export class FileRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/upload', authMiddleware, roleMiddleware([Role.Admin]), upload.single('file'), fileController.uploadFile);
    this.router.put('/:id', authMiddleware, roleMiddleware([Role.Admin]), upload.single('file'), fileController.updateFile);
    this.router.delete('/:id', authMiddleware, roleMiddleware([Role.Admin]), fileController.deleteFile);
    this.router.get('/:id', authMiddleware, roleMiddleware([Role.Admin]), fileController.getFileEntity);
    this.router.get('/:id/buffer', authMiddleware, roleMiddleware([Role.Admin]), fileController.getFileBuffer);
    this.router.get('/', authMiddleware, roleMiddleware([Role.Admin]), fileController.getAllFiles);
  }
}

export const fileRouter = new FileRouter().router;