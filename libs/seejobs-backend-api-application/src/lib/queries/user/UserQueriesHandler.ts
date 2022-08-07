import { UnauthorizedException } from "@nestjs/common";
import { IQueryHandler } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/queries";
import { BaseQueryHandler, IQueryHandlerStrategy } from "@see-jobs-2/seejobs-backend-api-abstract-application/queries";
import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { IReadOnlyRepositoryFactory } from "@see-jobs-2/seejobs-backend-api-infraestructure/interfaces/factories";
import { InvalidCredencialsException } from "@see-jobs-2/seejobs-backend-api-models/exceptions";
import { IServiceFactory } from "../../interfaces/factories/IServiceFactory";
import { InfrastructureInterfaces } from "../../interfaces/InfrastructureInterfaces";
import { BaseUserQuery } from "../base/BaseUserQuery";
import { UserLoginQuery } from "./UserLoginQuery";
import { UserValidationQuery } from "./UserValidationQuery";

export class UsersQueriesHandler extends BaseQueryHandler implements IQueryHandler<UserLoginQuery, Promise<string>> {

    constructor(
      public infrastructureInterfaces: InfrastructureInterfaces,
      public mapperFactory: IMapperFactory,
      public servicesFactory: IServiceFactory,
      private handlerStrategies: {[key: string]: IQueryHandlerStrategy<BaseUserQuery, unknown> }
  
    ){
        super(infrastructureInterfaces, mapperFactory);
    }
  
    Handle(query: UserLoginQuery): Promise<string>
    Handle(query: BaseUserQuery): Promise<unknown> {
      return (this.handlerStrategies[query.constructor.name].Handle(query, this));
    }
}

class UserLoginQueryHandlerStrategy implements IQueryHandlerStrategy<UserLoginQuery, string> {
  async Handle(query: UserLoginQuery, handler: UsersQueriesHandler): Promise<string> {
    
    //TENHO DE BUSCAR O UTILIZADOR A BASE DE DADOS
    const user = await (handler.infrastructureInterfaces.readOnlyRepositoryFactory as IReadOnlyRepositoryFactory).UsersReadOnlyRepository.Login(query.email, query.password);

    if(!user) {
      throw new InvalidCredencialsException();
    }

    const token = (handler.servicesFactory as IServiceFactory).ITokenGenerateService.GenerateToken(user.uniqueId, query.keepSession);
    return token;
  }
}

class UserValidationQueryHandlerStrategy implements IQueryHandlerStrategy<UserValidationQuery, Promise<boolean>> {
  async Handle(query: UserValidationQuery, handler: UsersQueriesHandler): Promise<Promise<boolean>> {
    
    const user = await (handler.infrastructureInterfaces.readOnlyRepositoryFactory as IReadOnlyRepositoryFactory).UsersReadOnlyRepository.GetUserByUniqueId(query.uniqueId);
    
    if(!user) {

      throw new UnauthorizedException();
    }

    return true;
  }
  
}


export const usersQueriesHandlerStrategies: { [key : string]: IQueryHandlerStrategy<BaseUserQuery, unknown> } = {
    [UserLoginQuery.name]: new UserLoginQueryHandlerStrategy(),
    [UserValidationQuery.name]: new UserValidationQueryHandlerStrategy()
};
  