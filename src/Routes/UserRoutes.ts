import { Router } from "express";

import IUserController from "../Interfaces/User/IUserController";

export default (userController: IUserController) => {
  const router = Router();

  router.post("/registration", userController.registration);
  router.post("/send-verify-code", userController.sendVerifyCode);

  return router;
};
