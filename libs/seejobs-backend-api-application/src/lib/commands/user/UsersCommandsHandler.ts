import { BaseCommandHandler, ICommandHandlerStrategy } from "@see-jobs-2/seejobs-backend-api-abstract-application/commands";
import { ICommandHandler } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/commands";
import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { IBusinessFactory } from "@see-jobs-2/seejobs-backend-api-business/interfaces/factories";
import { IServiceFactory } from "../../interfaces/factories/IServiceFactory";
import { InfrastructureInterfaces } from "../../interfaces/InfrastructureInterfaces";
import { BaseUserCommand } from "../base/BaseUserCommand";
import { CreateRootUserCommand } from "./CreateRootUserCommand";

export class UsersCommandsHandler extends BaseCommandHandler implements ICommandHandler<BaseUserCommand> {
    
    constructor(
        infrastructureInterfaces: InfrastructureInterfaces,
        businessFactory: IBusinessFactory,
        mapperFactory: IMapperFactory,
        public servicesFactory: IServiceFactory,
        private handlerStrategies: {[key: string]: ICommandHandlerStrategy<BaseUserCommand> }

    ){
        super(infrastructureInterfaces, businessFactory, mapperFactory);
    }

    async Handle(command: BaseUserCommand): Promise<void> {
        await this.handlerStrategies[command.constructor.name].Handle(command, this);
    }
}

class CreateRootUserCommandHandlerStrategy implements ICommandHandlerStrategy<CreateRootUserCommand> {
    async Handle(command: CreateRootUserCommand, handler: UsersCommandsHandler): Promise<void> {
        await handler.BaseHandle(async (transaction) => {

            const userAggregate = (handler._businessFactory as IBusinessFactory).CreateUserAggregate(transaction);
            command.commandResult = await userAggregate.CreateRootUser();
        });
    }
}

export const usersCommandsHandlerStrategies: { [key : string]: ICommandHandlerStrategy<BaseUserCommand> } = {
    [CreateRootUserCommand.name]: new CreateRootUserCommandHandlerStrategy(),
};