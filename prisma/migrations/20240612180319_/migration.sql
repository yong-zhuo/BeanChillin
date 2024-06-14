-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_sender_id_fkey";

-- AlterTable
ALTER TABLE "Friendship" ADD COLUMN     "userId" TEXT;

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
