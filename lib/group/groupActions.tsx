'use server'

import prisma from "../prisma"

export async function getMemberCount (groupId: string) {
  const count = await prisma.membership.count({
    where: {
      groupId
    }
  })
  return count
}