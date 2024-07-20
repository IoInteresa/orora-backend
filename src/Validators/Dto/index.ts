import { IsEmail, IsNumber, IsString, Length, MinLength, ValidateIf } from 'class-validator';

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
    @MinLength(6)
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

    @MinLength(6)
    password: string = '';
}
