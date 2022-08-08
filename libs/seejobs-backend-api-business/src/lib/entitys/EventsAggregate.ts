import { IEvent } from "../interfaces/entitys";
import { IEventsAggregate } from "../interfaces/entitys/IEventsAggregate";
import { BusinessBase } from "./BusinessBase";
import { Event } from "./Event";

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
    async Delete(data: number | IEvent | IEvent[]): Promise<void> {

        if(typeof data === "number"){

            await this._repositoryFactory.EventRepository.Delete(data);
        } else if ((data as IEvent[]).length) {
            throw new Error("Method Not Implemented!")
        }
        else {     
            await this._repositoryFactory.EventRepository.Delete(data as IEvent);
        }
    }
    
}