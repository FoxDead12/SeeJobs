/* eslint-disable @typescript-eslint/no-empty-interface */
import { IAggregate } from "@see-jobs-2/seejobs-backend-api-abstract-business/interfaces/entetis";
import { IUser } from "./IUser";

export interface IUsersAggregate extends IAggregate<IUser>{

    CreateRootUser(): Promise<string>;
    CreatNewUser(entity: Partial<IUser>): Promise<IUser>;
}