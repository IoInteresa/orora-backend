import { Request, Response, NextFunction } from 'express';

import { HttpStatus, ResponseText } from '../Constants';
import IUserController from '../Interfaces/User/IUserController';
import IUserService from '../Interfaces/User/IUserService';
import ThrowError from '../Responses/ThrowError';
import { LoginData, RegistrationData, SendVerifyCodeData, VerifyData } from '../Validators/Data';
import { LoginDto, RegistrationDto, SendVerifyCodeDto, VerifyDto } from '../Validators/Dto';
import Validator from '../Validators/Validator';

class UserController implements IUserController {
  private readonly userService: IUserService;
  private readonly validator: Validator;

  constructor(userService: IUserService) {
    this.userService = userService;
    this.validator = new Validator();
  }

  public registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = await this.validator.validate<RegistrationData, RegistrationDto>(
        req.body,
        RegistrationDto,
      );
      if (errors) {
        throw new ThrowError(HttpStatus.UNPROCESSABLE_ENTITY, ResponseText.INVALID_DATA);
      }

      const createdUser = await this.userService.registration(req.body);
      res.status(HttpStatus.CREATED).json({ status: HttpStatus.CREATED, data: createdUser });
    } catch (error) {
      next(error);
    }
  };

  public sendVerifyCode = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = await this.validator.validate<SendVerifyCodeData, SendVerifyCodeDto>(
        req.body,
        SendVerifyCodeDto,
      );
      if (errors) {
        throw new ThrowError(HttpStatus.UNPROCESSABLE_ENTITY, ResponseText.INVALID_DATA);
      }

      const response = await this.userService.sendVerifyCode(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  public verify = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = await this.validator.validate<VerifyData, VerifyDto>(req.body, VerifyDto);
      if (errors) {
        throw new ThrowError(HttpStatus.UNPROCESSABLE_ENTITY, ResponseText.INVALID_DATA);
      }

      const { user, accessToken } = await this.userService.verify(req.body);
      res.json({ status: HttpStatus.OK, data: { user, accessToken } });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const errors = await this.validator.validate<LoginData, LoginDto>(req.body, LoginDto);
      if (errors) {
        throw new ThrowError(HttpStatus.UNPROCESSABLE_ENTITY, ResponseText.INVALID_DATA);
      }

      const { user, accessToken } = await this.userService.login(req.body);
      res.json({ status: HttpStatus.OK, data: { user, accessToken } });
    } catch (error) {
      next(error);
    }
  };
}

export default UserController;
