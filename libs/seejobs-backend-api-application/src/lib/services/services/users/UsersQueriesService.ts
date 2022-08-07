import { LoginRequest } from "@see-jobs-2/seejobs-backend-api-models/request";
import { IUsersQueriesService } from "../../../interfaces/services/IUsersQueriesService";
import { UserLoginQuery } from "../../../queries";
import { UserValidationQuery } from "../../../queries/user/UserValidationQuery";
import { AbstractQueriesService } from "../../AbstractQueriesService";

export class UsersQueriesService extends AbstractQueriesService implements IUsersQueriesService {
    
    async Login(request: LoginRequest): Promise<string> {
        
        const mapper = this._mapperFactory.Create<LoginRequest, UserLoginQuery>(LoginRequest, UserLoginQuery);
        const query = mapper.Map(request);
        const handler = this._queriesHandlersFactory.CreateQueryHandler<UserLoginQuery, Promise<string>>(query);
        return await handler.Handle(query);
    }
    
    async UserValidation(uniqueId: string): Promise<boolean> {
        
        const query = new UserValidationQuery({uniqueId});
        const handle = this._queriesHandlersFactory.CreateQueryHandler<UserValidationQuery, Promise<boolean>>(query);
        return await handle.Handle(query);
    }
}