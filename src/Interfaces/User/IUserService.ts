import { IUserServiceVerifyResponse } from '.';
import UserDTO from '../../Dto/UserDto';
import { RegistrationData, SendVerifyCodeData, VerifyData } from '../../Validators/Data';

export default interface IUserService {
  registration: (data: RegistrationData) => Promise<UserDTO>;
  sendVerifyCode: (data: SendVerifyCodeData) => Promise<{ status: number }>;
  verify: (data: VerifyData) => Promise<IUserServiceVerifyResponse>;
}
