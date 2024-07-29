import { NextFunction, Request, Response } from 'express';

import { HttpStatus, ResponseText } from '../Constants';
import IDownloadController from '../Interfaces/Downloads/IDownloadController';
import IDownloadService from '../Interfaces/Downloads/IDownloadService';
import ThrowError from '../Responses/ThrowError';
import { CreateDownloadData, DeleteDownloadData, GetDownloadsData, SearchDownloadData } from '../Validators/Data';
import { CreateDownloadDto, DeleteDownloadDto, GetDownloadsDto, SearchDownloadDto } from '../Validators/Dto';
import Validator from '../Validators/Validator';

class DownloadController implements IDownloadController {
    private readonly downloadService: IDownloadService;
    private readonly validator: Validator;

    constructor(downloadService: IDownloadService) {
        this.downloadService = downloadService;
        this.validator = new Validator();
    }

    public create = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = await this.validator.validate<CreateDownloadData, CreateDownloadDto>(
                req.body,
                CreateDownloadDto,
            );
            if (errors) {
                throw new ThrowError(HttpStatus.UNPROCESSABLE_ENTITY, ResponseText.INVALID_DATA);
            }

            const createdDownload = await this.downloadService.create(
                res.locals.user.id,
                req.body,
            );
            res.status(HttpStatus.CREATED).json({
                status: HttpStatus.CREATED,
                data: createdDownload,
            });
        } catch (error) {
            next(error);
        }
    };

    public getAll = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = await this.validator.validate<GetDownloadsData, GetDownloadsDto>(
                req.body,
                GetDownloadsDto,
            );
            if (errors) {
                throw new ThrowError(HttpStatus.UNPROCESSABLE_ENTITY, ResponseText.INVALID_DATA);
            }

            const downloads = await this.downloadService.getAll(res.locals.user.id, req.body);
            res.json({ status: HttpStatus.OK, data: downloads });
        } catch (error) {
            next(error);
        }
    };

    public delete = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = await this.validator.validate<DeleteDownloadData, DeleteDownloadDto>(
                req.body,
                DeleteDownloadDto,
            );
            if (errors) {
                throw new ThrowError(HttpStatus.UNPROCESSABLE_ENTITY, ResponseText.INVALID_DATA);
            }

            const response = await this.downloadService.delete(
                res.locals.user.id,
                req.body,
            );
            res.json(response);
        } catch (error) {
            next(error);
        }
    };

    public clear = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const response = await this.downloadService.clear(res.locals.user.id);
            res.json(response);
        } catch (error) {
            next(error);
        }
    }

    public search = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const errors = await this.validator.validate<SearchDownloadData, SearchDownloadDto>(
                req.body,
                SearchDownloadDto,
            );
            if (errors) {
                throw new ThrowError(HttpStatus.UNPROCESSABLE_ENTITY, ResponseText.INVALID_DATA);
            }

            const downloads = await this.downloadService.search(res.locals.user.id, req.body);
            res.json({ status: HttpStatus.OK, data: downloads });
        } catch (error) {
            next(error);
        }
    }
}

export default DownloadController;
