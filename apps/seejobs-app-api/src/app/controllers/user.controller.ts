import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { InvalidCredencialsExceptionFilter, RootUserAlreadyExistExceptionsFilter } from '@see-jobs-2/seejobs-backend-api-models/exceptions-filters';
import { LoginRequest } from '@see-jobs-2/seejobs-backend-api-models/request';
import { DI } from '../dependency-injector';
import { ENDPOINTS } from '../end-points';

@Controller(ENDPOINTS.USERS.BASE)
export class UserController {
  constructor(private readonly DI: DI) {}

  @Post()
  @UseFilters(RootUserAlreadyExistExceptionsFilter)
  CreatRootUser() {
    const service = this.DI.servicesFactory.IUsersCommandService;
    return service.CreateUserRoot();
  }

  @Post(ENDPOINTS.USERS.LOGIN)
  @UseFilters(InvalidCredencialsExceptionFilter)
  Login(@Body() request: LoginRequest ) {

    const service = this.DI.servicesFactory.IUsersQueriesService;
    return service.Login(request);
  }



}
