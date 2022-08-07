import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { DataSource, MixedList } from "typeorm";
import { Tables } from "../libs/seejobs-backend-api-models/src/lib/dtos";

export const connectionSource = new DataSource({
    migrationsTableName: 'migrations',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'teste',
    password: '1234',
    database: 'seeJobs',
    logging: false,
    synchronize: false,
    name: 'default',
    entities: ['libs/seejobs-backend-api-models/src/lib/dtos/*.ts'],
    migrations: ['seejobs-data-base/migrations/*.ts'],

});

