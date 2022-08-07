import { IEvent } from "@see-jobs-2/seejobs-backend-api-business/interfaces/entitys";
import { CreateNewEventRequest } from "@see-jobs-2/seejobs-backend-api-models/request";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IEventsCommandServies {

    CreateNewEvent(request: CreateNewEventRequest): Promise<void>;
}