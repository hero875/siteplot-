import React from "react";
import Link from "next/link";
import { Badge } from "@repo/ui";
import { LayoutDashboard, Milestone, FileText, Link2, FileBarChart2 } from "lucide-react";
import { prisma } from "@repo/db";

export default async function ProjectDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { id } = params;

  // Fetch project dynamically from Supabase
  const project = id.startsWith("proj_") ? null : await prisma.project.findUnique({
    where: { id },
  });

  const projectName = project ? project.name : (id === "proj_saas_auth" ? "SaaS CRM Campaign" : "Downtown Dental Campaign");
  const projectStatus = project ? project.status : "ACTIVE";

  return (
    <div className="p-8 space-y-6 max-w-6xl mx-auto">
      {/* Project Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-4 border-b border-white/5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Campaign: {id.substring(0, 12)}...</span>
            <Badge variant={projectStatus === "ACTIVE" ? "success" : "info"}>{projectStatus}</Badge>
          </div>
          <h1 className="font-outfit font-extrabold text-3xl text-white mt-1">{projectName}</h1>
        </div>
      </div>

      {/* Tabbed Navigation */}
      <nav className="flex flex-wrap gap-2 text-xs font-semibold">
        <Link
          href={`/projects/${id}`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-all"
        >
          <LayoutDashboard className="h-3.5 w-3.5" />
          <span>Overview</span>
        </Link>
        <Link
          href={`/projects/${id}/milestones`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-all"
        >
          <Milestone className="h-3.5 w-3.5" />
          <span>Milestones</span>
        </Link>
        <Link
          href={`/projects/${id}/content`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-all"
        >
          <FileText className="h-3.5 w-3.5" />
          <span>Content Queue</span>
        </Link>
        <Link
          href={`/projects/${id}/links`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-all"
        >
          <Link2 className="h-3.5 w-3.5" />
          <span>Backlinks</span>
        </Link>
        <Link
          href={`/projects/${id}/reports`}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/5 text-white hover:bg-white/10 transition-all"
        >
          <FileBarChart2 className="h-3.5 w-3.5" />
          <span>Reports</span>
        </Link>
      </nav>

      {/* Page Content */}
      <div className="pt-2">{children}</div>
    </div>
  );
}
