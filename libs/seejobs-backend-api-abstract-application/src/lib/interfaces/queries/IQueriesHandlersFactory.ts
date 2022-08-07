import { IQueryHandler } from ".";

export interface IQueriesHandlersFactory {
  CreateQueryHandler<T, R>(query: T): IQueryHandler<T, R>;
}
