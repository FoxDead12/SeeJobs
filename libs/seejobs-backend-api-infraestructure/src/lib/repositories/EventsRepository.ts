import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { AbstractMapper } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/mappers";
import { BaseRepository } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/repositories";
import { Event } from "@see-jobs-2/seejobs-backend-api-business/entitys";
import { IEvent } from "@see-jobs-2/seejobs-backend-api-business/interfaces/entitys";
import { IEventRepository } from "@see-jobs-2/seejobs-backend-api-business/interfaces/repositories";
import { DtoEvent } from "@see-jobs-2/seejobs-backend-api-models/dtos";
import { GettAllEventsView } from "@see-jobs-2/seejobs-backend-api-models/views";
import { QueryRunner, Repository } from "typeorm";
import { IReadOnlyEventsRepository } from "../interfaces/repositories/IReadOnlyEventsRepository";

export class EventsRepository extends BaseRepository<IEvent, DtoEvent> implements IEventRepository, IReadOnlyEventsRepository{
    
    private entityToDtoMapper: AbstractMapper<IEvent, DtoEvent>;
    private dtoToViewMapper: AbstractMapper<DtoEvent, GettAllEventsView>;
    // private dtoToEntityMapper: AbstractMapper<DtoEvent, IEvent>;

    constructor(
        protected _repository: Repository<DtoEvent>,
        protected _mapperFactory: IMapperFactory,
        protected _runners: {[key: string]: QueryRunner},
        protected _transaction: string
    ){
        super(_repository, _mapperFactory, _runners, _transaction);
        this.entityToDtoMapper = this._mapperFactory.Create(Event, DtoEvent);
        this.dtoToViewMapper = this._mapperFactory.Create(DtoEvent, GettAllEventsView);
        // this.dtoToEntityMapper = this._mapperFactory.Create(DtoEvent, Event);
    }


    async GetAllInventsFromUser(uniqueID: string): Promise<GettAllEventsView[]> {
        const events =  await this._repository.findBy({userUniqueId: uniqueID});

        if(events) {
            return this.dtoToViewMapper.MapMany(events);
        }
        else{
            
            return null;
        }
    }
    
    public AddMany(entitys: IEvent[], source?: IEvent | undefined): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public GetEntityBy(entity: Partial<IEvent>): Promise<IEvent> {
        throw new Error("Method not implemented.");
    }
    public GetEntity(id: number): Promise<IEvent> {
        throw new Error("Method not implemented.");
    }

    public async Add(entity: IEvent): Promise<void> {

        const runner = this._runners[this._transaction];
        const dtoEvent = this.entityToDtoMapper.Map(entity)
        await runner.manager.save(dtoEvent);
    }

    public Update(entity: IEvent): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public Delete(id: number): Promise<void>;
    public Delete(entity: IEvent): Promise<void>;
    public Delete(entities: IEvent[]): Promise<void>;
    public Delete(data: number | IEvent | IEvent[]): Promise<void>;
    public async Delete(data: any): Promise<void> {

        const runner = this._runners[this._transaction];


        if(typeof data === 'number') {
        await runner.manager.softDelete(DtoEvent, {id: data});
        } else if((data as IEvent[]).length) {
        const promises: Promise<unknown>[] = [];

        (data as IEvent[]).forEach(x => {
            promises.push(runner.manager.softDelete(DtoEvent, {id: x.id}));
        });

        await Promise.all(promises);
        } else {
        const entity = (data as IEvent);
        await runner.manager.delete(DtoEvent, entity);
        }

    }

}