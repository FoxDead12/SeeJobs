import { IjwTokenObj } from '@see-jobs-2/seejobs-backend-api-application/services';
import { DI } from '../dependency-injector';


export abstract class BaseController {

    constructor(public readonly DI: DI) {}

    decryptToken(token: string): IjwTokenObj {

        return this.DI.servicesFactory.ITokenGenerateService.DecryptToken(token);
    }
}