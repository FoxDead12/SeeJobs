import { CreateNewEventRequest, DeleteEventRequest } from "@see-jobs-2/seejobs-backend-api-models/request";
import { CreateNewEventCommand } from "../../../commands/events/CreateNewEventCommand";
import { DeleteEventCommand } from "../../../commands/events/DeleteEventCommand";
import { IEventsCommandServies } from "../../../interfaces/services/IEventsCommandServies";
import { AbstractCommandsService } from "../../AbstractCommandsService";

export class EventsCommandServies extends AbstractCommandsService implements IEventsCommandServies {
    
    async CreateNewEvent(request: CreateNewEventRequest): Promise<void> {
        
        const mapper = this._mapperFactory.Create<CreateNewEventRequest , CreateNewEventCommand>(CreateNewEventRequest,CreateNewEventCommand);
        const command = mapper.Map(request);
        const handler = this._commandHandlerFactory.CreateCommandHandler(command);
        await handler.Handle(command);
        return command.commandResult;
    }
    
    async DeleteEvent(request: DeleteEventRequest): Promise<void> {

        const mapper = this._mapperFactory.Create<DeleteEventRequest,DeleteEventCommand>(DeleteEventRequest,DeleteEventCommand);
        const command = mapper.Map(request);
        const handler = this._commandHandlerFactory.CreateCommandHandler(command);
        await handler.Handle(command);
        return command.commandResult;
    }
    

}