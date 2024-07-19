import IVerificationCode from "./IVerificationCode";

export default interface IVerificationCodeModal {
  create: (data: IVerificationCode) => Promise<IVerificationCode>;
}
