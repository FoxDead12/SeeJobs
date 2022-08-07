import { ICommandResult } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/commands";
import { BaseEventCommand } from "../base/BaseEventCommand";

export class CreateNewEventCommand extends BaseEventCommand implements ICommandResult<void>{

    titulo: string;
    descricao: string;
    data: Date;
    hora?: Date;
    commandResult?: void;
}