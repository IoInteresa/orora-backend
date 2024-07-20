import bcrypt from 'bcrypt';

import { HttpStatus, ResponseText } from '../Constants';
import UserDTO from '../Dto/UserDto';
import IUserModel from '../Interfaces/User/IUserModel';
import IUserService from '../Interfaces/User/IUserService';
import IVerificationCodeModal from '../Interfaces/Verification/IVerificationCodeModal';
import ThrowError from '../Responses/ThrowError';
import { generateVerifyCode } from '../Utilities';
import JwtManager from '../Utilities/JwtManager';
import MailManager from '../Utilities/MailManager';
import SmsManager from '../Utilities/SmsManager';
import { LoginData, RegistrationData, SendVerifyCodeData, VerifyData } from '../Validators/Data';

class UserService implements IUserService {
    private readonly userModel: IUserModel;
    private readonly verificationCodeModel: IVerificationCodeModal;
    private readonly mailManager: MailManager;
    private readonly smsManager: SmsManager;
    private readonly jwtManager: JwtManager;

    constructor(userModel: IUserModel, verificationCodeModel: IVerificationCodeModal) {
        this.userModel = userModel;
        this.verificationCodeModel = verificationCodeModel;
        this.mailManager = new MailManager();
        this.smsManager = new SmsManager();
        this.jwtManager = new JwtManager();
    }

    public registration = async (userData: RegistrationData) => {
        const { username, email, password, phonenumber } = userData;

        const candidate = await this.userModel.findOne({
            email,
            phonenumber,
            username,
        });
        if (candidate) {
            throw new ThrowError(HttpStatus.CONFLICT, ResponseText.USER_ALREADY_EXISTS);
        }

        const hashPassword = await bcrypt.hash(password, 5);
        if (!hashPassword) {
            throw new ThrowError(HttpStatus.INTERNAL_SERVER_ERROR, ResponseText.UNABLE_USER_CREATE);
        }

        const user = await this.userModel.create({
            username,
            email: email ?? '',
            password: hashPassword,
            phonenumber: phonenumber ?? '',
            verified: false,
            active: true,
        });
        if (!user) {
            throw new ThrowError(HttpStatus.INTERNAL_SERVER_ERROR, ResponseText.UNABLE_USER_CREATE);
        }

        return new UserDTO(user);
    };

    public sendVerifyCode = async (sendVerifyCodeData: SendVerifyCodeData) => {
        const { email, phonenumber } = sendVerifyCodeData;

        const user = await this.userModel.findOne({ email, phonenumber });
        if (!user) {
            throw new ThrowError(HttpStatus.NOT_FOUND, ResponseText.USER_NOT_FOUND);
        }

        if (user.verified) {
            throw new ThrowError(HttpStatus.CONFLICT, ResponseText.USER_ALREADY_VERIFIED);
        }

        const verifyCode = generateVerifyCode();

        if (email) {
            const successfully = await this.mailManager.send(email, verifyCode);
            if (!successfully) {
                throw new ThrowError(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    ResponseText.UNABLE_TO_SEND_EMAIL,
                );
            }
        }

        if (phonenumber) {
            const text = `Your verification code is: ${verifyCode}`;
            const successfully = await this.smsManager.send(phonenumber, text);

            if (!successfully) {
                throw new ThrowError(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    ResponseText.UNABLE_TO_SEND_SMS,
                );
            }
        }

        const verificationData = await this.verificationCodeModel.findOne({
            user_id: user.id,
        });
        if (verificationData) {
            const response = await this.verificationCodeModel.update({
                user_id: user.id,
                code: verifyCode,
            });
            if (!response) {
                throw new ThrowError(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    ResponseText.UNABLE_TO_SAVE_VERIFICATION_CODE,
                );
            }
        } else {
            const response = await this.verificationCodeModel.create({
                user_id: user.id,
                code: verifyCode,
            });
            if (!response) {
                throw new ThrowError(
                    HttpStatus.INTERNAL_SERVER_ERROR,
                    ResponseText.UNABLE_TO_SAVE_VERIFICATION_CODE,
                );
            }
        }

        return { status: HttpStatus.OK };
    };

    public verify = async (verifyData: VerifyData) => {
        const { email, phonenumber, code } = verifyData;

        const user = await this.userModel.findOne({ email, phonenumber });
        if (!user) {
            throw new ThrowError(HttpStatus.NOT_FOUND, ResponseText.USER_NOT_FOUND);
        }

        if (user.verified) {
            throw new ThrowError(HttpStatus.CONFLICT, ResponseText.USER_ALREADY_VERIFIED);
        }

        const verificationData = await this.verificationCodeModel.findOne({
            user_id: user.id,
        });
        if (!verificationData) {
            throw new ThrowError(HttpStatus.NOT_FOUND, ResponseText.VERIFICATION_CODE_NOT_FOUND);
        }

        if (verificationData.code !== code) {
            throw new ThrowError(HttpStatus.BAD_REQUEST, ResponseText.INVALID_VERIFICATION_CODE);
        }

        const updatedUser = await this.userModel.updateVerified({
            ...user,
            verified: true,
        });
        if (!updatedUser) {
            throw new ThrowError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                ResponseText.UNABLE_TO_UPDATE_USER_VERIFICATION,
            );
        }

        const accessToken = this.jwtManager.generateToken(user.id);
        if (!accessToken) {
            throw new ThrowError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                ResponseText.UNABLE_TO_GENERATE_TOKEN,
            );
        }

        const userDto = new UserDTO(user);
        return { user: userDto, accessToken };
    };

    public login = async (loginData: LoginData) => {
        const { email, phonenumber, password } = loginData;

        const user = await this.userModel.findOne({ email, phonenumber });
        if (!user) {
            throw new ThrowError(HttpStatus.NOT_FOUND, ResponseText.USER_NOT_FOUND);
        }

        if (!user.verified) {
            throw new ThrowError(HttpStatus.FORBIDDEN, ResponseText.USER_NOT_VERIFIED_YET);
        }

        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            throw new ThrowError(HttpStatus.BAD_REQUEST, ResponseText.INVALID_LOGIN_CREDENTIALS);
        }

        const accessToken = this.jwtManager.generateToken(user.id);
        if (!accessToken) {
            throw new ThrowError(
                HttpStatus.INTERNAL_SERVER_ERROR,
                ResponseText.UNABLE_TO_GENERATE_TOKEN,
            );
        }

        const userDto = new UserDTO(user);
        return { user: userDto, accessToken };
    };

    public get = async (id: string) => {
        const user = await this.userModel.findOne({ id });
        if (!user) {
            throw new ThrowError(HttpStatus.NOT_FOUND, ResponseText.USER_NOT_FOUND);
        }

        return new UserDTO(user);
    }
}

export default UserService;
