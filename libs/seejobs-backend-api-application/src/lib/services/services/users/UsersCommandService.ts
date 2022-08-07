import { BaseCommandsService } from "@see-jobs-2/seejobs-backend-api-abstract-application/services";
import { CreateRootUserCommand } from "../../../commands/user/CreateRootUserCommand";
import { IUsersCommandService } from "../../../interfaces/services/IUsersCommandService";
import { AbstractCommandsService } from "../../AbstractCommandsService";

export class UsersCommandService extends AbstractCommandsService implements IUsersCommandService {
    
    async CreateUserRoot(): Promise<string> {
        
        const command = new CreateRootUserCommand();
        const handler = this._commandHandlerFactory.CreateCommandHandler(command);
        await handler.Handle(command);
        return command.commandResult;
    }
}