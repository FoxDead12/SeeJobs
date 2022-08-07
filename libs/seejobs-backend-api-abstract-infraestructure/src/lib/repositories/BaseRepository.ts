import { IBusinessRepository } from "@see-jobs-2/seejobs-backend-api-abstract-business/interfaces/repositories";
import { FindManyOptions, QueryRunner, Repository } from "typeorm";
import { IMapperFactory } from "../interfaces/mappers";
import { IReadOnlyRepository } from "../interfaces/repositories";

export abstract class BaseRepository<TWritable, TReadableOnly> implements IBusinessRepository<TWritable>, IReadOnlyRepository<TReadableOnly>{

  constructor(
    protected _repository: Repository<TReadableOnly>,
    protected _mapperFactory: IMapperFactory,
    protected _runners: {[key: string]: QueryRunner},
    protected _transaction:string
  ){}


  Get(id: number): Promise<TReadableOnly> {
    return this._repository.findOneById(id) as Promise<TReadableOnly>;
  }
  
  GetBy(fields: FindManyOptions<TReadableOnly>): Promise<TReadableOnly[]> {
    return this._repository.find(fields);
  }

  GetAll(): Promise<TReadableOnly[]> {
    return this._repository.find();
  }

  public abstract AddMany(entitys: TWritable[], source?: TWritable): Promise<void>;

  public abstract GetEntityBy(entity: Partial<TWritable>): Promise<TWritable>;

  public abstract GetEntity(id: number): Promise<TWritable>;

  public abstract Add(entity: TWritable): Promise<void>;

  public abstract Update(entity: TWritable): Promise<void>;

  public abstract Delete(id: number): Promise<void>;
  public abstract Delete(entity: TWritable): Promise<void>;
  public abstract Delete(entities: TWritable[]): Promise<void>;
  public abstract Delete(data: number | TWritable | TWritable[]): Promise<void>;
  
}