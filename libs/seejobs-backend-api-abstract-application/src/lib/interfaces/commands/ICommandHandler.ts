export interface ICommandHandler<T> {
    Handle(command: T): Promise<void>;
}
