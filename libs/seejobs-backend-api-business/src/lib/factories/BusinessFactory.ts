import { EventsAggregate, User } from "../entitys";
import { UsersAggregate } from "../entitys/UsersAggregate";
import { IEventsAggregate, IUser, IUsersAggregate } from "../interfaces/entitys";
import { IBusinessFactory, IRepositoryFactory } from "../interfaces/factories";

interface ExternalDependencies{
  repositoryFactory: IRepositoryFactory;
}

export class BusinessFactory implements IBusinessFactory {
  private _externalDependencies: ExternalDependencies;

  constructor(externalDependencies: ExternalDependencies){
    this._externalDependencies = externalDependencies;
  }

  CreateEventAggregate(transaction: string): IEventsAggregate {
    return new EventsAggregate(transaction, {...this._externalDependencies, businessFactory: this})
  }
  
  CreateUserAggregate(transaction: string): IUsersAggregate {
    return new UsersAggregate(transaction, {...this._externalDependencies, businessFactory: this});
  }
  
  CreateUser(transaction: string, entity: IUser): IUser {
    
    return new User(transaction, {...this._externalDependencies, businessFactory: this}, entity);
  }

  public async BeginChanges(): Promise<string> {
    const transactionId = `Transaction_${(new Date()).getTime()}`
    const transaction: string =  transactionId;
    await this._externalDependencies.repositoryFactory.BeginChanges(transaction);
    return transaction;
  }

  public async SaveChanges(transaction : string): Promise<void> {
    await this._externalDependencies.repositoryFactory.SaveChanges(transaction);
  }

  public async RollbackChanges(transaction : string): Promise<void>{
    await this._externalDependencies.repositoryFactory.RollbackChanges(transaction);
  }

  public async ClearTransaction(transaction : string): Promise<void> {
    await this._externalDependencies.repositoryFactory.ClearTransaction(transaction);
  }
}
