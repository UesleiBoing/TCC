/*
  Warnings:

  - You are about to drop the column `form_id` on the `questions` table. All the data in the column will be lost.
  - You are about to drop the column `photo` on the `questions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "questions" DROP COLUMN "form_id",
DROP COLUMN "photo";
