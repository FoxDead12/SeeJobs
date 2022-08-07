import { AbstractBusinessBase } from "@see-jobs-2/seejobs-backend-api-abstract-business/enitys";
import { IBusinessFactory, IRepositoryFactory } from "../interfaces/factories";

export abstract class BusinessBase extends AbstractBusinessBase {
    protected _repositoryFactory!: IRepositoryFactory;
    protected _businessFactory!: IBusinessFactory;
}
