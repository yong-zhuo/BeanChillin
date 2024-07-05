import { DetailedNotif } from "@/types/notification";
import { Notification } from "@prisma/client";

export default function getFilteredNotifications(notifications: DetailedNotif[], filter: string) {
    if (filter === "all") {
        return notifications;
    } else if (filter === "posts") {
        return notifications.filter((notif) => notif.type === "postComment");
    } else if (filter === "groups") {
        return notifications.filter((notif) => notif.type === "joinedGroup");
    } else if (filter === "friends") {
        return notifications.filter((notif) => notif.type === "friendRequest" || notif.type === "acceptFriendRequest");
    } else {
        return notifications;
    }
}