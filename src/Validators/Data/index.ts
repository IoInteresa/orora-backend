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

export interface VerifyData {
  email?: string;
  phonenumber?: string;
  code: number;
}

export interface LoginData {
  email?: string;
  phonenumber?: string;
  password: string;
}
