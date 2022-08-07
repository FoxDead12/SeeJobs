
export interface IBaseBusinessFactory {
  BeginChanges(): Promise<string>;
  SaveChanges(transaction: string): Promise<void>;
  RollbackChanges(transaction: string): Promise<void>;
  ClearTransaction(transaction: string): Promise<void>;
}
