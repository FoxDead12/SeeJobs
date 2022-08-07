import { IBaseBusinessFactory } from "./IBaseBusinessFactory";
import { IBaseRepositoryFactory } from "./IBaseRepositoryFactory";


export interface IBaseInjectedDependencies {
  repositoryFactory: IBaseRepositoryFactory;
  businessFactory: IBaseBusinessFactory
}
