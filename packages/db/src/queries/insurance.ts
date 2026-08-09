import { prisma } from "../index";
import { InsuranceStatus } from "@prisma/client";

export async function getInsuranceByOrg(organizationId: string) {
  return prisma.insurance.findMany({
    where: { organizationId },
    include: {
      claims: {
        include: {
          project: true,
        },
      },
    },
  });
}

export async function createInsurancePolicy(
  organizationId: string,
  coverageAmount: number,
  premiumAmount: number,
  durationMonths = 12
) {
  const startDate = new Date();
  const endDate = new Date();
  endDate.setMonth(endDate.getMonth() + durationMonths);

  return prisma.insurance.create({
    data: {
      organizationId,
      status: InsuranceStatus.ACTIVE,
      coverageAmount,
      premiumAmount,
      startDate,
      endDate,
    },
  });
}

export async function createClaim(
  insuranceId: string,
  projectId: string,
  reason: string,
  trafficDrop: number
) {
  return prisma.insuranceClaim.create({
    data: {
      insuranceId,
      projectId,
      reason,
      trafficDrop,
      status: "PENDING",
    },
  });
}

export async function updateClaimStatus(claimId: string, status: string, actionTaken?: string) {
  return prisma.insuranceClaim.update({
    where: { id: claimId },
    data: {
      status,
      ...(actionTaken ? { actionTaken } : {}),
    },
  });
}
