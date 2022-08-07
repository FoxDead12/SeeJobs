import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { DI } from "./dependency-injector";
import { UserController } from './controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from "../../ormconfig";
import { EventsController } from './controllers/events.controller';

@Module({
  imports: [
    ConfigModule.forRoot(), 
    TypeOrmModule.forRoot(ormConfig),
  ],
  controllers: [UserController, EventsController],
  providers: [DI],
})
export class AppModule {
  constructor(private connection: DataSource, private configService: ConfigService, private DI: DI) {
    DI.Build(configService, connection);
  }

}
