
export interface IBaseRepositoryFactory {
  BeginChanges(transaction: string): Promise<void>;
  SaveChanges(transaction: string): Promise<void>;
  RollbackChanges(transaction: string): Promise<void>;
  ClearTransaction(transaction: string): Promise<void>;
}
