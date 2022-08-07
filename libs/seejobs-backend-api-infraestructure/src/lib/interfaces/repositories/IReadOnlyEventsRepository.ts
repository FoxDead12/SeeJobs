import { IReadOnlyRepository } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/repositories";
import { IEvent } from "@see-jobs-2/seejobs-backend-api-business/interfaces/entitys";
import { DtoEvent } from "@see-jobs-2/seejobs-backend-api-models/dtos";
import { GettAllEventsView } from "@see-jobs-2/seejobs-backend-api-models/views";


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IReadOnlyEventsRepository extends IReadOnlyRepository<DtoEvent> {
    GetAllInventsFromUser(uniqueID: string): Promise<GettAllEventsView[]>;
}
