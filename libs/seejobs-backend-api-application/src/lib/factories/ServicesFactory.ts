import { ICommandsHandlersFactory } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/commands";
import { IQueriesHandlersFactory } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/queries";
import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { MapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/mappers";
import { InfrustructureMappers } from "@see-jobs-2/seejobs-backend-api-infraestructure/mappers";
import { DataSource } from "typeorm";
import { CommandsHandlersFactory } from "../commands";
import { IServiceFactory } from "../interfaces/factories";
import { IEventQueriesServices } from "../interfaces/services/IEventQueriesServices";
import { IEventsCommandServies } from "../interfaces/services/IEventsCommandServies";
import { ITokenGenerateService } from "../interfaces/services/ITokenGenerateService";
import { IUsersCommandService } from "../interfaces/services/IUsersCommandService";
import { IUsersQueriesService } from "../interfaces/services/IUsersQueriesService";
import { ApplicationMappers } from "../mappers";
import { QueriesHandlersFactory } from "../queries";
import { EventsCommandServies } from "../services/services/events/EventsCommandServies";
import { EventQueriesServices } from "../services/services/events/EventsQueriesServices";
import { TokenGenerateService } from "../services/services/TokenGenerateService";
import { UsersCommandService } from "../services/services/users/UsersCommandService";
import { UsersQueriesService } from "../services/services/users/UsersQueriesService";

export interface EnviromentConfig {
  jwtSecret: string
}

export class ServicesFactory implements IServiceFactory {

  private _commandsHandlersFactory: ICommandsHandlersFactory;
  private _queriesHandlersFactory: IQueriesHandlersFactory;
  private _mapperFactory: IMapperFactory;

  constructor(
    private dataSource: DataSource,
    private enviromentConfig: EnviromentConfig
  ){
    this._mapperFactory = new MapperFactory({...ApplicationMappers ,...InfrustructureMappers}); //...AplicationMappers, ...InfrustructureMappers
    this._commandsHandlersFactory = new CommandsHandlersFactory(this.dataSource, this._mapperFactory, this);
    this._queriesHandlersFactory = new QueriesHandlersFactory(this.dataSource, this._mapperFactory, this);
  }
  
  get IUsersCommandService(): IUsersCommandService {
    
    return new UsersCommandService(this._mapperFactory, this._commandsHandlersFactory, this);
  }
  
  get  IUsersQueriesService(): IUsersQueriesService {
    
    return new UsersQueriesService(this._mapperFactory, this._queriesHandlersFactory, this);
  }
  
  get ITokenGenerateService(): ITokenGenerateService {
    
    return new TokenGenerateService(this.enviromentConfig.jwtSecret);
  }
  
  get IEventsCommandServies(): IEventsCommandServies {
    return new EventsCommandServies(this._mapperFactory, this._commandsHandlersFactory, this);
  }
  
  get IEventQueriesServices(): IEventQueriesServices {
    return new EventQueriesServices(this._mapperFactory, this._queriesHandlersFactory, this)
  }

}
