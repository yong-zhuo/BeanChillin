'use server'
import { Notification } from "@prisma/client";
import prisma from "../prisma";

export default async function markAsRead(notification: Notification) {
    await prisma.notification.update({
        where: {
            id: notification.id,
        },
        data: {
            isRead: true,
        }
    });
}