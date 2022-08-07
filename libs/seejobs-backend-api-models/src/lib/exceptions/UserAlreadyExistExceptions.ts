import { HttpException, HttpStatus } from "@nestjs/common";

export class UserAlreadyExistExceptions extends HttpException {

    constructor() {
        super("User Already Exist!", HttpStatus.FORBIDDEN);
    }
}