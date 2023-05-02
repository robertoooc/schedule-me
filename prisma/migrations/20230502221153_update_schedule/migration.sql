/*
  Warnings:

  - The values [OWNER] on the enum `Role` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `fridayFrom` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `fridayTo` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `mondayFrom` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `mondayTo` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `saturdayFrom` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `saturdayTo` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `sundayFrom` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `sundayTo` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `thursdayFrom` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `thursdayTo` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `tuesdayFrom` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `tuesdayTo` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `wednesdayFrom` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `wednesdayTo` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `scheduleId` on the `User` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `workDate` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Role_new" AS ENUM ('BASIC', 'ADMIN');
ALTER TABLE "User" ALTER COLUMN "hiearchy" DROP DEFAULT;
ALTER TABLE "User" ALTER COLUMN "hiearchy" TYPE "Role_new" USING ("hiearchy"::text::"Role_new");
ALTER TYPE "Role" RENAME TO "Role_old";
ALTER TYPE "Role_new" RENAME TO "Role";
DROP TYPE "Role_old";
ALTER TABLE "User" ALTER COLUMN "hiearchy" SET DEFAULT 'BASIC';
COMMIT;

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_scheduleId_fkey";

-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "fridayFrom",
DROP COLUMN "fridayTo",
DROP COLUMN "mondayFrom",
DROP COLUMN "mondayTo",
DROP COLUMN "saturdayFrom",
DROP COLUMN "saturdayTo",
DROP COLUMN "sundayFrom",
DROP COLUMN "sundayTo",
DROP COLUMN "thursdayFrom",
DROP COLUMN "thursdayTo",
DROP COLUMN "tuesdayFrom",
DROP COLUMN "tuesdayTo",
DROP COLUMN "wednesdayFrom",
DROP COLUMN "wednesdayTo",
ADD COLUMN     "endTime" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "startTime" DECIMAL(65,30) NOT NULL,
ADD COLUMN     "userId" TEXT NOT NULL,
ADD COLUMN     "workDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "scheduleId";

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
