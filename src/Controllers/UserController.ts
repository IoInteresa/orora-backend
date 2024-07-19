import { Request, Response, NextFunction } from "express";

import IUserController from "../Interfaces/User/IUserController";
import Validator from "../Validators/Validator";
import { HttpStatus, ResponseText } from "../Constants";
import IUserService from "../Interfaces/User/IUserService";
import ThrowError from "../Responses/ThrowError";
import { RegistrationData, SendVerifyCodeData } from "../Validators/Data";
import { RegistrationDto, SendVerifyCodeDto } from "../Validators/Dto";

class UserController implements IUserController {
  private readonly userService: IUserService;
  private readonly validator: Validator;

  constructor(userService: IUserService) {
    this.userService = userService;
    this.validator = new Validator();
  }

  public registration = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = await this.validator.validate<
        RegistrationData,
        RegistrationDto
      >(req.body, RegistrationDto);
      if (errors) {
        throw new ThrowError(
          HttpStatus.UNPROCESSABLE_ENTITY,
          ResponseText.INVALID_DATA
        );
      }

      const createdUser = await this.userService.registration(req.body);
      res
        .status(HttpStatus.CREATED)
        .json({ status: HttpStatus.CREATED, data: createdUser });
    } catch (error) {
      next(error);
    }
  };

  public sendVerifyCode = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = await this.validator.validate<
        SendVerifyCodeData,
        SendVerifyCodeDto
      >(req.body, SendVerifyCodeDto);
      if (errors) {
        throw new ThrowError(
          HttpStatus.UNPROCESSABLE_ENTITY,
          ResponseText.INVALID_DATA
        );
      }

      const response = await this.userService.sendVerifyCode(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
