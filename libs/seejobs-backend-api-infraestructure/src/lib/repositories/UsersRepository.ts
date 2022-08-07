import { IMapperFactory } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/interfaces/mappers";
import { AbstractMapper } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/mappers";
import { BaseRepository } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/repositories";
import { User } from "@see-jobs-2/seejobs-backend-api-business/entitys";
import { IUser } from "@see-jobs-2/seejobs-backend-api-business/interfaces/entitys";
import { IUserRepository } from "@see-jobs-2/seejobs-backend-api-business/interfaces/repositories";
import { DtoUser } from "@see-jobs-2/seejobs-backend-api-models/dtos";
import { QueryRunner, Repository } from "typeorm";
import { IReadOnlyUsersRepository } from "../interfaces/repositories";


export class UsersRepository extends BaseRepository<IUser, DtoUser> implements IUserRepository, IReadOnlyUsersRepository {
   
    // private entityToDtoMapper: AbstractMapper<IUser, DtoUser>;
    private dtoToEntityMapper: AbstractMapper<DtoUser, IUser>;

    constructor(
        protected _repository: Repository<DtoUser>,
        protected _mapperFactory: IMapperFactory,
        protected _runners: {[key: string]: QueryRunner},
        protected _transaction: string
    ){
        super(_repository, _mapperFactory, _runners, _transaction);
        // this.entityToDtoMapper = this._mapperFactory.Create(Permission, DtoPermission);
        this.dtoToEntityMapper = this._mapperFactory.Create(DtoUser, User);
    }

    async GetUserByUniqueId(uniqueId: string): Promise<IUser> {

        const user = await this.GetEntityBy({uniqueId: uniqueId} as IUser);
        return user
    }
    
    async Login(email: string, password: string): Promise<IUser> {

        const result = await this._repository.query("CALL login_user(?,?)", [email, password]);
        const id: number = result[0][0].id || 0;
        const dto = await this.Get(id);

        if(dto){

            return this.dtoToEntityMapper.Map(dto);
        }
        else {
            return null;
        }

    }

    async CreateNewUser(email: string, password: string, name: string): Promise<IUser> {
        const runner = this._runners[this._transaction];
        const result = await runner.manager.query("CALL create_user(?,?,?)", [name, email, password]);

        return {
        id: result[0][0].id,
        uniqueId: result[0][0].uniqueId,
        email,
        lastLogin: null,
        name,
        password: password
        };

    }

    public AddMany(entitys: IUser[], source?: any): Promise<void> {
        throw new Error("Method not implemented.");
    }

    public async GetEntityBy(entity: IUser): Promise<IUser> {

        const result = await this._repository.findOne({where: entity});
        if(result != undefined) {
            
            return this.dtoToEntityMapper.Map(result);
        }
        else {
            return null;
        }

    }
    public GetEntity(id: number): Promise<IUser> {
        throw new Error("Method not implemented.");
    }
    public Add(entity: IUser): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public Update(entity: IUser): Promise<void> {
        throw new Error("Method not implemented.");
    }
    public Delete(id: number): Promise<void>;
    public Delete(entity: IUser): Promise<void>;
    public Delete(entities: IUser[]): Promise<void>;
    public Delete(data: any): Promise<void>;
    public Delete(data: unknown): Promise<void> {
        throw new Error("Method not implemented.");
    }

}