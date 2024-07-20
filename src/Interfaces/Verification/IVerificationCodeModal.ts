import IVerificationCode from './IVerificationCode';

export default interface IVerificationCodeModal {
  create: (data: IVerificationCode) => Promise<IVerificationCode>;
  findOne: ({ user_id }: { user_id: string }) => Promise<IVerificationCode | undefined>;
  update: (data: IVerificationCode) => Promise<IVerificationCode>;
}
