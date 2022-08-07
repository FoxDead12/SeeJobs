import { ITokenGenerateService } from "../../interfaces/services/ITokenGenerateService";
import { Jwt } from "jsonwebtoken";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require("jsonwebtoken");

export interface IjwTokenObj {

    uniqueId: string;
    date?: Date;
    keepSession: boolean;
}

export class jwTokenObj implements IjwTokenObj {
    uniqueId: string;
    date?: Date;
    keepSession: boolean;


    constructor(data: IjwTokenObj){

        this.uniqueId = data.uniqueId;
        this.keepSession = data.keepSession;

        if(data.date) {
            this.date = data.date;
        }
        else {

            this.date = new Date(Date.now());
        }
    }

}

export class TokenGenerateService implements ITokenGenerateService{
    
    constructor(private secrete: string){
    }


    GenerateToken(uniqueId: string, keepSession: boolean): string {
        const token = new jwTokenObj({uniqueId, keepSession},);

        return jwt.sign(
            {...token},
            this.secrete
        )
    }

    DecryptToken(token: string): IjwTokenObj {

        const aux = jwt.verify(token, this.secrete) as IjwTokenObj;
        return new jwTokenObj({...aux});
    }
}