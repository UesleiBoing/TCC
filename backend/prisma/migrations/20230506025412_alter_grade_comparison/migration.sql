/*
  Warnings:

  - You are about to drop the column `maxGrade` on the `tests` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "tests" DROP COLUMN "maxGrade",
ADD COLUMN     "grade_ten" DECIMAL(3,2);
