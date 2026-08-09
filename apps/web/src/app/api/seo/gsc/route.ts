import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";
import { GoogleSearchConsoleClient, GoogleAnalyticsClient } from "@repo/seo-core";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, siteUrl, gaPropertyId } = body;

    if (!projectId || !siteUrl) {
      return NextResponse.json({ error: "Missing projectId or siteUrl" }, { status: 400 });
    }

    const gsc = new GoogleSearchConsoleClient();
    const ga4 = new GoogleAnalyticsClient();

    const today = new Date().toISOString().split("T")[0];
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const startDate = thirtyDaysAgo.toISOString().split("T")[0];

    const searchStats = await gsc.getSearchAnalytics(siteUrl, startDate, today);
    let gaStats = [];

    if (gaPropertyId) {
      gaStats = await ga4.getTrafficReport(gaPropertyId, startDate, today);
    }

    // Save synced data to project metadata settings in database
    await prisma.project.update({
      where: { id: projectId },
      data: {
        settings: {
          searchConsoleStats: searchStats,
          analyticsStats: gaStats,
        },
      },
    });

    return NextResponse.json({
      success: true,
      gscRowsCount: searchStats.length,
      gaRowsCount: gaStats.length,
    });
  } catch (error: any) {
    console.error("GSC/GA4 stats sync route error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
