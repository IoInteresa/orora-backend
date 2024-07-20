import UserDTO from '../../Dto/UserDto';

export interface IUserServiceLoginResponse {
  user: UserDTO;
  accessToken: string;
}
