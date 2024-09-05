import { Router } from 'express';
import { userController } from './user.controller';
import { authMiddleware } from '../auth/auth.middleware';
import { roleMiddleware } from '../auth/role.middleware';
import { updateUserRoleSchema } from '@shared/schemas/userSchema';
import { validateRequest } from '@utils/http.handler';

export class UserRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get('/', authMiddleware, roleMiddleware(['Admin']), userController.getAllUsers);
    this.router.put('/role', authMiddleware, roleMiddleware(['Admin']), validateRequest(updateUserRoleSchema), userController.updateUserRole);
  }
}

export const userRouter = new UserRouter().router;