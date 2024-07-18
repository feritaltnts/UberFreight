/*
  Warnings:

  - You are about to drop the column `userId` on the `Promotion` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_userId_fkey";

-- AlterTable
ALTER TABLE "Promotion" DROP COLUMN "userId";
