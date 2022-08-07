import { IjwTokenObj } from "../../services/services/TokenGenerateService";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ITokenGenerateService {

    GenerateToken(uniqueId: string, keepSession: boolean): string;
    DecryptToken(token: string): IjwTokenObj;

}