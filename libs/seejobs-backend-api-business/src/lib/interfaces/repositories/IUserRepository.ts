import { IBusinessRepository } from "@see-jobs-2/seejobs-backend-api-abstract-business/interfaces/repositories";
import { IUser } from "../entitys";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IUserRepository extends IBusinessRepository<IUser> {

    CreateNewUser(email: string, password: string, name: string): Promise<IUser>;
}