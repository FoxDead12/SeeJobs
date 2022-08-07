import { IQueryHandler } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/queries";
import { BaseQueryHandler, IQueryHandlerStrategy } from "@see-jobs-2/seejobs-backend-api-abstract-application/queries";
import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { IReadOnlyRepository } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/repositories";
import { IRepositoryFactory } from "@see-jobs-2/seejobs-backend-api-business/interfaces/factories";
import { IReadOnlyRepositoryFactory } from "@see-jobs-2/seejobs-backend-api-infraestructure/interfaces/factories";
import { GettAllEventsView } from "@see-jobs-2/seejobs-backend-api-models/views";
import { IServiceFactory } from "../../interfaces/factories/IServiceFactory";
import { InfrastructureInterfaces } from "../../interfaces/InfrastructureInterfaces";
import { BaseEventQuery } from "../base/BaseEventQuery";
import { GetAllEventsQuery } from "./GetAllEventsQuery";

export class EventsQueriesHandler extends BaseQueryHandler implements IQueryHandler<GetAllEventsQuery, Promise<GettAllEventsView>> {
    
    constructor(
        public infrastructureInterfaces: InfrastructureInterfaces,
        public mapperFactory: IMapperFactory,
        public servicesFactory: IServiceFactory,
        private handlerStrategies: {[key: string]: IQueryHandlerStrategy<BaseEventQuery, unknown> }
    
    ){
        super(infrastructureInterfaces, mapperFactory);
    }


    Handle(query: GetAllEventsQuery): Promise<GettAllEventsView> 
    Handle(query: BaseEventQuery): Promise<unknown>{
        return (this.handlerStrategies[query.constructor.name].Handle(query, this));
    }
 
}

class GetAllEventsQueryHandlerStrategy implements IQueryHandlerStrategy<GetAllEventsQuery, Promise<GettAllEventsView[]>> {
    async Handle(query: GetAllEventsQuery, handler: EventsQueriesHandler): Promise<Promise<GettAllEventsView[]>> {
        
        const eventsRepository = (handler.infrastructureInterfaces.readOnlyRepositoryFactory as IReadOnlyRepositoryFactory).EventsReadOnlyRepository;
        const events = await eventsRepository.GetAllInventsFromUser(query.uniqueId);
        
        if(events) {
            return events;
        }
        else{
            return [];
        }
    }

}


export const eventsQueriesHandlerStrategies: { [key : string]: IQueryHandlerStrategy<BaseEventQuery, unknown> } = {
    [GetAllEventsQuery.name] : new GetAllEventsQueryHandlerStrategy()
};