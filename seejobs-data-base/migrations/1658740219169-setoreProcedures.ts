import { MigrationInterface, QueryRunner } from "typeorm"
import { CreateNewUserDown, CreateNewUserUp } from "../store-procudures/CreateNewUserSP"
import { LoginUserDown, LoginUserUp } from "../store-procudures/LoginUserSP";

export class setoreProcedures1658740219169 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(CreateNewUserUp);
        await queryRunner.query(LoginUserUp);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(CreateNewUserDown);
        await queryRunner.query(LoginUserDown);

    }

}
