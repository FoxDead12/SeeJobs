import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { RootUserAlreadyExistExceptions } from "../exceptions/RootUserAlreadyExistExceptions";
import { Request, Response } from "express";

@Catch(RootUserAlreadyExistExceptions)
export class RootUserAlreadyExistExceptionsFilter implements ExceptionFilter {
    
    catch(exception: RootUserAlreadyExistExceptions, host: ArgumentsHost) {

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