import { prisma } from "../index";
import { ContentStatus } from "@prisma/client";

export async function getContentQueue(projectId: string) {
  return prisma.contentItem.findMany({
    where: { projectId },
    orderBy: { updatedAt: "desc" },
  });
}

export async function getContentById(id: string) {
  return prisma.contentItem.findUnique({
    where: { id },
  });
}

export async function updateContentStatus(id: string, status: ContentStatus, extraData: any = {}) {
  return prisma.contentItem.update({
    where: { id },
    data: {
      status,
      ...extraData,
    },
  });
}
