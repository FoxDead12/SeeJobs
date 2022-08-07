import { IBaseInjectedDependencies } from "@see-jobs-2/seejobs-backend-api-abstract-business/interfaces/factories";
import { IBusinessFactory } from "./IBusinessFactory";
import { IRepositoryFactory } from "./IRepositoryFactory";


export interface IInjectedDependencies extends IBaseInjectedDependencies{
  repositoryFactory: IRepositoryFactory;
  businessFactory: IBusinessFactory;
}
