export interface IAggregate<T> {
    Get(id: number): Promise<T>;
    Add(entity: T): Promise<void>;
    Delete(id: number) : Promise<void>;
    Delete(entity: T) : Promise<void>;
    Delete(entities: T[]) : Promise<void>;
  }
  