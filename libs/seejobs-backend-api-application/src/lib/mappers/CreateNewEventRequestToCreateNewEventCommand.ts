import { AbstractMapper } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/mappers";
import { CreateNewEventRequest } from "@see-jobs-2/seejobs-backend-api-models/request";
import { CreateNewEventCommand } from "../commands/events/CreateNewEventCommand";

export class CreateNewEventRequestToCreateNewEventCommand extends AbstractMapper<CreateNewEventRequest, CreateNewEventCommand> {
    public Map(inObject: CreateNewEventRequest): CreateNewEventCommand {
        const command = new CreateNewEventCommand();

        Object.assign(command, inObject);
        return command;
    }
}