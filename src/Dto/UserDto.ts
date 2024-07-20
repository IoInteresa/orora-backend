import IUser from '../Interfaces/User/IUser';

class UserDTO {
  public id: string;
  public username: string;
  public email: string;
  public phonenumber: string;
  public verified: boolean;
  public active: boolean;

  constructor(user: IUser) {
    this.id = user.id;
    this.email = user.email;
    this.username = user.username;
    this.phonenumber = user.phonenumber;
    this.verified = user.verified;
    this.active = user.active;
  }
}

export default UserDTO;
