-- DropForeignKey
ALTER TABLE "Friendship" DROP CONSTRAINT "Friendship_sender_id_fkey";

-- AddForeignKey
ALTER TABLE "Friendship" ADD CONSTRAINT "Friendship_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
