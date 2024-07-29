import { NextFunction, Request, Response } from 'express';

export default interface IDownloadController {
    create: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    getAll: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    delete: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    clear: (req: Request, res: Response, next: NextFunction) => Promise<void>;
    search: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}
