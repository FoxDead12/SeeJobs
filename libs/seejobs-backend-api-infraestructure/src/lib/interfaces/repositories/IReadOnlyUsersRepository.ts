import { IReadOnlyRepository } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/repositories";
import { IUser } from "@see-jobs-2/seejobs-backend-api-business/interfaces/entitys";
import { DtoUser } from "@see-jobs-2/seejobs-backend-api-models/dtos";


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IReadOnlyUsersRepository extends IReadOnlyRepository<DtoUser> {
    Login(email: string, password: string): Promise<IUser>;
    GetUserByUniqueId(uniqueId: string): Promise<IUser>;
}
