import { IBaseBusinessFactory } from "@see-jobs-2/seejobs-backend-api-abstract-business/interfaces/factories";
import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { BaseInfrastructureInterfaces } from "../interfaces/BaseInfrastructureInterfaces";

export interface ICommandHandlerStrategy<T>{
  Handle(command: T, handler: BaseCommandHandler): Promise<void>;
}

export abstract class BaseCommandHandler {
  constructor(
    public _infrastructureInterfaces: BaseInfrastructureInterfaces,
    public _businessFactory: IBaseBusinessFactory,
    public _mapperFactory: IMapperFactory,
  ){}

  public async BaseHandle(logicBlock: (transaction: string) => Promise<void>): Promise<void>{
    let catchedError: Error | undefined;
    let transaction: string | undefined;

    try {
      transaction = await this._businessFactory.BeginChanges();

      await logicBlock(transaction);

      await this._businessFactory.SaveChanges(transaction);

    } catch(error: any | unknown) {
      
      catchedError = error;

      if(transaction){
        await this._businessFactory.RollbackChanges(transaction);
      }
    } finally{

      await this._businessFactory.ClearTransaction(transaction + "");
    }

    if(catchedError){
      console.log(catchedError.message)
      throw catchedError;
    }
  }
}
