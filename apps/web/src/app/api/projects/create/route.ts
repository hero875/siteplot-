import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { prisma, createProject } from "@repo/db";
import { PlaybookType } from "@prisma/client";

export async function POST(req: NextRequest) {
  try {
    const { orgId } = auth();
    if (!orgId) {
      return NextResponse.json({ error: "Unauthorized: No active organization" }, { status: 401 });
    }

    const body = await req.json();
    const { name, playbookType, niche, budget, domain } = body;

    if (!name || !playbookType || !niche || !budget || !domain) {
      return NextResponse.json({ error: "Missing required fields: name, playbookType, niche, budget, domain" }, { status: 400 });
    }

    // 1. Fetch organization record to get internal DB id
    const organization = await prisma.organization.findUnique({
      where: { clerkOrgId: orgId },
    });

    if (!organization) {
      return NextResponse.json({ error: "Organization not registered in database" }, { status: 404 });
    }

    // 2. Create the project and milestones using the mutation transaction
    const project = await createProject(
      organization.id,
      name,
      playbookType as PlaybookType,
      niche,
      Number(budget)
    );

    // 3. Update the project domain setting so GSC/API routines know which site to audit
    await prisma.project.update({
      where: { id: project.id },
      data: {
        settings: {
          niche,
          domain,
          budget: Number(budget),
        },
      },
    });

    // 4. Seed initial keywords into the keyword table so they show up right away
    await prisma.keyword.createMany({
      data: [
        {
          projectId: project.id,
          text: `best ${niche} near me`,
          difficulty: 45,
          searchVolume: 1200,
          currentRank: 15,
        },
        {
          projectId: project.id,
          text: `emergency ${niche} services`,
          difficulty: 60,
          searchVolume: 800,
          currentRank: 24,
        },
      ],
    });

    // 5. Seed initial content items matching those keywords in IDEA state
    await prisma.contentItem.createMany({
      data: [
        {
          projectId: project.id,
          title: `How to choose the best ${niche} near me in 2026`,
          slug: `choose-best-${niche}-near-me`,
          keywordSeed: `best ${niche} near me`,
          status: "IDEA",
        },
        {
          projectId: project.id,
          title: `Top emergency ${niche} services to look out for`,
          slug: `emergency-${niche}-services-tips`,
          keywordSeed: `emergency ${niche} services`,
          status: "IDEA",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      projectId: project.id,
    });
  } catch (error: any) {
    console.error("Project creation API error:", error);
    return NextResponse.json({ error: error.message || "Failed to create campaign project" }, { status: 500 });
  }
}
