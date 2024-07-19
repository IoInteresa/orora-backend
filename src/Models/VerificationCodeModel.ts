import db from "../Database/db";
import IVerificationCode from "../Interfaces/Verification/IVerificationCode";
import IVerificationCodeModal from "../Interfaces/Verification/IVerificationCodeModal";

class VerificationCodeModel implements IVerificationCodeModal {
  private readonly tableName = "verification_codes";

  public create = async (
    data: IVerificationCode
  ): Promise<IVerificationCode> => {
    const [verificationCode] = await db(this.tableName)
      .insert(data)
      .returning<IVerificationCode[]>("*");

    return verificationCode;
  };
}

export default VerificationCodeModel;
