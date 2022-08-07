import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { ICommandsHandlersFactory } from "../interfaces/commands";

export abstract class BaseCommandsService{
  constructor(
    protected _mapperFactory: IMapperFactory,
    protected _commandHandlerFactory: ICommandsHandlersFactory
  ){}
}
