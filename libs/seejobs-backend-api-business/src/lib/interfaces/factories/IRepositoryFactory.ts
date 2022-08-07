import { IBaseRepositoryFactory } from "@see-jobs-2/seejobs-backend-api-abstract-business/interfaces/factories";
import { IEventRepository, IUserRepository } from "../repositories";

export interface IRepositoryFactory extends IBaseRepositoryFactory {
  UsersRepository: IUserRepository;
  EventRepository: IEventRepository;
}
