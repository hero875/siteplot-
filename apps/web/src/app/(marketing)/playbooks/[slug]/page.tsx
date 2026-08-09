import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@repo/ui";
import { ChevronRight, ShieldAlert, BadgeDollarSign, BookOpen, Layers, CheckCircle } from "lucide-react";

interface PlaybookData {
  title: string;
  niche: string;
  overview: string;
  budgetBreakdown: string;
  milestones: { title: string; weight: string; method: string; desc: string }[];
  sops: string[];
}

export default function PlaybookSlugPage({ params }: { params: { slug: string } }) {
  const { slug } = params;

  // Retrieve programmatic SEO template context based on URL
  const data: { [key: string]: PlaybookData } = {
    "local-domination-dentist": {
      title: "Local Domination Playbook",
      niche: "Dentist Clinics & Orthodontists",
      overview: "Designed specifically to capture localized high-intent dentist search volumes (e.g. 'invisalign dentist near me'). Drives dental leads directly to appointment forms.",
      budgetBreakdown: "20% Onboarding/Schema, 40% Map Pack Rankings, 40% Citation building.",
      milestones: [
        { title: "GBP and Local Schema Setup", weight: "20%", method: "Manual Audit Checklist", desc: "Setting up custom dentist schemas and Map optimization." },
        { title: "Google Map Pack Top 3 Placement", weight: "40%", method: "DataForSEO Live Rank Verification", desc: "Rank within top 3 positions for target keywords in local area." },
        { title: "30 Verified Citations & Directory Links", weight: "40%", method: "Manual link wall verification", desc: "Secure local citation signals." }
      ],
      sops: [
        "Strategist completes dentist keyword mapping (implants, crowns, invisalign).",
        "Technical SEO implements LocalBusiness schema containing operating hours and doctor credentials.",
        "Link Builder submits profile submissions to localized health directories.",
        "Real-time SERP scans verify Google Maps placement."
      ]
    },
    "saas-authority-growth": {
      title: "SaaS Authority Playbook",
      niche: "B2B Software & Tech Startups",
      overview: "Acquire transactional search terms and establish high authority across key categories. Ideal for SaaS platforms seeking trial signups.",
      budgetBreakdown: "15% Topical Sitemap, 45% Content generation & indexing, 40% Traffic milestones.",
      milestones: [
        { title: "Topical Map Approval", weight: "15%", method: "Manual strategic review", desc: "Construct content silos mapping commercial vs info intents." },
        { title: "15 Articles Published & Indexed", weight: "45%", method: "Google Indexing API status check", desc: "Draft high-EEAT articles, QA checks, push to CMS, and index." },
        { title: "Organic Traffic Target (1500 visits)", weight: "40%", method: "Google Search Console API verification", desc: "Reach traffic thresholds on organic landing pages." }
      ],
      sops: [
        "Strategist builds visual topical map outline in Notion database.",
        "Content writer generates drafts via AI Content Factory optimizing for natural NLP term densities.",
        "Technical SEO executes URL indexation calls via batch Google Indexing API helper.",
        "GSC dashboard runs weekly analytics to verify traffic numbers."
      ]
    }
  };

  const playbook = data[slug];

  if (!playbook) {
    notFound();
  }

  return (
    <div className="container max-w-5xl mx-auto px-6 py-20 space-y-12">
      {/* breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Link href="/playbooks" className="hover:text-white transition-colors">Playbooks</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="text-white font-medium">{playbook.title}</span>
      </div>

      <div className="space-y-6">
        <h1 className="font-outfit font-extrabold text-4xl md:text-6xl text-white">
          {playbook.title} <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-purple-400">for {playbook.niche}</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl">
          {playbook.overview}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Milestones Escrow Breakdown */}
        <div className="lg:col-span-2 space-y-8">
          <h2 className="text-2xl font-bold font-outfit text-white flex items-center gap-2">
            <Layers className="h-5 w-5 text-primary" />
            Milestone Escrow Setup
          </h2>
          <div className="space-y-4">
            {playbook.milestones.map((m, idx) => (
              <Card key={idx} className="glass-panel border-white/5">
                <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/20 text-primary-foreground border border-primary/30">Milestone {idx + 1}</span>
                      <h3 className="text-base font-bold text-white">{m.title}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground">{m.desc}</p>
                    <div className="text-[11px] text-muted-foreground/60">
                      <strong>Verification Method:</strong> {m.method}
                    </div>
                  </div>
                  <div className="text-right md:min-w-[100px] flex flex-col justify-center">
                    <span className="text-lg font-extrabold text-escrow-emerald">{m.weight}</span>
                    <span className="text-[10px] text-muted-foreground uppercase">Budget Weight</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* SOP Checklist */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold font-outfit text-white flex items-center gap-2">
            <BookOpen className="h-5 w-5 text-secondary" />
            Execution SOP
          </h2>
          <Card className="glass-panel border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent">
            <CardContent className="p-6 space-y-4">
              {playbook.sops.map((sop, i) => (
                <div key={i} className="flex gap-3">
                  <CheckCircle className="h-4 w-4 text-escrow-emerald shrink-0 mt-0.5" />
                  <span className="text-xs text-muted-foreground leading-relaxed">{sop}</span>
                </div>
              ))}
              <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs text-amber-500 bg-amber-500/10 p-3 rounded-lg border border-amber-500/20">
                  <ShieldAlert className="h-4 w-4 shrink-0" />
                  <span>Escrow backing guarantees funds release on API verified proofs.</span>
                </div>
                <Link href="/calculator" className="block">
                  <Button className="w-full gap-2" variant="escrow">
                    <BadgeDollarSign className="h-4 w-4" /> Start Escrow Order
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
