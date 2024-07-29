import { NextFunction, Request, Response } from 'express';

import { HttpStatus, ResponseText } from '../Constants';
import ThrowError from '../Responses/ThrowError';

/* eslint-disable @typescript-eslint/no-unused-vars */
// Если убрать next, то express.js не распознает функцию как обработчик ошибок

const ErrorMiddleware = (error: Error, req: Request, res: Response, _: NextFunction) => {
    console.log(error);

    if (error instanceof ThrowError) {
        return res.status(error.statusCode).json({ status: error.statusCode, data: error.data });
    }

    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        data: ResponseText.INTERNAL_SERVER_ERROR,
    });
};

export default ErrorMiddleware;
