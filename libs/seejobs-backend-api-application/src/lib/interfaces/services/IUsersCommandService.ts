import { LoginRequest } from "@see-jobs-2/seejobs-backend-api-models/request";

export interface IUsersCommandService {

    CreateUserRoot():Promise<string>;
}