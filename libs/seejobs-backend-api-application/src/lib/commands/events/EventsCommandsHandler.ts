import { BaseCommandHandler, ICommandHandlerStrategy } from "@see-jobs-2/seejobs-backend-api-abstract-application/commands";
import { ICommandHandler } from "@see-jobs-2/seejobs-backend-api-abstract-application/interfaces/commands";
import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { IEvent } from "@see-jobs-2/seejobs-backend-api-business/interfaces/entitys";
import { IBusinessFactory } from "@see-jobs-2/seejobs-backend-api-business/interfaces/factories";
import { IServiceFactory } from "../../interfaces/factories/IServiceFactory";
import { InfrastructureInterfaces } from "../../interfaces/InfrastructureInterfaces";
import { BaseEventCommand } from "../base/BaseEventCommand";
import { CreateNewEventCommand } from "./CreateNewEventCommand";
import { DeleteEventCommand } from "./DeleteEventCommand";

export class EventsCommandsHandler extends BaseCommandHandler implements ICommandHandler<BaseEventCommand> {
    
    constructor(
        infrastructureInterfaces: InfrastructureInterfaces,
        businessFactory: IBusinessFactory,
        mapperFactory: IMapperFactory,
        public servicesFactory: IServiceFactory,
        private handlerStrategies: {[key: string]: ICommandHandlerStrategy<BaseEventCommand> }

    ){
        super(infrastructureInterfaces, businessFactory, mapperFactory);
    }

    async Handle(command: BaseEventCommand): Promise<void> {
        await this.handlerStrategies[command.constructor.name].Handle(command, this);
    }
}

class CreateNewEventCommandHandlerStrategy implements ICommandHandlerStrategy<CreateNewEventCommand> {
    async Handle(command: CreateNewEventCommand, handler: BaseCommandHandler): Promise<void> {
        await handler.BaseHandle(async (transaction) => {

            //Criar entidade de EVENT

            const eventAggregate = (handler._businessFactory as IBusinessFactory).CreateEventAggregate(transaction);
            await eventAggregate.Add({data: command.data, descricao: command.descricao, titulo: command.titulo, userUniqueId: command.uniqueId, horas: command.hora} as IEvent);
        });
    }

}

class DeleteEventCommandHandlerStrategy implements ICommandHandlerStrategy<DeleteEventCommand> {
    async Handle(command: DeleteEventCommand, handler: BaseCommandHandler): Promise<void> {
        await handler.BaseHandle(async (transaction) => {
            const eventAggregate = (handler._businessFactory as IBusinessFactory).CreateEventAggregate(transaction);
            await eventAggregate.Delete({titulo: command.title, userUniqueId: command.uniqueId} as IEvent)
        });
    }


}

export const eventsCommandsHandlerStrategies: { [key : string]: ICommandHandlerStrategy<BaseEventCommand> } = {
    [CreateNewEventCommand.name]: new CreateNewEventCommandHandlerStrategy(),
    [DeleteEventCommand.name]: new DeleteEventCommandHandlerStrategy()
};