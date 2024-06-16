/*
  Warnings:

  - You are about to drop the column `userId` on the `Friendship` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sender_id,receiver_id]` on the table `Friendship` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_userId_fkey";

-- AlterTable
ALTER TABLE "Friendship" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "Friendship_sender_id_receiver_id_key" ON "Friendship"("sender_id", "receiver_id");

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
