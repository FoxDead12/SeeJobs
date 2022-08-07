import { AbstractRepositoryFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/repositories";
import { IRepositoryFactory } from "@see-jobs-2/seejobs-backend-api-business/interfaces/factories";
import { IUserRepository, IEventRepository } from "@see-jobs-2/seejobs-backend-api-business/interfaces/repositories";
import { DtoEvent, DtoUser } from "@see-jobs-2/seejobs-backend-api-models/dtos";
import { getRepository } from "typeorm";
import { IReadOnlyRepositoryFactory } from "../interfaces/factories";
import { IReadOnlyUsersRepository } from "../interfaces/repositories";
import { IReadOnlyEventsRepository } from "../interfaces/repositories/IReadOnlyEventsRepository";
import { EventsRepository } from "../repositories/EventsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

export class RepositoryFactory extends AbstractRepositoryFactory implements IReadOnlyRepositoryFactory, IRepositoryFactory {
    _: unknown;
    
    get UsersRepository(): IUserRepository {
        this.CheckTransaction();
        return new UsersRepository(this.dataSource.getRepository(DtoUser), this._mapperFactory, this._runners, this._transaction);
    }
    
    get EventRepository(): IEventRepository {
        this.CheckTransaction();
        return new EventsRepository(this.dataSource.getRepository(DtoEvent), this._mapperFactory, this._runners, this._transaction);
    }
    
    get UsersReadOnlyRepository(): IReadOnlyUsersRepository {
        return new UsersRepository(this.dataSource.getRepository(DtoUser), this._mapperFactory, this._runners, this._transaction);
    }
    
    get EventsReadOnlyRepository(): IReadOnlyEventsRepository {
        return new EventsRepository(this.dataSource.getRepository(DtoEvent), this._mapperFactory, this._runners, this._transaction);
    }

    private CheckTransaction(){

        if(!this._transaction){
            throw new Error("Transaction Must be started first!");
        }
    }
}
