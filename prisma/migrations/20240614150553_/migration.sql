/*
  Warnings:

  - Added the required column `key` to the `Friendship` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "key" TEXT NOT NULL;
