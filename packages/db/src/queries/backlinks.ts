import { prisma } from "../index";
import { LinkStatus } from "@prisma/client";

export async function getBacklinksByProject(projectId: string) {
  return prisma.backlink.findMany({
    where: { projectId },
    orderBy: { createdAt: "desc" },
  });
}

export async function upsertBacklink(
  projectId: string,
  url: string,
  targetUrl: string,
  domainAuthority: number,
  anchorText: string,
  status: LinkStatus = LinkStatus.LIVE
) {
  return prisma.backlink.create({
    data: {
      projectId,
      url,
      targetUrl,
      domainAuthority,
      anchorText,
      status,
    },
  });
}

export async function updateBacklinkStatus(backlinkId: string, status: LinkStatus, screenshotUrl?: string) {
  return prisma.backlink.update({
    where: { id: backlinkId },
    data: {
      status,
      ...(screenshotUrl ? { screenshotUrl } : {}),
    },
  });
}
