"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Card, CardContent } from "@repo/ui";
import { PlusCircle, Loader2 } from "lucide-react";

export default function CreateProjectForm() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    playbookType: "LOCAL_DOMINATION",
    niche: "",
    budget: 5000,
    domain: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/projects/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create project");
      }

      setIsOpen(false);
      setFormData({
        name: "",
        playbookType: "LOCAL_DOMINATION",
        niche: "",
        budget: 5000,
        domain: "",
      });
      router.refresh();
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-end">
        <Button onClick={() => setIsOpen(!isOpen)} variant="default" size="sm" className="gap-1">
          <PlusCircle className="h-4 w-4" />
          {isOpen ? "Close Form" : "Add Website Campaign"}
        </Button>
      </div>

      {isOpen && (
        <Card className="glass-panel border-white/5 p-6 animate-in fade-in slide-in-from-top-4 duration-200">
          <form onSubmit={handleSubmit} className="space-y-4">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">Configure New SEO Campaign</h3>

            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded">
                {error}
              </p>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Campaign Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Downtown Dental Campaign"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full h-9 rounded-md border border-zinc-800 bg-black/40 px-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Website Domain</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. downtowndental.com"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  className="w-full h-9 rounded-md border border-zinc-800 bg-black/40 px-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Niche / Industry</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. dentist"
                  value={formData.niche}
                  onChange={(e) => setFormData({ ...formData, niche: e.target.value })}
                  className="w-full h-9 rounded-md border border-zinc-800 bg-black/40 px-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Playbook Type</label>
                <select
                  value={formData.playbookType}
                  onChange={(e) => setFormData({ ...formData, playbookType: e.target.value })}
                  className="w-full h-9 rounded-md border border-zinc-800 bg-zinc-900 px-3 text-xs text-white focus:outline-none focus:border-primary"
                >
                  <option value="LOCAL_DOMINATION">Local Domination Playbook</option>
                  <option value="SAAS_AUTHORITY">SaaS Authority Playbook</option>
                  <option value="ECOM_SCALE">E-Commerce Scale Playbook</option>
                  <option value="AFFILIATE_FLIP">Affiliate Site Recovery</option>
                </select>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Escrow Budget ($)</label>
                <input
                  type="number"
                  required
                  min="500"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  className="w-full h-9 rounded-md border border-zinc-800 bg-black/40 px-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full text-xs font-semibold gap-1.5 mt-2">
              {loading ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                  Creating Campaign...
                </>
              ) : (
                "Save Campaign & Generate Milestones"
              )}
            </Button>
          </form>
        </Card>
      )}
    </div>
  );
}
