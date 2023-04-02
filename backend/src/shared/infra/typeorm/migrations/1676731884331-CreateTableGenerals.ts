/* eslint-disable import/prefer-default-export */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableGenerals1676731884331 implements MigrationInterface {

  name = 'CreateTableGenerals1676731884331';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "students" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(80) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_25985d58c714a4a427ced57507b" UNIQUE ("email"), CONSTRAINT "PK_7d7f07271ad4ce999880713f05e" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "teachers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying(80) NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "UQ_7568c49a630907119e4a665c605" UNIQUE ("email"), CONSTRAINT "PK_a8d4f83be3abe4c687b0a0093c8" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "subjects" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(80) NOT NULL, "content" character varying(80) NOT NULL, CONSTRAINT "UQ_3972df30ed0c0eee3dd354d64af" UNIQUE ("title"), CONSTRAINT "PK_1a023685ac2b051b4e557b0b280" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "classes" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(80) NOT NULL, "content" character varying(80) NOT NULL, "year" character varying(4) NOT NULL, "semester" character varying(1) NOT NULL, "teacher_id" integer NOT NULL, "subject_id" integer NOT NULL, CONSTRAINT "PK_e207aa15404e9b2ce35910f9f7f" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "topics" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying(80) NOT NULL, "ordem" integer NOT NULL, "class_id" integer, CONSTRAINT "PK_e4aa99a3fa60ec3a37d1fc4e853" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "forms" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(80) NOT NULL, "description" character varying(80), "ordem" integer NOT NULL, "topic_id" integer, CONSTRAINT "PK_ba062fd30b06814a60756f233da" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "questions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying(80) NOT NULL, "type" integer NOT NULL DEFAULT \'0\', "weight" numeric(3,2) NOT NULL DEFAULT \'1\', "photo" character varying NOT NULL, "correct_answer" character varying NOT NULL, "form_id" integer, CONSTRAINT "PK_08a6d4b0f49ff300bf3a0ca60ac" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "answers" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "description" character varying(80) NOT NULL, "photo" character varying NOT NULL, "question_id" integer, CONSTRAINT "PK_9c32cec6c71e06da0254f2226c6" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "tests" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "grade" numeric(4,2) NOT NULL, "form_id" integer, "student_id" integer, CONSTRAINT "PK_4301ca51edf839623386860aed2" PRIMARY KEY ("id"))');
    await queryRunner.query('CREATE TABLE "classes_students" ("class_id" integer NOT NULL, "student_id" integer NOT NULL, CONSTRAINT "PK_824a437bf14fd3a4761c459b2b0" PRIMARY KEY ("class_id", "student_id"))');
    await queryRunner.query('CREATE INDEX "IDX_3a6de84ece3dfa3cc9d91addf3" ON "classes_students" ("class_id") ');
    await queryRunner.query('CREATE INDEX "IDX_bfddcd499f6419c48547dddae1" ON "classes_students" ("student_id") ');
    await queryRunner.query('ALTER TABLE "answers" DROP COLUMN "description"');
    await queryRunner.query('ALTER TABLE "answers" DROP COLUMN "photo"');
    await queryRunner.query('ALTER TABLE "answers" ADD "description" character varying(80) NOT NULL');
    await queryRunner.query('ALTER TABLE "answers" ADD "photo" character varying NOT NULL');
    await queryRunner.query('ALTER TABLE "answers" ADD "answer" character varying(300) NOT NULL');
    await queryRunner.query('ALTER TABLE "answers" ADD "status" numeric(3,2) NOT NULL DEFAULT \'1\'');
    await queryRunner.query('ALTER TABLE "answers" ADD "test_id" integer');
    await queryRunner.query('ALTER TABLE "classes" ADD CONSTRAINT "FK_b34c92e413c4debb6e0f23fed46" FOREIGN KEY ("teacher_id") REFERENCES "teachers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "classes" ADD CONSTRAINT "FK_a72581b1b6a0ddf0bf5e8bebfc4" FOREIGN KEY ("subject_id") REFERENCES "subjects"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "topics" ADD CONSTRAINT "FK_a5dce3b271a4ece1c2e1822e08c" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "forms" ADD CONSTRAINT "FK_20eac11e6f389ba4ecd7a2fba9a" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "questions" ADD CONSTRAINT "FK_a40e5497291ddbe799af622efa9" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "answers" ADD CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "tests" ADD CONSTRAINT "FK_840a161fdef414174b8bd9549b5" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "tests" ADD CONSTRAINT "FK_7c20b2ec764acee727b6c077617" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "answers" ADD CONSTRAINT "FK_c97c3dbfeb59fadd93223afb85d" FOREIGN KEY ("test_id") REFERENCES "tests"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE "classes_students" ADD CONSTRAINT "FK_3a6de84ece3dfa3cc9d91addf31" FOREIGN KEY ("class_id") REFERENCES "classes"("id") ON DELETE CASCADE ON UPDATE CASCADE');
    await queryRunner.query('ALTER TABLE "classes_students" ADD CONSTRAINT "FK_bfddcd499f6419c48547dddae1a" FOREIGN KEY ("student_id") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "classes_students" DROP CONSTRAINT "FK_bfddcd499f6419c48547dddae1a"');
    await queryRunner.query('ALTER TABLE "classes_students" DROP CONSTRAINT "FK_3a6de84ece3dfa3cc9d91addf31"');
    await queryRunner.query('ALTER TABLE "answers" DROP CONSTRAINT "FK_c97c3dbfeb59fadd93223afb85d"');
    await queryRunner.query('ALTER TABLE "tests" DROP CONSTRAINT "FK_7c20b2ec764acee727b6c077617"');
    await queryRunner.query('ALTER TABLE "tests" DROP CONSTRAINT "FK_840a161fdef414174b8bd9549b5"');
    await queryRunner.query('ALTER TABLE "answers" DROP CONSTRAINT "FK_677120094cf6d3f12df0b9dc5d3"');
    await queryRunner.query('ALTER TABLE "questions" DROP CONSTRAINT "FK_a40e5497291ddbe799af622efa9"');
    await queryRunner.query('ALTER TABLE "forms" DROP CONSTRAINT "FK_20eac11e6f389ba4ecd7a2fba9a"');
    await queryRunner.query('ALTER TABLE "topics" DROP CONSTRAINT "FK_a5dce3b271a4ece1c2e1822e08c"');
    await queryRunner.query('ALTER TABLE "classes" DROP CONSTRAINT "FK_a72581b1b6a0ddf0bf5e8bebfc4"');
    await queryRunner.query('ALTER TABLE "classes" DROP CONSTRAINT "FK_b34c92e413c4debb6e0f23fed46"');
    await queryRunner.query('ALTER TABLE "answers" DROP COLUMN "test_id"');
    await queryRunner.query('ALTER TABLE "answers" DROP COLUMN "status"');
    await queryRunner.query('ALTER TABLE "answers" DROP COLUMN "answer"');
    await queryRunner.query('ALTER TABLE "answers" DROP COLUMN "photo"');
    await queryRunner.query('ALTER TABLE "answers" DROP COLUMN "description"');
    await queryRunner.query('ALTER TABLE "answers" ADD "photo" character varying NOT NULL');
    await queryRunner.query('ALTER TABLE "answers" ADD "description" character varying(80) NOT NULL');
    await queryRunner.query('DROP INDEX "public"."IDX_bfddcd499f6419c48547dddae1"');
    await queryRunner.query('DROP INDEX "public"."IDX_3a6de84ece3dfa3cc9d91addf3"');
    await queryRunner.query('DROP TABLE "classes_students"');
    await queryRunner.query('DROP TABLE "tests"');
    await queryRunner.query('DROP TABLE "answers"');
    await queryRunner.query('DROP TABLE "questions"');
    await queryRunner.query('DROP TABLE "forms"');
    await queryRunner.query('DROP TABLE "topics"');
    await queryRunner.query('DROP TABLE "classes"');
    await queryRunner.query('DROP TABLE "subjects"');
    await queryRunner.query('DROP TABLE "teachers"');
    await queryRunner.query('DROP TABLE "students"');
  }

}
