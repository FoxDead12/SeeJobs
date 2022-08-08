import { AbstractMapper } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/mappers";
import { DeleteEventRequest } from "@see-jobs-2/seejobs-backend-api-models/request";
import { DeleteEventCommand } from "../commands/events/DeleteEventCommand";

export class DeleteEventRequestToDeleteEventCommand extends AbstractMapper<DeleteEventRequest, DeleteEventCommand> {
    public Map(inObject: DeleteEventRequest): DeleteEventCommand {
        const command = new DeleteEventCommand();

        Object.assign(command, inObject);
        return command;
    }
}