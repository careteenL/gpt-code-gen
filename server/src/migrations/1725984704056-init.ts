import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1725984704056 implements MigrationInterface {
    name = 'Init1725984704056'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`history\` (\`id\` int NOT NULL AUTO_INCREMENT, \`prompt\` text NOT NULL COMMENT '提示词', \`result\` text NOT NULL COMMENT '返回结果', \`createTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`history\``);
    }

}
