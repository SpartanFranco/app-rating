/*
  Warnings:

  - You are about to drop the column `text` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "text",
ADD COLUMN     "comment" TEXT;
