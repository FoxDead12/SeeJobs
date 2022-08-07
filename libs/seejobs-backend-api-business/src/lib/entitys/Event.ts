import { IEvent } from "../interfaces/entitys";
import { IInjectedDependencies } from "../interfaces/factories";
import { BusinessEntity } from "./BusinessEntity";

export class Event extends BusinessEntity implements IEvent {
    
    public titulo!: string;
    public descricao!: string;
    public data!: Date;
    public userUniqueId!: string;
    public horas?: Date | undefined;
    
    constructor(transaction : string, factories: IInjectedDependencies){
        super(transaction, factories);
    }
    
    public get id(): number {
        return this._id;
    }
    
    public set id(value: number) {
        this._id = value;
    }
    
    protected Update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    protected Delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }
}