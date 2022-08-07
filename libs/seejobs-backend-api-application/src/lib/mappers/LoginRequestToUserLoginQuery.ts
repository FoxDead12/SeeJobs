import { AbstractMapper } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/mappers";
import { LoginRequest } from "@see-jobs-2/seejobs-backend-api-models/request";
import { UserLoginQuery } from "../queries";

export class LoginRequestToUserLoginQuery extends AbstractMapper<LoginRequest, UserLoginQuery> {
    public Map(inObject: LoginRequest): UserLoginQuery {
        
        const query = new UserLoginQuery();
        Object.assign(query, inObject);
        return query;
    }

}