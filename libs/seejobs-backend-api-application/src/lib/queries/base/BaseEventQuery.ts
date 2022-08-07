import { IQuery } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/queries";

export abstract class BaseEventQuery implements IQuery {
    userId: string;
    uniqueId: string;
}