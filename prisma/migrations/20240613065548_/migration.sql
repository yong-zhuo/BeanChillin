
-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "sender_id" TEXT,
    "receiver_id" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendRequest" (
    "id" TEXT NOT NULL,
    "sender_id" TEXT NOT NULL,
    "receiver_id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "FriendRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FriendList" (
    "id" TEXT NOT NULL,

    CONSTRAINT "FriendList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FriendListToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);


-- CreateIndex
CREATE UNIQUE INDEX "_FriendListToUser_AB_unique" ON "_FriendListToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_FriendListToUser_B_index" ON "_FriendListToUser"("B");

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_email_fkey" FOREIGN KEY ("email") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FriendRequest" ADD CONSTRAINT "FriendRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendListToUser" ADD CONSTRAINT "_FriendListToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "FriendList"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FriendListToUser" ADD CONSTRAINT "_FriendListToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
