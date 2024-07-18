/*
  Warnings:

  - You are about to drop the column `viewerId` on the `Post` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_viewerId_fkey";

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "viewerId";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "latestViewedPosts" TEXT[];
