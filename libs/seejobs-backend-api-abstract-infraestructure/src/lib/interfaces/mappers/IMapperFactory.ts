import { AbstractMapper } from "../../mappers/AbstractMapper";

export interface IMapperFactory {
    Create<I, O>(I_ClassType: { new (...params: any | unknown[]): I }, O_ClassType: { new (...params: any | unknown[]): O }): AbstractMapper<I, O>;
}