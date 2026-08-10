import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";
import { GoogleIndexingClient } from "@repo/seo-core";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { contentItemId } = body;

    if (!contentItemId) {
      return NextResponse.json({ error: "Missing contentItemId" }, { status: 400 });
    }

    const contentItem = await prisma.contentItem.findUnique({
      where: { id: contentItemId },
      include: {
        project: {
          include: {
            organization: {
              include: {
                integrations: true,
              },
            },
          },
        },
      },
    });

    if (!contentItem) {
      return NextResponse.json({ error: "Content item not found" }, { status: 404 });
    }

    // Check WordPress integration
    const wpIntegration = contentItem.project.organization.integrations.find(
      (i) => i.type === "WORDPRESS"
    );

    let publishedUrl = `https://downtowndental.com/blog/${contentItem.slug}`;

    if (wpIntegration) {
      const config = wpIntegration.config as any;
      // Simulate WordPress REST API create post call
      console.log(`[MOCK WordPress REST API] Posting: "${contentItem.title}" to ${config.siteUrl}`);
      publishedUrl = `${config.siteUrl}/blog/${contentItem.slug}`;
    }

    // Trigger Google Indexing API
    const indexing = new GoogleIndexingClient();
    const indexResult = await indexing.publishUrl(publishedUrl, "URL_UPDATED");

    // Update Content status in database
    await prisma.contentItem.update({
      where: { id: contentItemId },
      data: {
        status: "INDEXED",
        publishedUrl,
        indexedAt: new Date(),
      },
    });

    return NextResponse.json({
      success: true,
      publishedUrl,
      indexingNotification: indexResult,
    });
  } catch (error: any) {
    console.error("Publishing API route error:", error);
    return NextResponse.json({ error: error.message || "Failed to publish content item" }, { status: 500 });
  }
}
