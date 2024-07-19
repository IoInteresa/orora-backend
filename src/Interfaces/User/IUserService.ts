import UserDTO from "../../Dto/UserDto";
import {
  RegistrationData,
  SendVerifyCodeData,
} from "../../Validators/Dto/UserControllerDto";

export default interface IUserService {
  registration: (data: RegistrationData) => Promise<UserDTO>;
  sendVerifyCode: (data: SendVerifyCodeData) => Promise<{ status: number }>;
}
