/*
  Warnings:

  - Added the required column `userId` to the `Promotion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Promotion" ADD COLUMN     "userId" TEXT NOT NULL;
