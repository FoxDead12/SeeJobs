import { FindManyOptions } from "typeorm";

export interface IReadOnlyRepository<T> {

    Get(id: number): Promise<T>;
    GetBy(fields: FindManyOptions<T>): Promise<T[]>;
    GetAll(): Promise<T[]>;
}