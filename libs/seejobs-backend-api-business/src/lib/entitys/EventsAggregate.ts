import { IEvent } from "../interfaces/entitys";
import { IEventsAggregate } from "../interfaces/entitys/IEventsAggregate";
import { BusinessBase } from "./BusinessBase";

export class EventsAggregate extends BusinessBase implements IEventsAggregate  {
    
    Get(id: number): Promise<IEvent> {
        throw new Error("Method not implemented.");
    }

    async Add(entity: IEvent): Promise<void> {

        await this._repositoryFactory.EventRepository.Add(entity);
    }

    Delete(id: number): Promise<void>;
    Delete(entity: IEvent): Promise<void>;
    Delete(entities: IEvent[]): Promise<void>;
    Delete(entities: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }
    
}