import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ServicesFactory } from "@see-jobs-2/seejobs-backend-api-application/factories";
import { IServiceFactory } from "@see-jobs-2/seejobs-backend-api-application/interfaces/factories";
import { DataSource } from "typeorm";
import { ormConfig } from "../../ormconfig";

Injectable();
export class DI {
  public servicesFactory: IServiceFactory;

  
  Build(configService: ConfigService, connection: DataSource){
    const jwtSecret = configService.get<string>("HASH_SECRET");

    this.servicesFactory = new ServicesFactory(
      connection,
      { jwtSecret }
    );
  }
}
