import { IUserServiceLoginResponse } from '.';
import UserDTO from '../../Dto/UserDto';
import { ChangePasswordData, LoginData, RegistrationData, SendVerifyCodeData, VerifyData } from '../../Validators/Data';

export default interface IUserService {
    registration: (data: RegistrationData) => Promise<UserDTO>;
    sendVerifyCode: (data: SendVerifyCodeData) => Promise<{ status: number }>;
    verify: (data: VerifyData) => Promise<IUserServiceLoginResponse>;
    login: (data: LoginData) => Promise<IUserServiceLoginResponse>;
    get: (id: string) => Promise<UserDTO>;
    changePassword: (id: string, data: ChangePasswordData) => Promise<{ status: number }>;
}
