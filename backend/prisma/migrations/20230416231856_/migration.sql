/*
  Warnings:

  - A unique constraint covering the columns `[description,topic_id]` on the table `keywords` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "keywords_description_key";

-- AlterTable
ALTER TABLE "keywords" ADD COLUMN     "topic_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "keywords_description_topic_id_key" ON "keywords"("description", "topic_id");

-- AddForeignKey
ALTER TABLE "keywords" ADD CONSTRAINT "keywords_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
