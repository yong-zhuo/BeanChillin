import { Room, User } from "@prisma/client";

export type DetailedRoom = Room & {
    creator: User};