"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@repo/ui";
import { ShieldCheck, HelpCircle, AlertCircle, Sparkles, CheckCircle2 } from "lucide-react";

export default function MilestonesPage({ params }: { params: { id: string } }) {
  const { id } = params;

  // Real React state to simulate approving and releasing milestone payouts
  const [milestones, setMilestones] = useState([
    {
      id: "ms_1",
      title: "GBP & Local Schema Optimization",
      desc: "Apply dentists structured schema markup and completely optimize Google Business Profile metadata.",
      amount: 1300,
      status: "ESCROW_RELEASED",
      proof: "Dentist schema verified: 100% markup check validation success.",
    },
    {
      id: "ms_2",
      title: "Google Map Pack Top 3 Placement",
      desc: "Rank within top 3 pack results for target localized dental terms in local search.",
      amount: 2600,
      status: "CLIENT_REVIEW",
      proof: "Current Rank: 2 (DataForSEO SERP verified snapshot from Aug 8, 2026)",
    },
    {
      id: "ms_3",
      title: "30 Local Citation Link Building",
      desc: "Build 30 verified citation directory links (Yelp, Healthgrades, YellowPages, etc.).",
      amount: 2600,
      status: "PENDING",
      proof: null,
    },
  ]);

  const releaseFunds = (milestoneId: string) => {
    setMilestones(
      milestones.map((m) =>
        m.id === milestoneId ? { ...m, status: "ESCROW_RELEASED" } : m
      )
    );
    alert("Triggering payout! Funds released from Escrow wallet to Delivery Pod bank account.");
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-bold font-outfit text-white">Performance-Based Milestones</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Review automated API verification proofs. Funds are only released when milestones are completed.
        </p>
      </div>

      <div className="space-y-6">
        {milestones.map((m, idx) => (
          <Card key={m.id} className="glass-panel border-white/5">
            <CardContent className="p-6 flex flex-col md:flex-row justify-between gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/20 text-primary-foreground border border-primary/30">Milestone {idx + 1}</span>
                  <h3 className="text-base font-bold text-white">{m.title}</h3>
                  <Badge
                    variant={
                      m.status === "ESCROW_RELEASED"
                        ? "success"
                        : m.status === "CLIENT_REVIEW"
                        ? "warning"
                        : "outline"
                    }
                  >
                    {m.status.replace("_", " ")}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.desc}</p>
                {m.proof && (
                  <div className="p-3 rounded bg-white/[0.02] border border-white/5 space-y-1">
                    <span className="text-[10px] text-muted-foreground uppercase font-bold flex items-center gap-1">
                      <Sparkles className="h-3 w-3 text-secondary animate-pulse" /> API Verification Proof
                    </span>
                    <p className="text-xs text-white font-medium">{m.proof}</p>
                  </div>
                )}
              </div>

              <div className="text-right md:min-w-[180px] flex flex-col justify-center items-end gap-3 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6">
                <div>
                  <span className="text-2xl font-extrabold text-white">${m.amount.toLocaleString()}</span>
                  <span className="text-[10px] text-muted-foreground uppercase block">Escrow amount</span>
                </div>
                
                {m.status === "CLIENT_REVIEW" && (
                  <Button size="sm" variant="escrow" onClick={() => releaseFunds(m.id)} className="w-full gap-1 text-xs">
                    <ShieldCheck className="h-4 w-4" /> Approve & Release
                  </Button>
                )}
                {m.status === "ESCROW_RELEASED" && (
                  <span className="text-xs text-escrow-emerald font-semibold flex items-center gap-1">
                    <CheckCircle2 className="h-4 w-4" /> Paid & Released
                  </span>
                )}
                {m.status === "PENDING" && (
                  <span className="text-xs text-muted-foreground italic flex items-center gap-1">
                    <AlertCircle className="h-4 w-4" /> Pending completion
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
