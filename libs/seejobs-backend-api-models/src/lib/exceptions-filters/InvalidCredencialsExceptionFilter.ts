import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { InvalidCredencialsException } from "../exceptions/InvalidCredencialsException";
import { Request, Response } from "express";

@Catch(InvalidCredencialsException)
export class InvalidCredencialsExceptionFilter implements ExceptionFilter {
    
    catch(exception: InvalidCredencialsException, host: ArgumentsHost) {
        
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