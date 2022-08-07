import { IQueriesHandlersFactory, IQueryHandler } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/queries";
import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { RepositoryFactory } from "@see-jobs-2/seejobs-backend-api-infraestructure/factories";
import { DataSource } from "typeorm";
import { IServiceFactory } from "../interfaces/factories";
import { InfrastructureInterfaces } from "../interfaces/InfrastructureInterfaces";
import { UsersQueriesService } from "../services/services/users/UsersQueriesService";
import { BaseEventQuery } from "./base/BaseEventQuery";
import { BaseUserQuery } from "./base/BaseUserQuery";
import { EventsQueriesHandler, eventsQueriesHandlerStrategies } from "./events/EventsQueriesHandler";
import { UsersQueriesHandler, usersQueriesHandlerStrategies } from "./user/UserQueriesHandler";


export class QueriesHandlersFactory implements IQueriesHandlersFactory {
  private _infrastructureInterfaces: InfrastructureInterfaces;

  constructor(
    private _dataSource: DataSource,
    private _mapperFactory: IMapperFactory,
    private _servicesFactory: IServiceFactory
  ){
    const repositoryFactory = new RepositoryFactory(this._dataSource, this._mapperFactory);

    this._infrastructureInterfaces  = {
      readOnlyRepositoryFactory: repositoryFactory,
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  CreateQueryHandler<T, R>(query: T): IQueryHandler<T | any | unknown, R | any> {
    if(query instanceof BaseUserQuery){
      return new UsersQueriesHandler(this._infrastructureInterfaces, this._mapperFactory, this._servicesFactory, usersQueriesHandlerStrategies);
    }

    if(query instanceof BaseEventQuery){
      return new EventsQueriesHandler(this._infrastructureInterfaces, this._mapperFactory, this._servicesFactory, eventsQueriesHandlerStrategies);
    }

    throw new Error(`No query handler implemented for that Query type ${query}!`);
  }
}
