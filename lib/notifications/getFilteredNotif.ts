import { DetailedNotif } from "@/types/notification";

export default async function getFilteredNotifications(notifications: DetailedNotif[], filter: string) {
    if (filter === "all") {
        return notifications;
    } else if (filter === "posts") {
        return notifications.filter((notif) => notif.type === "postComment" || notif.type === "replyComment" || notif.type === "deletedPost" || notif.type === "flaggedPost");
    } else if (filter === "groups") {
        return notifications.filter((notif) => notif.type === "joinedGroup" || notif.type === "removeGroupMember" || notif.type === "moderatorAdded" || notif.type === "banned");
    } else if (filter === "friends") {
        return notifications.filter((notif) => notif.type === "friendRequest" || notif.type === "acceptFriendRequest");
    } else {
        return notifications;
    }
}