import { AbstractMapper } from "@see-jobs-2/seejobs-backend-api-abstract-infraestructure/mappers";
import { IUser } from "@see-jobs-2/seejobs-backend-api-business/interfaces/entitys";
import { DtoUser } from "@see-jobs-2/seejobs-backend-api-models/dtos";

export class DtoUserToUser extends AbstractMapper<DtoUser, IUser>{
    public Map(inObject: DtoUser): IUser {
      return {
        name: inObject.name,
        id: inObject.id,
        email: inObject.email,
        lastLogin: inObject.lastLogin,
        uniqueId: inObject.uniqueId,
        password: null
      }
    }
  }
  