import { GettAllEventsView } from "@see-jobs-2/seejobs-backend-api-models/views";

export interface IEventQueriesServices {

    GetAllEvents(uniqueId: string): Promise<GettAllEventsView[]>;
}