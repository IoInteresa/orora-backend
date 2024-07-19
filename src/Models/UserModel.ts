import db from "../Database/db";

import IUserModel from "../Interfaces/User/IUserModel";
import IUser from "../Interfaces/User/IUser";

class UserModel implements IUserModel {
  private readonly tableName = "users";

  public create = async (user: Omit<IUser, "id">): Promise<IUser> => {
    const [newUser] = await db(this.tableName)
      .insert(user)
      .returning<IUser[]>("*");

    return newUser;
  };

  public findOne = async (
    conditions: Partial<IUser>
  ): Promise<IUser | undefined> => {
    return db(this.tableName)
      .where(function () {
        const entries = Object.entries(conditions).filter(
          ([, value]) => value !== undefined
        );
        for (const [key, value] of entries) {
          this.orWhere(`users.${key}`, value);
        }
      })
      .select("users.*")
      .first();
  };
}

export default UserModel;
