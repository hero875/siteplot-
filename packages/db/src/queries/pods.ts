import { prisma } from "../index";

export async function getPodWithMembers(podId: string) {
  return prisma.pod.findUnique({
    where: { id: podId },
    include: {
      members: {
        include: {
          user: true,
        },
      },
    },
  });
}

export async function getAvailablePod(niche: string, organizationId: string) {
  // Find a pod that covers the niche, has capacity, and belongs to organization
  return prisma.pod.findFirst({
    where: {
      organizationId,
      niche: {
        has: niche,
      },
      currentLoad: {
        lt: prisma.pod.fields.capacity,
      },
    },
    orderBy: {
      currentLoad: "asc",
    },
  });
}

export async function assignPodToProject(projectId: string, podId: string) {
  return prisma.$transaction(async (tx) => {
    // 1. Assign pod to project
    const project = await tx.project.update({
      where: { id: projectId },
      data: { podId },
    });

    // 2. Increment pod currentLoad
    await tx.pod.update({
      where: { id: podId },
      data: {
        currentLoad: {
          increment: 1,
        },
      },
    });

    return project;
  });
}
