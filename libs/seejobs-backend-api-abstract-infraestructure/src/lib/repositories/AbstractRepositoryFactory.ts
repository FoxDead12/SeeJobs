import { Connection, DataSource, getConnection, QueryRunner } from "typeorm";
import { IMapperFactory } from "../interfaces/mappers";

export abstract class AbstractRepositoryFactory {

    protected _transaction: string;
    protected _connection: DataSource;

    constructor(
        protected dataSource: DataSource,
        protected _mapperFactory: IMapperFactory,
        
    ){
      this._transaction = "";
      this._connection = dataSource;
    }

    protected _runners: {[key: string]: QueryRunner} = {};

    async BeginChanges(transaction: string): Promise<void> {
      this._transaction = transaction; //Fornecer ITransaction para a factory dos repositorios.
      this._runners[transaction] = this._connection.createQueryRunner();
      await this._runners[transaction].connect();
      return await this._runners[transaction].startTransaction();
    }

    SaveChanges(transaction: string): Promise<void> {
      return this._runners[transaction].commitTransaction();
    }
    
    RollbackChanges(transaction: string): Promise<void> {
      return this._runners[transaction].rollbackTransaction();
    }
    
    ClearTransaction(transaction: string): Promise<void> {
      return this._runners[transaction].release();
    }

} 