import { IEventQueriesServices } from "../services/IEventQueriesServices";
import { IEventsCommandServies } from "../services/IEventsCommandServies";
import { ITokenGenerateService } from "../services/ITokenGenerateService";
import { IUsersCommandService } from "../services/IUsersCommandService";
import { IUsersQueriesService } from "../services/IUsersQueriesService";

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface IServiceFactory {
    IUsersCommandService: IUsersCommandService;
    IUsersQueriesService:IUsersQueriesService;
    ITokenGenerateService: ITokenGenerateService;
    IEventsCommandServies: IEventsCommandServies;
    IEventQueriesServices: IEventQueriesServices;
}
