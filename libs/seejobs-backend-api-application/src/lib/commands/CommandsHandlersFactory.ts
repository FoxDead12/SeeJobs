import { ICommandHandler, ICommandsHandlersFactory } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/commands";
import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { BusinessFactory } from "@see-jobs-2/seejobs-backend-api-business/factories";
import { IBusinessFactory } from "@see-jobs-2/seejobs-backend-api-business/interfaces/factories";
import { RepositoryFactory } from "@see-jobs-2/seejobs-backend-api-infraestructure/factories";
import { DataSource } from "typeorm";
import { IServiceFactory } from "../interfaces/factories";
import { InfrastructureInterfaces } from "../interfaces/InfrastructureInterfaces";
import { BaseEventCommand } from "./base/BaseEventCommand";
import { BaseUserCommand } from "./base/BaseUserCommand";
import { EventsCommandsHandler, eventsCommandsHandlerStrategies } from "./events/EventsCommandsHandler";
import { UsersCommandsHandler, usersCommandsHandlerStrategies } from "./user/UsersCommandsHandler";


export class CommandsHandlersFactory implements ICommandsHandlersFactory{
  private _infrastructureInterfaces: InfrastructureInterfaces;
  private _businessFactory: IBusinessFactory;

  constructor(
    private dataSource: DataSource,
    private _mapperFactory: IMapperFactory,
    private _servicesFactory: IServiceFactory
  ){
    const repositoryFactory = new RepositoryFactory(this.dataSource, this._mapperFactory);

    this._infrastructureInterfaces  = {
      readOnlyRepositoryFactory: repositoryFactory,
    };

    this._businessFactory = new BusinessFactory({
      repositoryFactory: repositoryFactory
    });

  }

  CreateCommandHandler<T>(command: T): ICommandHandler<T | unknown> {

    if(command instanceof BaseUserCommand){
      return new UsersCommandsHandler(this._infrastructureInterfaces, this._businessFactory, this._mapperFactory, this._servicesFactory, usersCommandsHandlerStrategies)
    }

    if(command instanceof BaseEventCommand) {

      return new EventsCommandsHandler(this._infrastructureInterfaces, this._businessFactory, this._mapperFactory, this._servicesFactory, eventsCommandsHandlerStrategies)
    }

    throw new Error(`No command handler implemented for that Command type ${command}!`);
  }
}
