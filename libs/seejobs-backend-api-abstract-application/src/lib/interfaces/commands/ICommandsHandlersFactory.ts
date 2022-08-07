import { ICommandHandler } from ".";

export interface ICommandsHandlersFactory {
  CreateCommandHandler<T>(command: T): ICommandHandler<T>;
}
