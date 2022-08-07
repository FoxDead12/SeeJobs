import { AbstractBusinessBase } from "./AbstractBusinessBase";
import { IBaseInjectedDependencies } from "../interfaces/factories";

export abstract class AbstractBusinessEntity extends AbstractBusinessBase
{
    protected _id!: number;
    protected _isIdSetted!: boolean;

    constructor(transaction : string, dependencies: IBaseInjectedDependencies)
    {
      super(transaction, dependencies);
    }

    public abstract id: number;
    protected abstract Update(): Promise<void>;
    protected abstract Delete(): Promise<void>;
}
