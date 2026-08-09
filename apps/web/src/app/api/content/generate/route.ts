import { NextRequest, NextResponse } from "next/server";
import { ContentFactoryPipeline } from "@repo/ai";
import { prisma } from "@repo/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, topic, keyword, brandVoice } = body;

    if (!projectId || !topic || !keyword) {
      return NextResponse.json({ error: "Missing required fields: projectId, topic, keyword" }, { status: 400 });
    }

    const pipeline = new ContentFactoryPipeline();
    const result = await pipeline.runFullPipeline(topic, keyword, "dentist", brandVoice);

    // Save generated content item draft to DB
    const contentItem = await prisma.contentItem.create({
      data: {
        projectId,
        title: result.brief.title,
        slug: topic.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
        status: "AI_DRAFT",
        keywordSeed: keyword,
        briefData: result.brief as any,
        aiDraft: result.draft,
        finalContent: result.draft, // Initalize final content with draft
      },
    });

    return NextResponse.json({
      success: true,
      contentItemId: contentItem.id,
      title: contentItem.title,
      readabilityScore: result.qa.readabilityScore,
      qaPassed: result.qa.passed,
    });
  } catch (error: any) {
    console.error("AI Content pipeline route error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate content draft" }, { status: 500 });
  }
}
