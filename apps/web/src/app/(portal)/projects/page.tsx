import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button, Badge } from "@repo/ui";
import { FolderKanban, ArrowRight, ShieldCheck, PlayCircle } from "lucide-react";

export default function ProjectsPage() {
  // Mock projects list context
  const projects = [
    {
      id: "proj_local_dentist",
      name: "Downtown Dental Clinic Campaign",
      playbookType: "LOCAL_DOMINATION",
      status: "ACTIVE",
      niche: "dentist",
      budget: 6500,
      nextMilestone: "Google Map Pack Top 3 Placement",
      podName: "Pod Alpha - Local SEO",
    },
    {
      id: "proj_saas_auth",
      name: "SaaS CRM topical expansion campaign",
      playbookType: "SAAS_AUTHORITY",
      status: "ONBOARDING",
      niche: "crm-software",
      budget: 18000,
      nextMilestone: "Topical Map Approval",
      podName: "Pod Beta - SaaS Authority",
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-5xl mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-outfit font-extrabold text-3xl text-white">My SEO Projects</h1>
          <p className="text-muted-foreground text-xs">Manage active campaigns, check delivery progress, and fund milestones.</p>
        </div>
        <Link href="/calculator">
          <Button size="sm" variant="default" className="gap-1">
            <PlayCircle className="h-4 w-4" /> Start New Campaign
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, idx) => (
          <Card key={idx} className="glass-panel border-white/5 flex flex-col justify-between">
            <CardHeader className="space-y-2">
              <div className="flex justify-between items-center">
                <Badge variant={project.status === "ACTIVE" ? "success" : "info"}>
                  {project.status}
                </Badge>
                <span className="text-xs font-bold text-escrow-emerald">${project.budget.toLocaleString()} Contract</span>
              </div>
              <CardTitle className="text-xl text-white font-outfit">{project.name}</CardTitle>
              <CardDescription className="text-xs text-muted-foreground font-medium">
                Playbook: {project.playbookType.replace("_", " ")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-3 rounded bg-white/[0.01] border border-white/5 space-y-1">
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Upcoming Milestone Target</span>
                <p className="text-xs text-white font-semibold">{project.nextMilestone}</p>
              </div>

              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Delivery: <strong>{project.podName}</strong></span>
                <div className="flex items-center gap-1 text-[11px] text-escrow-emerald font-semibold">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Escrow Safe</span>
                </div>
              </div>

              <Link href={`/projects/${project.id}`} className="block">
                <Button className="w-full gap-2" variant="outline">
                  Manage Campaign <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
