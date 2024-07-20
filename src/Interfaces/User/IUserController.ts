import { Request, Response, NextFunction } from 'express';

export default interface IUserController {
  registration: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  sendVerifyCode: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  verify: (req: Request, res: Response, next: NextFunction) => Promise<void>;
  login: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
