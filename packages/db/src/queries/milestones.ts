import { prisma } from "../index";
import { MilestoneStatus } from "@prisma/client";

export async function getMilestonesByProject(projectId: string) {
  return prisma.milestone.findMany({
    where: { projectId },
    orderBy: { createdAt: "asc" },
  });
}

export async function verifyMilestone(milestoneId: string, proofData: any, approved: boolean = false) {
  return prisma.milestone.update({
    where: { id: milestoneId },
    data: {
      proofData,
      status: approved ? MilestoneStatus.APPROVED : MilestoneStatus.CLIENT_REVIEW,
      verifiedAt: new Date(),
    },
  });
}

export async function releaseEscrow(milestoneId: string, transactionId: string) {
  return prisma.milestone.update({
    where: { id: milestoneId },
    data: {
      status: MilestoneStatus.ESCROW_RELEASED,
      escrowTxId: transactionId,
      releasedAt: new Date(),
    },
  });
}
