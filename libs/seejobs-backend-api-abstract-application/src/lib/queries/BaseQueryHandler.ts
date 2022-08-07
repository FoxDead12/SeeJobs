import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { BaseInfrastructureInterfaces } from "../interfaces/BaseInfrastructureInterfaces";

export interface IQueryHandlerStrategy<T, R>{
  Handle(query: T, handler: BaseQueryHandler): Promise<R>;
}

export abstract class BaseQueryHandler {
  constructor(
    protected _infrastructureInterfaces: BaseInfrastructureInterfaces,
    protected _mapperFactory: IMapperFactory
  ) {}
}
