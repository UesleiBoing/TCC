-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_form_id_fkey";

-- CreateTable
CREATE TABLE "forms_questions" (
    "id" SERIAL NOT NULL,
    "form_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "forms_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keywords_questions" (
    "id" SERIAL NOT NULL,
    "keyword_id" INTEGER NOT NULL,
    "question_id" INTEGER NOT NULL,

    CONSTRAINT "keywords_questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "keywords" (
    "id" SERIAL NOT NULL,
    "description" VARCHAR(40) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "keywords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "forms_questions_form_id_idx" ON "forms_questions"("form_id");

-- CreateIndex
CREATE INDEX "forms_questions_question_id_idx" ON "forms_questions"("question_id");

-- CreateIndex
CREATE INDEX "keywords_questions_keyword_id_idx" ON "keywords_questions"("keyword_id");

-- CreateIndex
CREATE INDEX "keywords_questions_question_id_idx" ON "keywords_questions"("question_id");

-- CreateIndex
CREATE UNIQUE INDEX "keywords_description_key" ON "keywords"("description");

-- AddForeignKey
ALTER TABLE "forms_questions" ADD CONSTRAINT "forms_questions_form_id_fkey" FOREIGN KEY ("form_id") REFERENCES "forms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "forms_questions" ADD CONSTRAINT "forms_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keywords_questions" ADD CONSTRAINT "keywords_questions_keyword_id_fkey" FOREIGN KEY ("keyword_id") REFERENCES "keywords"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "keywords_questions" ADD CONSTRAINT "keywords_questions_question_id_fkey" FOREIGN KEY ("question_id") REFERENCES "questions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
