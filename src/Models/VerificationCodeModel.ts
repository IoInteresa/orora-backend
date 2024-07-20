import db from '../Database/db';
import IVerificationCode from '../Interfaces/Verification/IVerificationCode';
import IVerificationCodeModal from '../Interfaces/Verification/IVerificationCodeModal';

class VerificationCodeModel implements IVerificationCodeModal {
  private readonly tableName = 'verification_codes';

  public create = async (data: IVerificationCode): Promise<IVerificationCode> => {
    const [verificationCode] = await db(this.tableName)
      .insert(data)
      .returning<IVerificationCode[]>('*');

    return verificationCode;
  };

  public findOne = async ({ user_id }: { user_id: string }): Promise<IVerificationCode> => {
    return db(this.tableName).where({ user_id }).select('*').first();
  };

  public update = async (data: IVerificationCode): Promise<IVerificationCode> => {
    const [updatedCode] = await db(this.tableName)
      .where({ user_id: data.user_id })
      .update(data)
      .returning<IVerificationCode[]>('*');
    return updatedCode;
  };
}

export default VerificationCodeModel;
