/*
  Warnings:

  - You are about to drop the column `endTime` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `startTime` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `weekEnd` to the `Schedule` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekStart` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "endTime",
DROP COLUMN "startTime",
ADD COLUMN     "weekEnd" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "weekStart" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "WorkDay" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "scheduleId" TEXT,

    CONSTRAINT "WorkDay_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkDay" ADD CONSTRAINT "WorkDay_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE SET NULL ON UPDATE CASCADE;
