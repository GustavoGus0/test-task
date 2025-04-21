-- CreateEnum
CREATE TYPE "Role" AS ENUM ('MANAGER', 'EXECUTOR');

-- AlterTable
ALTER TABLE "Task" ADD COLUMN     "role" "Role"[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "managerId" TEXT,
ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'EXECUTOR';

-- CreateTable
CREATE TABLE "UserRelation" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "UserRelation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_managerId_fkey" FOREIGN KEY ("managerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserRelation" ADD CONSTRAINT "UserRelation_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
