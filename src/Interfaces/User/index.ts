import UserDTO from '../../Dto/UserDto';

export interface IUserServiceVerifyResponse {
  user: UserDTO;
  accessToken: string;
}
