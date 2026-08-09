import { PrismaClient } from "@prisma/client";

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;

export * from "@prisma/client";
export * from "./queries/playbooks";
export * from "./queries/pods";
export * from "./queries/milestones";
export * from "./queries/content";
export * from "./queries/keywords";
export * from "./queries/backlinks";
export * from "./queries/insurance";
export * from "./mutations";
