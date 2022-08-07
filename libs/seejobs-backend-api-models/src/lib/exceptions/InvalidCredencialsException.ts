import { HttpException, HttpStatus } from "@nestjs/common";

export class InvalidCredencialsException extends HttpException {

    constructor(){
        super("Invalid Credencials", HttpStatus.FORBIDDEN);
    }
}