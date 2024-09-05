import { Request, RequestHandler, Response } from 'express';
import { AuthService } from './auth.service';
import { respond } from '@utils/http.handler';
import { StatusCodes } from 'http-status-codes';
import { RequestWithUser } from './auth.middleware';
import jwt from 'jsonwebtoken';
import { AuthRepository } from './auth.repository';

class AuthController {
  private authService = new AuthService();
  public register: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;
      const user = await this.authService.register(name, email, password);
      (req as any).session.userId = user.id;
      return respond({
        res,
        data: user,
        message: 'User registered successfully',
        statusCode: StatusCodes.CREATED,  
        success: true,
      });
    } catch (err: any) {
      return respond({
        res,
        message: err,
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
      });
    }
  }

  public confirmEmail: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { token } = req.query;
      const decoded = jwt.verify(token as string, process.env.JWT_SECRET!) as any;
      await this.authService.confirmEmail(decoded.userId);
  
      return respond({
        res,
        message: 'Email confirmed successfully',
        statusCode: StatusCodes.OK,
        success: true,
      });
    } catch (err: any) {
      return respond({
        res,
        message: err,
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
      });
    }
  }

  public login: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { email, password } = req.body;
      const user = await this.authService.login(email, password);
      (req as any).session.userId = user.id;
      return respond({
        res,
        data: user,
        message: 'Login successful',
        statusCode: StatusCodes.OK,
        success: true,
      });
    } catch (err: any) {
      return respond({
        res,
        message: err,
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
      });
    }
  }

  public logout: RequestHandler = async (req: Request, res: Response) => {
    (req as any).session.destroy((err) => {
      if (err) {
        return respond({
          res,
          message: 'Logout failed',
          statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
          success: false,
        });
      }
      return respond({
        res,
        message: 'Logout successful',
        statusCode: StatusCodes.OK,
        success: true,
      });
    });
  }

  public resetPassword: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { newPassword } = req.body;

      await this.authService.resetPassword((req as RequestWithUser).user, newPassword);

      return respond({
        res,
        message: 'Password reset successful',
        statusCode: StatusCodes.OK,
        success: true,
      });
    } catch (err: any) {
      return respond({
        res,
        message: err,
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
      });
    }
  }

  public resetPasswordWithToken: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { token, newPassword } = req.body;
      const decoded = jwt.verify(token as string, process.env.JWT_SECRET!) as any;
      const authRepository = new AuthRepository();
      const user = await authRepository.findById(decoded.userId);
      if (!user) {
        return respond({
          res,
          message: 'User not found',
          statusCode: StatusCodes.NOT_FOUND,
          success: false,
        });
      } else {
        await this.authService.resetPassword(user, newPassword);
        return respond({
          res,
          message: 'Password reset successful',
          statusCode: StatusCodes.OK,
          success: true,
        });
      }
    } catch (err: any) {
      return respond({
        res,
        message: err,
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
      });
    }
  }

  public forgotPassword: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await this.authService.sendResetPasswordEmail(email);
      return respond({
        res,
        message: 'Reset password email sent',
        statusCode: StatusCodes.OK,
        success: true,
      });
    } catch (err: any) {
      return respond({
        res,
        message: err,
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
      });
    }
  }

  public getProfile: RequestHandler = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.getProfile((req as RequestWithUser).user.id);

      return respond({
        res,
        data: user,
        message: 'Profile fetched successfully',
        statusCode: StatusCodes.OK,
        success: true,
      });
    } catch (err: any) {
      return respond({
        res,
        message: err,
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
      });
    }
  }
  
  public updateProfile: RequestHandler = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.updateProfile((req as RequestWithUser).user.id, req.body);
      return respond({
        res,
        data: user,
        message: 'Profile updated successfully',
        statusCode: StatusCodes.OK,
        success: true,
      });
    } catch (err: any) {
      return respond({
        res,
        message: err,
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
      });
    }
  }

  public updateEmail: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;
      await this.authService.updateEmail((req as RequestWithUser).user.id, email);
      return respond({
        res,
        message: 'Confirmation email sent',
        statusCode: StatusCodes.OK,
        success: true,
      });
    } catch (err: any) {
      return respond({
        res,
        message: err,
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
      });
    }
  }
  
  public confirmNewEmail: RequestHandler = async (req: Request, res: Response) => {
    try {
      const { token } = req.query;
      const user = await this.authService.confirmNewEmail(token as string);
      return respond({
        res,
        data: user,
        message: 'Email updated successfully',
        statusCode: StatusCodes.OK,
        success: true,
      });
    } catch (err: any) {
      return respond({
        res,
        message: err,
        statusCode: StatusCodes.BAD_REQUEST,
        success: false,
      });
    }
  }
}

export const authController = new AuthController();
