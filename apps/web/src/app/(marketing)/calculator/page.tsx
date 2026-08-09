"use client";

import React, { useState, useMemo } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@repo/ui";
import { DollarSign, ShieldCheck, ArrowRight, Trash2, PlusCircle, HelpCircle } from "lucide-react";

export default function CalculatorPage() {
  const [playbook, setPlaybook] = useState<string>("LOCAL_DOMINATION");
  const [keywords, setKeywords] = useState<string[]>(["best dentist near me", "emergency dentist services"]);
  const [newKeyword, setNewKeyword] = useState<string>("");
  const [timeline, setTimeline] = useState<number>(6); // Months

  // Pricing Model Rules:
  // Base fees: LOCAL = $1,500/mo, SAAS = $3,500/mo, ECOM = $4,500/mo, AFFILIATE = $2,500/mo
  // Plus per keyword cost: $100/keyword
  const pricing = useMemo(() => {
    let baseMo = 1500;
    if (playbook === "SAAS_AUTHORITY") baseMo = 3500;
    else if (playbook === "ECOM_SCALE") baseMo = 4500;
    else if (playbook === "AFFILIATE_FLIP") baseMo = 2500;

    const keywordCost = keywords.length * 100;
    const totalMonthly = baseMo + keywordCost;
    const contractTotal = totalMonthly * timeline;
    
    // Escrow Milestone splits:
    let milestones: { title: string; weight: number; amount: number }[] = [];
    if (playbook === "LOCAL_DOMINATION") {
      milestones = [
        { title: "GBP Schema Optimization (20%)", weight: 0.2, amount: contractTotal * 0.2 },
        { title: "Map Pack Top 3 Placement (40%)", weight: 0.4, amount: contractTotal * 0.4 },
        { title: "30 Citation Link Building (40%)", weight: 0.4, amount: contractTotal * 0.4 },
      ];
    } else if (playbook === "SAAS_AUTHORITY") {
      milestones = [
        { title: "Topical Map Blueprint Approved (15%)", weight: 0.15, amount: contractTotal * 0.15 },
        { title: "15 Indexed Articles (45%)", weight: 0.45, amount: contractTotal * 0.45 },
        { title: "GSC Traffic Goals Met (40%)", weight: 0.4, amount: contractTotal * 0.4 },
      ];
    } else {
      milestones = [
        { title: "Technical Crawl Audit Complete (20%)", weight: 0.2, amount: contractTotal * 0.2 },
        { title: "Core Rankings In Top 10 (40%)", weight: 0.4, amount: contractTotal * 0.4 },
        { title: "Authority Backlinks Built (40%)", weight: 0.4, amount: contractTotal * 0.4 },
      ];
    }

    return {
      monthly: totalMonthly,
      total: contractTotal,
      milestones,
    };
  }, [playbook, keywords, timeline]);

  const addKeyword = () => {
    if (newKeyword.trim() && !keywords.includes(newKeyword.trim())) {
      setKeywords([...keywords, newKeyword.trim()]);
      setNewKeyword("");
    }
  };

  const removeKeyword = (idx: number) => {
    setKeywords(keywords.filter((_, i) => i !== idx));
  };

  const handleDeposit = () => {
    // Escrow Deposit redirect simulation
    alert(`Initiating RazorpayX/Stripe Escrow Deposit for $${pricing.total.toLocaleString()}.\nGenerating Escrow Wallet...`);
  };

  return (
    <div className="container max-w-6xl mx-auto px-6 py-20 space-y-12">
      <div className="text-center space-y-4">
        <h1 className="font-outfit font-extrabold text-4xl md:text-6xl text-white">
          Escrow Contract Calculator
        </h1>
        <p className="text-muted-foreground text-sm max-w-md mx-auto">
          Input your parameters to generate a performance-based escrow billing schedule.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Settings Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass-panel border-white/5 p-6 space-y-6">
            <h2 className="text-lg font-bold font-outfit text-white">1. Select Playbook & Timeline</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Playbook Type</label>
                <Select value={playbook} onValueChange={(val) => setPlaybook(val)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Playbook" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOCAL_DOMINATION">Local Domination Playbook</SelectItem>
                    <SelectItem value="SAAS_AUTHORITY">SaaS Authority Playbook</SelectItem>
                    <SelectItem value="ECOM_SCALE">E-Commerce Scale Playbook</SelectItem>
                    <SelectItem value="AFFILIATE_FLIP">Affiliate Site Recovery</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Timeline (Months)</label>
                <input
                  type="range"
                  min="3"
                  max="12"
                  step="1"
                  value={timeline}
                  onChange={(e) => setTimeline(parseInt(e.target.value))}
                  className="w-full h-2 rounded bg-zinc-800 accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>3 mo</span>
                  <span className="text-white font-bold">{timeline} Months</span>
                  <span>12 mo</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="glass-panel border-white/5 p-6 space-y-4">
            <h2 className="text-lg font-bold font-outfit text-white">2. Target Keywords</h2>
            <p className="text-xs text-muted-foreground">Keywords determine search targeting and onpage silo maps.</p>
            
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Enter keyword..."
                value={newKeyword}
                onChange={(e) => setNewKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addKeyword()}
                className="flex-1 h-9 rounded-md border border-zinc-800 bg-black/40 px-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-primary"
              />
              <Button size="sm" onClick={addKeyword} className="gap-1">
                <PlusCircle className="h-4 w-4" /> Add
              </Button>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {keywords.map((kw, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white"
                >
                  <span>{kw}</span>
                  <button onClick={() => removeKeyword(idx)} className="hover:text-red-400">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Pricing Summary Panel */}
        <div className="space-y-6">
          <Card className="glass-panel border-white/5 bg-gradient-to-b from-white/[0.02] to-transparent p-6 space-y-6">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold">Total Escrow Budget</span>
              <div className="text-4xl font-extrabold text-white mt-1 flex items-center">
                <DollarSign className="h-8 w-8 text-escrow-emerald" />
                <span>{pricing.total.toLocaleString()}</span>
              </div>
              <p className="text-[11px] text-muted-foreground mt-2">
                ${pricing.monthly.toLocaleString()} / mo over {timeline} months contract
              </p>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-3">
              <span className="text-xs font-bold text-white uppercase tracking-wider">Milestone Payout Schedule</span>
              <div className="space-y-3">
                {pricing.milestones.map((milestone, idx) => (
                  <div key={idx} className="flex justify-between items-center text-xs">
                    <div className="space-y-0.5 max-w-[180px]">
                      <p className="text-white font-medium truncate">{milestone.title}</p>
                      <p className="text-[10px] text-muted-foreground">Verification: API Verified</p>
                    </div>
                    <span className="font-extrabold text-white">${Math.round(milestone.amount).toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-white/5 pt-4 space-y-4">
              <div className="flex items-center gap-2 text-[11px] text-escrow-emerald bg-escrow-emerald/5 p-3 rounded-lg border border-escrow-emerald/10">
                <ShieldCheck className="h-4 w-4 shrink-0" />
                <span>Funds remain protected in Escrow until verified proofs are approved.</span>
              </div>

              <Button onClick={handleDeposit} variant="escrow" className="w-full gap-2 text-sm font-semibold">
                Generate Escrow Wallet <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
