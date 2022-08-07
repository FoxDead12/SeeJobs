import { MigrationInterface, QueryRunner } from "typeorm";

export class init1659027141961 implements MigrationInterface {
    name = 'init1659027141961'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Events\` (\`id\` int NOT NULL AUTO_INCREMENT, \`titulo\` varchar(255) NOT NULL, \`descricao\` varchar(255) NOT NULL, \`data\` date NOT NULL, \`horas\` time NULL, \`userUniqueId\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`hash\` varchar(255) NOT NULL, \`uniqueId\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`lastLogin\` datetime NULL, \`dateCreated\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`Users\``);
        await queryRunner.query(`DROP TABLE \`Events\``);
    }

}
