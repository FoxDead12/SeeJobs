import { ICommandResult } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/commands";
import { BaseEventCommand } from "../base/BaseEventCommand";

export class DeleteEventCommand extends BaseEventCommand implements ICommandResult<void> {

    title: string;
    commandResult?: void;
}