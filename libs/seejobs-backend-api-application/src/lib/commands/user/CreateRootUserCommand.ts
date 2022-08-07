import { ICommandResult } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/commands";
import { BaseUserCommand } from "../base/BaseUserCommand";

export class CreateRootUserCommand extends BaseUserCommand implements ICommandResult<string>{

    commandResult!: string;
}