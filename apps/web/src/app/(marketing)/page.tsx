import React from "react";
import Link from "next/link";
import { Button, Card, CardContent } from "@repo/ui";
import { ArrowRight, Shield, Zap, Sparkles, CheckCircle2, TrendingUp, Users } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Hero Section */}
      <section className="container max-w-6xl mx-auto px-6 pt-24 pb-16 text-center space-y-8">
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground font-semibold uppercase tracking-wider backdrop-blur-sm animate-pulse-slow">
          <Sparkles className="h-3 w-3 text-secondary animate-pulse" />
          <span>Outcome-as-a-Service SEO</span>
        </div>

        <h1 className="font-outfit font-extrabold tracking-tight text-5xl md:text-7xl max-w-4xl mx-auto leading-none text-white">
          Zero-Risk SEO. Pay Only For <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-secondary">Verified Results.</span>
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto font-inter leading-relaxed">
          No monthly retainers. No generic PDFs. Funds are held in a secure milestone escrow and released only when target rankings, backlinks, and traffic levels hit your goals.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/calculator">
            <Button size="lg" variant="escrow" className="gap-2 text-base font-semibold w-full sm:w-auto">
              Build Your Escrow Contract <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/playbooks">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              Explore Product Playbooks
            </Button>
          </Link>
        </div>
      </section>

      {/* Philosophy Stats & Highlights */}
      <section className="container max-w-5xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="glass-panel border-white/5">
          <CardContent className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-lg bg-escrow-emerald/10 border border-escrow-emerald/20 flex items-center justify-center">
              <Shield className="h-6 w-6 text-escrow-emerald" />
            </div>
            <h3 className="text-lg font-bold text-white font-outfit">Escrow-Backed Safety</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We capture and hold milestone payments. Verification is driven directly by automated API checks (DataForSEO, GSC, GA4). If we don't hit the targets, you don't pay.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/5">
          <CardContent className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-bold text-white font-outfit">Dedicated SEO Delivery Pods</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              No generalist freelancers. Your project is run by a dedicated pod of 4 experts: a Strategist, a Content Specialist, a Technical SEO, and a Link Builder.
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/5">
          <CardContent className="p-6 space-y-4">
            <div className="h-12 w-12 rounded-lg bg-secondary/10 border border-secondary/20 flex items-center justify-center">
              <Zap className="h-6 w-6 text-secondary" />
            </div>
            <h3 className="text-lg font-bold text-white font-outfit">AI Content Factory</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Human-in-the-loop content system. OpenAI pipelines generate highly optimized briefs and drafts, edited by expert humans for 10x production speeds and 70% gross margins.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Pod Showcase Section */}
      <section className="container max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="text-center space-y-4 mb-16">
          <h2 className="font-outfit font-extrabold text-3xl md:text-5xl text-white">
            Meet Your Delivery Pod
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            A cross-functional pod of 4 experts allocated to drive your playbook to completion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              role: "Strategist",
              color: "border-purple-500/20 bg-purple-500/5 text-purple-400",
              desc: "Builds topical blueprints, maps keywords, and orchestrates team execution.",
            },
            {
              role: "Content Specialist",
              color: "border-pink-500/20 bg-pink-500/5 text-pink-400",
              desc: "Manages AI Content Factory inputs and polishes outputs for brand voice.",
            },
            {
              role: "Technical SEO",
              color: "border-cyan-500/20 bg-cyan-500/5 text-cyan-400",
              desc: "Optimizes indexing API calls, schema structures, and Core Web Vitals.",
            },
            {
              role: "Link Builder",
              color: "border-amber-500/20 bg-amber-500/5 text-amber-400",
              desc: "Acquires high-DR contextually matching editorial and citation links.",
            },
          ].map((member, i) => (
            <Card key={i} className={`glass-panel border ${member.color}`}>
              <CardContent className="p-6 space-y-4">
                <span className="text-xs uppercase tracking-widest font-bold">{member.role}</span>
                <p className="text-xs text-muted-foreground leading-relaxed mt-2">{member.desc}</p>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-white pt-2">
                  <CheckCircle2 className="h-4 w-4 text-escrow-emerald" />
                  <span>SOP-driven execution</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="container max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="glass-panel border border-white/5 rounded-2xl p-12 bg-gradient-to-b from-white/[0.02] to-transparent space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-primary/10 rounded-full blur-[80px]" />
          <h2 className="font-outfit font-extrabold text-3xl md:text-5xl text-white">
            Ready to secure your outcome?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Estimate your contract parameters using our interactive quote calculator, verify deliverables, and pay only for verified Google keyword placements.
          </p>
          <div className="pt-4">
            <Link href="/calculator">
              <Button size="lg" variant="escrow" className="gap-2 text-base font-semibold">
                Go to Escrow Calculator <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
