import { IUser } from "../interfaces/entitys";
import { IInjectedDependencies } from "../interfaces/factories";
import { BusinessEntity } from "./BusinessEntity";

export class User extends BusinessEntity implements IUser {
    
    public uniqueId!: string;
    public email!: string;
    public hash!: string;
    public name!: string;
    public lastLogin!: Date;
    public password: string;
    
    
    constructor(transaction : string, factories: IInjectedDependencies, data: Partial<IUser>){
        super(transaction, factories);

        Object.assign(this, data);
    }
    
    public get id(): number {
        return this._id;
    }

    private set id(value: number) {
        this._id = value;
    }
    
    protected Update(): Promise<void> {
        throw new Error("Method not implemented.");
    }
    protected Delete(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}