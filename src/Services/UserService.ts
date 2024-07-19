import bcrypt from "bcrypt";

import IUserService from "../Interfaces/User/IUserService";
import IUserModel from "../Interfaces/User/IUserModel";
import IVerificationCodeModal from "../Interfaces/Verification/IVerificationCodeModal";
import UserDTO from "../Dto/UserDto";
import { HttpStatus, ResponseText } from "../Constants";
import ThrowError from "../Responses/ThrowError";
import MailSender from "../Utilities/MailSender";
import { generateVerifyCode } from "../Utilities";
import SendSms from "../Utilities/SendSms";
import { RegistrationData, SendVerifyCodeData } from "../Validators/Data";

class UserService implements IUserService {
  private readonly userModel: IUserModel;
  private readonly verificationCodeModel: IVerificationCodeModal;
  private readonly mailSender: MailSender;
  private readonly sendSms: SendSms;

  constructor(
    userModel: IUserModel,
    verificationCodeModel: IVerificationCodeModal
  ) {
    this.userModel = userModel;
    this.verificationCodeModel = verificationCodeModel;
    this.mailSender = new MailSender();
    this.sendSms = new SendSms();
  }

  public registration = async (userData: RegistrationData) => {
    const { username, email, password, phonenumber } = userData;

    const candidate = await this.userModel.findOne({
      email,
      phonenumber,
      username,
    });
    if (candidate) {
      throw new ThrowError(
        HttpStatus.CONFLICT,
        ResponseText.USER_ALREADY_EXISTS
      );
    }

    const hashPassword = await bcrypt.hash(password, 5);
    if (!hashPassword) {
      throw new ThrowError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseText.UNABLE_USER_CREATE
      );
    }

    const user = await this.userModel.create({
      username,
      email: email ?? "",
      password: hashPassword,
      phonenumber: phonenumber ?? "",
      verified: false,
      active: true,
    });
    if (!user) {
      throw new ThrowError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseText.UNABLE_USER_CREATE
      );
    }

    return new UserDTO(user);
  };

  public sendVerifyCode = async (verifyData: SendVerifyCodeData) => {
    const { email, phonenumber } = verifyData;

    const user = await this.userModel.findOne({ email, phonenumber });
    if (!user) {
      throw new ThrowError(HttpStatus.NOT_FOUND, ResponseText.USER_NOT_FOUND);
    }

    const verifyCode = generateVerifyCode();

    if (email) {
      const successfully = await this.mailSender.send(email, verifyCode);
      if (!successfully) {
        throw new ThrowError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          ResponseText.UNABLE_TO_SEND_EMAIL
        );
      }
    }

    if (phonenumber) {
      const text = `Your verification code is: ${verifyCode}`;
      const successfully = await this.sendSms.send(phonenumber, text);

      if (!successfully) {
        throw new ThrowError(
          HttpStatus.INTERNAL_SERVER_ERROR,
          ResponseText.UNABLE_TO_SEND_SMS
        );
      }
    }

    const response = await this.verificationCodeModel.create({
      user_id: user.id,
      code: verifyCode,
    });
    if (!response) {
      throw new ThrowError(
        HttpStatus.INTERNAL_SERVER_ERROR,
        ResponseText.UNABLE_TO_SAVE_VERIFICATION_CODE
      );
    }

    return { status: HttpStatus.OK };
  };
}

export default UserService;
