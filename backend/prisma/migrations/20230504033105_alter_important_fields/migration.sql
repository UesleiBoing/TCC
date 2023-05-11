-- AlterTable
ALTER TABLE "answers" ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "questions" ALTER COLUMN "description" SET DATA TYPE VARCHAR(1000);

-- AlterTable
ALTER TABLE "student_answers" ALTER COLUMN "description" DROP NOT NULL;

-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "maxGrade" DECIMAL(6,2),
ALTER COLUMN "grade" SET DATA TYPE DECIMAL(6,2);
