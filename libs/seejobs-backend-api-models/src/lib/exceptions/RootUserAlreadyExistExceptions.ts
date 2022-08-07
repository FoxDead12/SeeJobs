import { HttpException, HttpStatus } from "@nestjs/common";

export class RootUserAlreadyExistExceptions extends HttpException {

    constructor() {
        super("Root User Already Exist!", HttpStatus.FORBIDDEN);
    }
}