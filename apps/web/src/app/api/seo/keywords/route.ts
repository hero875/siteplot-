import { NextRequest, NextResponse } from "next/server";
import { prisma, updateKeywordRank } from "@repo/db";
import { DataForSEOClient } from "@repo/seo-core";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId } = body;

    if (!projectId) {
      return NextResponse.json({ error: "Missing projectId" }, { status: 400 });
    }

    const keywords = await prisma.keyword.findMany({
      where: { projectId },
    });

    const client = new DataForSEOClient();
    const syncResults = [];

    for (const kw of keywords) {
      // Query rank position on Google (assume example.com domain is target for matches)
      const rank = await client.getSerpRank(kw.text, "example.com");
      await updateKeywordRank(kw.id, rank);
      syncResults.push({ keyword: kw.text, rank });
    }

    return NextResponse.json({
      success: true,
      syncedKeywordsCount: keywords.length,
      results: syncResults,
    });
  } catch (error: any) {
    console.error("Keyword sync route error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
