/*
  Warnings:

  - You are about to drop the column `form_id` on the `topics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "forms" ADD COLUMN     "standard" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "topics" DROP COLUMN "form_id";
