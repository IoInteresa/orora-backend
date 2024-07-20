import { Request, Response } from 'express';

import { HttpStatus, ResponseText } from '../Constants';
import ThrowError from '../Responses/ThrowError';

const ErrorMiddleware = (error: Error, req: Request, res: Response) => {
  if (error instanceof ThrowError) {
    return res.status(error.statusCode).json({ status: error.statusCode, data: error.data });
  }

  return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    data: ResponseText.INTERNAL_SERVER_ERROR,
  });
};

export default ErrorMiddleware;
