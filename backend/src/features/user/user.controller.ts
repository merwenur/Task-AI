import { Request, Response } from 'express';
import { respond } from '@utils/http.handler';
import { StatusCodes } from 'http-status-codes';
import { UserService } from './user.service';

class UserController {
  private userService = new UserService();

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      return respond({
        res,
        data: users,
        message: 'Users fetched successfully',
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
  };

  public updateUserRole = async (req: Request, res: Response) => {
    try {
      const { userId, role } = req.body;
      const user = await this.userService.updateUserRole(userId, role);
      return respond({
        res,
        data: user,
        message: 'User role updated successfully',
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
  };
}

export const userController = new UserController();