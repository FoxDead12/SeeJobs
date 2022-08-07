import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from "express";
import { UserAlreadyExistExceptions } from "../exceptions/UserAlreadyExistExceptions";

@Catch(UserAlreadyExistExceptions)
export class UserAlreadyExistExceptionsFilter implements ExceptionFilter {
    
    catch(exception: UserAlreadyExistExceptions, host: ArgumentsHost) {

        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                error: exception.message
            });
    }


}