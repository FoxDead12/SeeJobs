
import { ICommandsHandlersFactory } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/commands";
import { BaseCommandsService } from "@see-jobs-2/seejobs-backend-api-abstract-application/services";
import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { IServiceFactory } from "../interfaces/factories";

export class AbstractCommandsService extends BaseCommandsService {
  constructor(
    _mapperFactory: IMapperFactory,
    _commandHandlerFactory: ICommandsHandlersFactory,
    protected _serviceFactory: IServiceFactory
  ){
    super(_mapperFactory, _commandHandlerFactory);
  }
}
