import {
    IsDefined,
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
    IsUUID,
    Length,
    MinLength,
    ValidateIf,
} from 'class-validator';

export class RegistrationDto {
    @IsString()
    @IsNotEmpty()
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
    @IsNotEmpty()
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
    @IsNotEmpty()
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

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    password: string = '';
}

export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    newPassword: string = '';

    @IsString()
    @IsNotEmpty()
    @Length(6, 20)
    oldPassword: string = '';
}

export class CreateDownloadDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string = '';

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    format: string = '';

    @IsNumber()
    @IsNotEmpty()
    size: number = 0;

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    url: string = '';
}

export class GetDownloadsDto {
    @IsDefined()
    @IsNumber()
    page: number = 0;

    @IsDefined()
    @IsNumber()
    limit: number = 0;
}

export class DeleteDownloadDto {
    @IsString()
    @IsUUID(4)
    @IsNotEmpty()
    id: string = '';
}

export class SearchDownloadDto {
    @IsString()
    @IsNotEmpty()
    term: string = '';
}