import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";
import { DataForSEOClient } from "@repo/seo-core";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, domain } = body;

    if (!projectId || !domain) {
      return NextResponse.json({ error: "Missing projectId or domain" }, { status: 400 });
    }

    const client = new DataForSEOClient();
    const summary = await client.getBacklinksSummary(domain);

    // Save summary stats or log backlink entities to database
    // For this prototype, we record live links logs
    await prisma.project.update({
      where: { id: projectId },
      data: {
        settings: {
          backlinksSummary: summary,
        },
      },
    });

    return NextResponse.json({
      success: true,
      summary,
    });
  } catch (error: any) {
    console.error("Backlink sync route error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
