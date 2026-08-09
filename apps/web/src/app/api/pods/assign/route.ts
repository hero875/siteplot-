import { NextRequest, NextResponse } from "next/server";
import { prisma, getAvailablePod, assignPodToProject } from "@repo/db";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { projectId, niche } = body;

    if (!projectId || !niche) {
      return NextResponse.json({ error: "Missing projectId or niche" }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    // Query for a pod covering this niche under organization
    const availablePod = await getAvailablePod(niche, project.organizationId);

    if (!availablePod) {
      return NextResponse.json({
        success: false,
        message: "No delivery pod currently has matching niche capacity. Retrying later.",
      });
    }

    // Allocate pod to project
    await assignPodToProject(projectId, availablePod.id);

    return NextResponse.json({
      success: true,
      podId: availablePod.id,
      podName: availablePod.name,
    });
  } catch (error: any) {
    console.error("Pod assignment route error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
