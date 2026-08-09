import React from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, Button } from "@repo/ui";
import { ArrowRight, MapPin, Building, ShoppingBag, RefreshCw } from "lucide-react";

export default function PlaybooksPage() {
  const playbooks = [
    {
      title: "Local Domination Playbook",
      slug: "local-domination-dentist",
      type: "LOCAL_DOMINATION",
      icon: <MapPin className="h-6 w-6 text-pod-link" />,
      desc: "Perfect for local physical services. Boost Google Maps listing rankings, build citations, and generate geo-targeted content pages.",
      focus: ["Google Maps top 3", "30 citation links", "Local business schema"],
    },
    {
      title: "SaaS Authority Playbook",
      slug: "saas-authority-growth",
      type: "SAAS_AUTHORITY",
      icon: <Building className="h-6 w-6 text-pod-strategist" />,
      desc: "Dominate software rankings. Build complex topical cluster maps, publish high-conversion articles, and rank for transactional terms.",
      focus: ["Topical silo structure", "15 indexed articles", "Search volume boost"],
    },
    {
      title: "E-Commerce Scale Playbook",
      slug: "ecom-category-scale",
      type: "ECOM_SCALE",
      icon: <ShoppingBag className="h-6 w-6 text-pod-technical" />,
      desc: "Rank category pages. Solve crawling and indexing bottlenecks, enhance facet navigation crawl path, and build high-authority links.",
      focus: ["Crawl budget optimization", "CWV score 90+", "20 high-DR links"],
    },
    {
      title: "Affiliate Site Recovery & Flip",
      slug: "affiliate-eeat-recovery",
      type: "AFFILIATE_FLIP",
      icon: <RefreshCw className="h-6 w-6 text-pod-content" />,
      desc: "Recover from core algorithm drops. Deep content audit, pruning redundant posts, integrating E-E-A-T schemas, and link cleanup.",
      focus: ["Redundant content prune", "Top 8 ranking recovery", "E-E-A-T verification"],
    },
  ];

  return (
    <div className="container max-w-6xl mx-auto px-6 py-20 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="font-outfit font-extrabold text-4xl md:text-6xl text-white">
          Productized Playbooks
        </h1>
        <p className="text-muted-foreground text-base max-w-lg mx-auto">
          We deliver standard playbooks with predictable milestone escrow payments. Select a playbook matching your business type to begin.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {playbooks.map((playbook, idx) => (
          <Card key={idx} className="glass-panel border-white/5 flex flex-col justify-between">
            <CardHeader className="space-y-4">
              <div className="h-12 w-12 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                {playbook.icon}
              </div>
              <CardTitle className="text-2xl text-white font-outfit">{playbook.title}</CardTitle>
              <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                {playbook.desc}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Key Milestones:</span>
                <ul className="grid grid-cols-1 gap-2">
                  {playbook.focus.map((item, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="h-1.5 w-1.5 rounded-full bg-escrow-emerald" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link href={`/playbooks/${playbook.slug}`} className="block">
                <Button className="w-full gap-2" variant="outline">
                  View Playbook Details <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
