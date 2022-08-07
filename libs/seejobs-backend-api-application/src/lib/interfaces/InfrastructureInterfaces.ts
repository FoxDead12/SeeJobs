import { BaseInfrastructureInterfaces } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces";
import { IReadOnlyRepositoryFactory } from "@see-jobs-2/seejobs-backend-api-infraestructure/interfaces/factories";

export interface InfrastructureInterfaces extends BaseInfrastructureInterfaces {
  readOnlyRepositoryFactory: IReadOnlyRepositoryFactory,
}
