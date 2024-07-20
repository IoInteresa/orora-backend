import UserController from './Controllers/UserController';
import UserModel from './Models/UserModel';
import VerificationCodeModel from './Models/VerificationCodeModel';
import UserService from './Services/UserService';

const userModel = new UserModel();
const verificationCodeModel = new VerificationCodeModel();

const userService = new UserService(userModel, verificationCodeModel);
const userController = new UserController(userService);

export { userController };
