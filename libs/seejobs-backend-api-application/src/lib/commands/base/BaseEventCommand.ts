import { ICommand } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/commands";

export abstract class BaseEventCommand implements ICommand {
    userId!: string;
    uniqueId!: string;
}