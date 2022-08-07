import { CacheKey } from "@nestjs/common";
import { RootUserAlreadyExistExceptions, UserAlreadyExistExceptions } from "@see-jobs-2/seejobs-backend-api-models/exceptions";
import { IUser } from "../interfaces/entitys";
import { IUsersAggregate } from "../interfaces/entitys/IUsersAggregate";
import { BusinessBase } from "./BusinessBase";
import { User } from "./User";

export class UsersAggregate extends BusinessBase implements IUsersAggregate  {
    
    
    async CreateRootUser(): Promise<string> {
        const userRepository = this._repositoryFactory.UsersRepository;
        let user = await userRepository.GetEntityBy({email: 'root'});
        
        if(user){
            throw new RootUserAlreadyExistExceptions();
        }
        
        user = await this.CreatNewUser({email: 'root', name : 'root', password: "123"});
        return user.password;
    }
    
    async CreatNewUser(entity: Partial<IUser>): Promise<IUser> {

        const userRepository = this._repositoryFactory.UsersRepository;
        const user = await userRepository.GetEntityBy({email: entity.email});

        if(user) {

            throw new UserAlreadyExistExceptions();
        }

        const userDb = await userRepository.CreateNewUser(entity.email, entity.password, entity.name);
        return this._businessFactory.CreateUser(this._transaction, userDb as IUser);
    }
    
    Get(id: number): Promise<IUser> {
        throw new Error("Method not implemented.");
    }

    Add(entity: IUser): Promise<void> {
        throw new Error("Method not implemented.");
    }

    Delete(id: number): Promise<void>;
    Delete(entity: IUser): Promise<void>;
    Delete(entities: IUser[]): Promise<void>;
    Delete(entities: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }


}