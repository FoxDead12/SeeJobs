
export interface IBusinessRepository<T, S = T> {

    GetEntity(id: number, source?: S): Promise<T>;
    GetEntityBy(entity: Partial<T>, source?: S): Promise<T>;
    Add(entity: T, source?: S): Promise<void>;
    AddMany(entitys: T[], source?: S): Promise<void>;
    Update(entity: T, source?: S): Promise<void>;
    Delete(id: number): Promise<void>;
    Delete(entity: Partial<T>, source?: S): Promise<void>;
    Delete(entities: Partial<T>[], source?: S): Promise<void>;
}