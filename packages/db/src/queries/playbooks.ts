import { prisma } from "../index";
import { PlaybookType } from "@prisma/client";

export async function getPlaybookByOrg(organizationId: string, type: PlaybookType) {
  return prisma.playbookInstance.findFirst({
    where: {
      organizationId,
      type,
      isActive: true,
    },
  });
}

export async function getActivePlaybooks(organizationId: string) {
  return prisma.playbookInstance.findMany({
    where: {
      organizationId,
      isActive: true,
    },
  });
}

export async function getProjectsByPlaybook(organizationId: string, type: PlaybookType) {
  return prisma.project.findMany({
    where: {
      organizationId,
      playbookType: type,
    },
    include: {
      pod: true,
      milestones: true,
    },
  });
}
