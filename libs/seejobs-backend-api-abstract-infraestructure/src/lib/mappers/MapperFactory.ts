import { IMapperFactory } from "../interfaces/mappers";
import { AbstractMapper } from "./AbstractMapper";

export class  MapperFactory implements IMapperFactory {
    
    constructor(private mappers: any | unknown){}


    Create<I, O>(I_ClassType: new (...params: unknown[]) => I, O_ClassType: new (...params: unknown[]) => O): AbstractMapper<I, O> {
        const mapperName = `${I_ClassType.name}To${O_ClassType.name}`;

        if (typeof this.mappers[mapperName] !== undefined) {

            return (new this.mappers[mapperName](this)) as AbstractMapper<I,O>;
        } else {

            throw new Error("Mapper not found: " + mapperName);
        }
    }


}