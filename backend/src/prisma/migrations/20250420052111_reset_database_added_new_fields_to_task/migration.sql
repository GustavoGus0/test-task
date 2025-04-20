-- CreateEnum
CREATE TYPE "TaskStatus" AS ENUM ('to-do', 'in-progress', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "TaskPriority" AS ENUM ('low', 'medium', 'high');

-- CreateTable
CREATE TABLE "Task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'to-do',
    "priority" "TaskPriority" NOT NULL DEFAULT 'low',

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
