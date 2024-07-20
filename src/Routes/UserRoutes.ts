import { Router } from 'express';

import IUserController from '../Interfaces/User/IUserController';

export default (userController: IUserController) => {
  const router = Router();

  router.post('/registration', userController.registration);
  router.post('/send-verify-code', userController.sendVerifyCode);
  router.post('/verify', userController.verify);
  router.post('/login', userController.login);

  return router;
};
