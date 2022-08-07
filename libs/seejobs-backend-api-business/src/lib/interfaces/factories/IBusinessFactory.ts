import { IBaseBusinessFactory } from "@see-jobs-2/seejobs-backend-api-abstract-business/interfaces/factories";
import { IEventsAggregate, IUser, IUsersAggregate } from "../entitys";


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IBusinessFactory extends IBaseBusinessFactory{
  
  CreateUserAggregate(transaction: string): IUsersAggregate;
  CreateEventAggregate(transaction: string): IEventsAggregate;
  CreateUser(transaction: string, entity: IUser): IUser;
}
