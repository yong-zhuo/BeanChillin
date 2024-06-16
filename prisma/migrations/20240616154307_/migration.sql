-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_email_fkey";

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_receiver_id_fkey" FOREIGN KEY ("receiver_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
