import { Request, Response, NextFunction } from 'express';
import { AuthRepository } from './auth.repository';
import { User } from '@prisma/client';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  if (!(req as any).session.userId) {
    return res.status(401).json({ message: 'Access denied' });
  }
  const authRepository = new AuthRepository();
  const user = await authRepository.findById((req as any).session.userId);
  if (!user) return res.status(401).json({ message: 'Invalid session' });
  if (!user.emailVerified) return res.status(401).json({ message: 'Email not verified' });

  (req as RequestWithUser).user = user;
  next();
};

export interface RequestWithUser extends Request {
  user: User;
}