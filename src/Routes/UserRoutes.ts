import { Router } from 'express';

import IUserController from '../Interfaces/User/IUserController';
import AuthMiddleware from '../Middlewares/AuthMiddleware';

export default (userController: IUserController) => {
    const router = Router();

    router.post('/registration', userController.registration);
    router.post('/send-verify-code', userController.sendVerifyCode);
    router.post('/verify', userController.verify);
    router.post('/login', userController.login);
    router.get('/', AuthMiddleware, userController.get)
    router.post('/change-password', AuthMiddleware, userController.changePassword);

    return router;
};
