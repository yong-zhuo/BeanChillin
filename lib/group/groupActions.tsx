"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";

export async function getMemberCount(groupId: string) {
  const count = await prisma.membership.count({
    where: {
      groupId,
    },
  });
  return count;
}

export async function makeModerator(groupId: string, userId: string) {
  await prisma.moderator.create({
    data: {
      groupId,
      userId,
    },
  });
}

export async function removeModerator(groupId: string, userId: string) {
  try {
    await prisma.moderator.delete({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });
  } catch (e) {
    throw new Error("Could not remove moderator");
  }
}

export async function banUser(groupId: string, userId: string) {
  try {
    const moderatorExists = await prisma.moderator.findFirst({
      where: {
        groupId,
        userId,
      },
    });
    if (moderatorExists) {
      await Promise.all([
        prisma.moderator.delete({
          where: {
            groupId_userId: {
              groupId,
              userId,
            },
          },
        }),
        await prisma.membership.delete({
          where: {
            userId_groupId: {
              groupId,
              userId,
            },
          },
        }),
      ]);
    } else {
      await prisma.membership.delete({
        where: {
          userId_groupId: {
            groupId,
            userId,
          },
        },
      });
    }

    await prisma.bannedUser.create({
      data: {
        groupId,
        userId,
      },
    });
  } catch (e) {
    console.log(e);
    throw new Error("Could not ban user");
  }
}

export async function unbanUser(groupId: string, userId: string) {
  try {
    await prisma.bannedUser.delete({
      where: {
        groupId_userId: {
          groupId,
          userId,
        },
      },
    });
  } catch (e) {
    throw new Error("Could not unban user");
  }
}

export async function getBannedStatus(groupId: string, userId: string) {
  const banned = await prisma.bannedUser.findFirst({
    where: {
      groupId,
      userId,
    },
  });
  return !!banned;
}

export async function getModStatus(groupId: string, userId: string) {
  const mod = await prisma.moderator.findFirst({
    where: {
      groupId,
      userId,
    },
  });
  return !!mod;
}

export async function getGroupModStatus(members: User[], groupId: string) {
  const eachModStatus: Record<string, boolean> = {};
  for (const member of members) {
    const modStatus = await prisma.moderator.findFirst({
      where: {
        userId: member.id,
        groupId,
      },
    });
    eachModStatus[member.id] = !!modStatus;
  }
  return eachModStatus;
}
