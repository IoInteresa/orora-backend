import { IsEmail, IsNumber, IsString, Length, ValidateIf } from 'class-validator';

export class RegistrationDto {
    @IsString()
    @Length(3, 50)
    username: string = '';

    @ValidateIf((o) => !o.phonenumber)
    @IsEmail()
    email?: string;

    @ValidateIf((o) => !o.email)
    @IsString()
    @Length(8, 20)
    phonenumber?: string;

    @IsString()
    @Length(6, 20)
    password: string = '';
}

export class SendVerifyCodeDto {
    @ValidateIf((o) => !o.phonenumber)
    @IsEmail()
    email?: string;

    @ValidateIf((o) => !o.email)
    @IsString()
    @Length(8, 20)
    phonenumber?: string;
}

export class VerifyDto {
    @ValidateIf((o) => !o.phonenumber)
    @IsEmail()
    email?: string;

    @ValidateIf((o) => !o.email)
    @IsString()
    @Length(8, 20)
    phonenumber?: string;

    @IsNumber()
    code: number = 0;
}

export class LoginDto {
    @ValidateIf((o) => !o.phonenumber)
    @IsEmail()
    email?: string;

    @ValidateIf((o) => !o.email)
    @IsString()
    @Length(8, 20)
    phonenumber?: string;

    @Length(6, 20)
    password: string = '';
}

export class ChangePasswordDto {
    @Length(6, 20)
    newPassword: string = '';

    @Length(6, 20)
    oldPassword: string = '';
}
