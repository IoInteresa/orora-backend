import { NextFunction, Request, Response } from 'express';

import { HttpStatus, ResponseText } from '../Constants';
import ThrowError from '../Responses/ThrowError';
import JwtManager from '../Utilities/JwtManager';

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            throw new ThrowError(HttpStatus.UNAUTHORIZED, ResponseText.UNAUTHORIZED);
        }

        const [type, token] = authorizationHeader.split(' ');

        if (type !== 'Bearer' || !token) {
            throw new ThrowError(HttpStatus.UNAUTHORIZED, ResponseText.UNAUTHORIZED);
        }

        const jwtManager = new JwtManager();

        const userInfo = jwtManager.verifyToken(token);
        if (!userInfo) {
            throw new ThrowError(HttpStatus.UNAUTHORIZED, ResponseText.TOKEN_EXPIRED);
        }

        res.locals.user = userInfo;

        next();
    } catch (error) {
        next(error);
    }
};

export default AuthMiddleware;
