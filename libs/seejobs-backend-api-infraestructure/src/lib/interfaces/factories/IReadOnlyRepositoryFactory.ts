import { IBaseReadOnlyRepositoryFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/factories";
import { IReadOnlyUsersRepository } from "../repositories";
import { IReadOnlyEventsRepository } from "../repositories/IReadOnlyEventsRepository";


export interface IReadOnlyRepositoryFactory extends IBaseReadOnlyRepositoryFactory{
  UsersReadOnlyRepository: IReadOnlyUsersRepository;
  EventsReadOnlyRepository: IReadOnlyEventsRepository;
}
