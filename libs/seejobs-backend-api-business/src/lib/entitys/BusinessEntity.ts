import { AbstractBusinessEntity } from "@see-jobs-2/seejobs-backend-api-abstract-business/enitys";
import { IBusinessFactory, IInjectedDependencies, IRepositoryFactory } from "../interfaces/factories";

export abstract class BusinessEntity extends AbstractBusinessEntity
{
    protected _id!: number;
    protected _isIdSetted!: boolean;
    protected _repositoryFactory!: IRepositoryFactory;
    protected _businessFactory!: IBusinessFactory;

    constructor(transaction : string, factories: IInjectedDependencies)
    {
      super(transaction, factories);
    }
}
