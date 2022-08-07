import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { IQueriesHandlersFactory } from "../interfaces/queries";

export abstract class BaseQueriesService{
  constructor(
    protected _mapperFactory: IMapperFactory,
    protected _queriesHandlersFactory: IQueriesHandlersFactory
  ){}
}
