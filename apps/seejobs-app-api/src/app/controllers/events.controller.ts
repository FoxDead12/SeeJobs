import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ENDPOINTS } from "../end-points";
import { DI } from '../dependency-injector';
import { Token, TokenGuard } from "../guards/token.guard";
import { CreateNewEventRequest } from "@see-jobs-2/seejobs-backend-api-models/request";
import { BaseController } from "./base.controller";


@Controller(ENDPOINTS.EVENTS.BASE)
export class EventsController extends BaseController {
  constructor(DI: DI) {
    super(DI);
  }

  @Post(ENDPOINTS.EVENTS.CREATE)
  @UseGuards(TokenGuard)
  CreateNewEvent(@Body() request: CreateNewEventRequest, @Token() token: string) {
    
    console.log(request)
    request.uniqueId = this.decryptToken(token).uniqueId;
    const services = this.DI.servicesFactory.IEventsCommandServies;
    return services.CreateNewEvent(request);
  }
  
  @Post(ENDPOINTS.EVENTS.GETALL)
  @UseGuards(TokenGuard)
  GetAllEvents(@Token() token: string) {

    const service = this.DI.servicesFactory.IEventQueriesServices;
    return service.GetAllEvents(this.decryptToken(token).uniqueId);
  }

}