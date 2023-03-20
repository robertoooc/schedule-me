-- CreateEnum
CREATE TYPE "Role" AS ENUM ('BASIC', 'ADMIN', 'OWNER');

-- CreateTable
CREATE TABLE "organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT NOT NULL,
    "hiearchy" "Role" NOT NULL DEFAULT 'BASIC',
    "positionId" TEXT,
    "organizationId" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "organizationId" TEXT,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Schedule" (
    "id" TEXT NOT NULL,
    "mondayFrom" TIMESTAMP(3) NOT NULL,
    "mondayTo" TIMESTAMP(3) NOT NULL,
    "tuesdayFrom" TIMESTAMP(3) NOT NULL,
    "tuesdayTo" TIMESTAMP(3) NOT NULL,
    "wednesdayFrom" TIMESTAMP(3) NOT NULL,
    "wednesdayTo" TIMESTAMP(3) NOT NULL,
    "thursdayFrom" TIMESTAMP(3) NOT NULL,
    "thursdayTo" TIMESTAMP(3) NOT NULL,
    "fridayFrom" TIMESTAMP(3) NOT NULL,
    "fridayTo" TIMESTAMP(3) NOT NULL,
    "saturdayFrom" TIMESTAMP(3) NOT NULL,
    "saturdayTo" TIMESTAMP(3) NOT NULL,
    "sundayFrom" TIMESTAMP(3) NOT NULL,
    "sundayTo" TIMESTAMP(3) NOT NULL,
    "userId" TEXT,

    CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "organization_name_key" ON "organization"("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Position" ADD CONSTRAINT "Position_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
