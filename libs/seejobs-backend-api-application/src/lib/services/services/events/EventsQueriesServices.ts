import { GettAllEventsView } from "@see-jobs-2/seejobs-backend-api-models/views";
import { IEventQueriesServices } from "../../../interfaces/services/IEventQueriesServices";
import { GetAllEventsQuery } from "../../../queries";
import { AbstractQueriesService } from "../../AbstractQueriesService";

export class EventQueriesServices extends AbstractQueriesService implements IEventQueriesServices {
    
    async GetAllEvents(uniqueId: string): Promise<GettAllEventsView[]> {
    
        const query = new GetAllEventsQuery(uniqueId);
        const handler = this._queriesHandlersFactory.CreateQueryHandler<GetAllEventsQuery, Promise<GettAllEventsView[]>>(query);
        return await handler.Handle(query);
    }


}