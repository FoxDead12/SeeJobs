
import { IQueriesHandlersFactory } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/queries";
import { BaseQueriesService } from "@see-jobs-2/seejobs-backend-api-abstract-application/services";
import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { IServiceFactory } from "../interfaces/factories";

export class AbstractQueriesService extends BaseQueriesService {
  constructor(
    _mapperFactory: IMapperFactory,
    _queriesHandlersFactory: IQueriesHandlersFactory,
    protected _serviceFactory: IServiceFactory
  ){
    super(_mapperFactory, _queriesHandlersFactory);
  }
}
