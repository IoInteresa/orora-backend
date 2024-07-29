import DownloadController from './Controllers/DownloadController';
import UserController from './Controllers/UserController';
import DownloadModel from './Models/DownloadModel';
import UserModel from './Models/UserModel';
import VerificationCodeModel from './Models/VerificationCodeModel';
import DownloadService from './Services/DownloadService';
import UserService from './Services/UserService';

const userModel = new UserModel();
const verificationCodeModel = new VerificationCodeModel();
const downloadModel = new DownloadModel();

const userService = new UserService(userModel, verificationCodeModel);
const downloadService = new DownloadService(userModel, downloadModel);

const userController = new UserController(userService);
const downloadController = new DownloadController(downloadService);

export { userController, downloadController };
