import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1702348119634 implements MigrationInterface {
    name = 'Init1702348119634'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "goals" character varying NOT NULL, "priority" character varying NOT NULL, "deadline" character varying NOT NULL, "state" character varying NOT NULL, "remarks" character varying NOT NULL, "create_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "update_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tasks"`);
    }

}
