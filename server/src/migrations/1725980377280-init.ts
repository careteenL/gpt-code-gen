import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1725980377280 implements MigrationInterface {
    name = 'Init1725980377280'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`history\` ADD \`createTime\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`history\` DROP COLUMN \`createTime\``);
    }

}
