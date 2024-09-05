import { Router } from 'express';
import { authController } from './auth.controller';
import { emailConfirmationSchema, forgotPasswordSchema, resetPasswordSchema, userCreateSchema, userEmailUpdateSchema, userLoginSchema, userUpdateSchema } from '@shared/schemas/userSchema';
import { validateRequest } from '@utils/http.handler';
import { authMiddleware } from './auth.middleware';

export class AuthRouter {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post('/register', validateRequest(userCreateSchema), authController.register);
    this.router.post('/login', validateRequest(userLoginSchema), authController.login);
    this.router.post('/logout', authController.logout);
    this.router.post('/reset-password', authMiddleware, validateRequest(resetPasswordSchema), authController.resetPassword);
    this.router.post('/reset-password-with-token', validateRequest(resetPasswordSchema), authController.resetPasswordWithToken);
    this.router.post('/forgot-password', validateRequest(forgotPasswordSchema), authController.forgotPassword);
    this.router.get('/profile', authMiddleware, authController.getProfile);
    this.router.put('/profile', authMiddleware, validateRequest(userUpdateSchema), authController.updateProfile);
    this.router.get('/confirm-email', validateRequest(emailConfirmationSchema), authController.confirmEmail);
    this.router.post('/update-email', authMiddleware, validateRequest(userEmailUpdateSchema), authController.updateEmail);
    this.router.get('/confirm-new-email', validateRequest(emailConfirmationSchema), authController.confirmNewEmail);
  }
}

export const authRouter = new AuthRouter().router;
