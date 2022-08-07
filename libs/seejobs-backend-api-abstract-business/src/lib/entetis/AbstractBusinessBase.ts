import { IBaseBusinessFactory, IBaseRepositoryFactory, IBaseInjectedDependencies } from "../interfaces/factories";

export abstract class AbstractBusinessBase {
    protected _repositoryFactory: IBaseRepositoryFactory;
    protected _businessFactory: IBaseBusinessFactory;

    constructor(
      protected _transaction : string,
      dependencies: IBaseInjectedDependencies)
    {
        this._repositoryFactory = dependencies.repositoryFactory;
        this._businessFactory = dependencies.businessFactory;
    }
}
