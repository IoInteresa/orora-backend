import IUser from './IUser';

export default interface IUserModel {
    create: (user: Omit<IUser, 'id'>) => Promise<IUser>;
    findOne: (conditions: Partial<IUser>) => Promise<IUser | undefined>;
    updateVerified: (user: IUser) => Promise<IUser>;
}
