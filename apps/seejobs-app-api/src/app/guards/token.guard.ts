import { CanActivate, createParamDecorator, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { Request } from "express";
import { DI } from '../dependency-injector';
import { Reflector } from "@nestjs/core";

export const Token = createParamDecorator(
    (data: void, ctx: ExecutionContext) => {
        const request: Request = ctx.switchToHttp().getRequest();
    
        return request.cookies["token"];
    }
)


@Injectable()
export class TokenGuard implements CanActivate {
    
    constructor(private readonly DI: DI, private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {

        const request = context.switchToHttp().getRequest();

        const token = request.cookies["token"] || "";
        //Tenho o token
        try {
            
            if(!token) throw new UnauthorizedException();
            
            const jwtToken = this.DI.servicesFactory.ITokenGenerateService.DecryptToken(token);
 
            if(jwtToken) {
                
                //Validar data
                const dateToken = new Date(jwtToken.date);
                const dateExpire = new Date();
                //Valdiar caso keep Session seja true vai ter uma duração de um mes, senão apenas um dia
                if(jwtToken.keepSession == true) 
                    dateExpire.setDate(dateToken.getDate() + 30);
                else
                    dateExpire.setDate(dateToken.getDate() + 1);
                                    
                if(dateToken >= dateExpire) {
                    throw new UnauthorizedException();
                }

                const service = this.DI.servicesFactory.IUsersQueriesService;
                return service.UserValidation(jwtToken.uniqueId);
            }
        }
        catch {
            
            throw new UnauthorizedException();
        }
        
        throw new UnauthorizedException();

    }


}