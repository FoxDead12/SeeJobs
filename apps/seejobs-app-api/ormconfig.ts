import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Tables } from "@see-jobs-2/seejobs-backend-api-models/dtos";

export const ormConfig : TypeOrmModuleOptions = {
    type: 'mysql',
    name: "default",
    host: 'localhost',
    port: 3306,
    username: 'teste',
    password: '1234',
    database: 'seeJobs',
    entities: Tables,
    synchronize: false,
    logging: false,
}
