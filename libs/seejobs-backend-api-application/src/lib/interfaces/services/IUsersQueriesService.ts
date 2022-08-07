import { LoginRequest } from "@see-jobs-2/seejobs-backend-api-models/request";

export interface IUsersQueriesService {

    Login(request: LoginRequest): Promise<string>;
    UserValidation(uniqueId: string): Promise<boolean>;
}