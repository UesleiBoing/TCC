/*
  Warnings:

  - You are about to drop the column `ordem` on the `forms` table. All the data in the column will be lost.
  - You are about to drop the column `ordem` on the `topics` table. All the data in the column will be lost.
  - Added the required column `order` to the `forms` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `topics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "answers" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "forms" DROP COLUMN "ordem",
ADD COLUMN     "order" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "questions" ADD COLUMN     "order" INTEGER;

-- AlterTable
ALTER TABLE "topics" DROP COLUMN "ordem",
ADD COLUMN     "order" INTEGER NOT NULL;
