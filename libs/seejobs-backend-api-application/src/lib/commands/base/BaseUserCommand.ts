import { ICommand } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/commands";

export abstract class BaseUserCommand implements ICommand {
    userId!: string;

}