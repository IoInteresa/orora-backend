export interface RegistrationData {
  username: string;
  email?: string;
  password: string;
  phonenumber?: string;
}

export interface SendVerifyCodeData {
  email?: string;
  phonenumber?: string;
}
