import { Group, Notification, User } from "@prisma/client";

export type DetailedNotif = Notification & {
    fromUser: User
    group?: Group
}