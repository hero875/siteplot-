"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@repo/ui";
import { Cpu, Loader2, Link as LinkIcon } from "lucide-react";

interface ContentItem {
  id: string;
  title: string;
  status: string;
  keywordSeed: string | null;
  slug: string;
}

export default function ContentQueueClient({
  projectId,
  initialItems,
}: {
  projectId: string;
  initialItems: ContentItem[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<ContentItem[]>(initialItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [topic, setTopic] = useState("");
  const [keyword, setKeyword] = useState("");

  const triggerFactory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!topic || !keyword) {
      setError("Please fill in both Topic and Target Keyword.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/content/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectId,
          topic,
          keyword,
          brandVoice: "professional, authoritative, and helpful",
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Generation pipeline failed");
      }

      router.refresh();
      setTopic("");
      setKeyword("");
      alert(`AI Content Factory successfully generated the article: "${data.title}"!\nPassed SEO QA Checklist: ${data.qaPassed ? "YES" : "NO"}`);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during pipeline execution");
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setItems(initialItems);
  }, [initialItems]);

  const displayItems = items.length > 0 ? items : (projectId.startsWith("proj_") ? [
    {
      id: "c_1",
      title: "SOP guide for dental schema optimization",
      status: "INDEXED",
      keywordSeed: "dental schema",
      slug: "dental-schema",
    },
    {
      id: "c_2",
      title: "Pricing details for orthodontic implants",
      status: "PUBLISHED",
      keywordSeed: "orthodontic implants cost",
      slug: "orthodontic-implants-cost",
    },
    {
      id: "c_3",
      title: "Dental emergency tips checklist",
      status: "HUMAN_EDIT",
      keywordSeed: "dental emergency tips",
      slug: "dental-emergency-tips",
    },
  ] : []);

  return (
    <div className="space-y-8">
      {/* Interactive Creator Form */}
      <Card className="glass-panel border-white/5 p-6">
        <form onSubmit={triggerFactory} className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Trigger AI Content Pipeline</h3>
              <p className="text-[10px] text-muted-foreground">Uses OpenAI + SitePilot QA auditor to research, write, and verify your article.</p>
            </div>
            <Button type="submit" disabled={loading} size="sm" className="gap-2">
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Cpu className="h-4 w-4" />
              )}
              <span>{loading ? "Running pipeline..." : "Generate AI Article"}</span>
            </Button>
          </div>

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 p-2.5 rounded">
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-muted-foreground uppercase">Target Article Topic</label>
              <input
                type="text"
                required
                placeholder="e.g. How to cure bleeding gums naturally"
                value={topic}
                disabled={loading}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full h-9 rounded-md border border-zinc-800 bg-black/40 px-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-bold text-muted-foreground uppercase">Target Focus Keyword</label>
              <input
                type="text"
                required
                placeholder="e.g. bleeding gums cure"
                value={keyword}
                disabled={loading}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full h-9 rounded-md border border-zinc-800 bg-black/40 px-3 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </form>
      </Card>

      {/* Columns Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["AI_DRAFT & HUMAN_EDIT", "PUBLISHED", "INDEXED"].map((column) => {
          let filterStatus = ["AI_DRAFT", "HUMAN_EDIT", "IDEA"];
          if (column === "PUBLISHED") filterStatus = ["PUBLISHED", "QA_PASSED", "APPROVED"];
          if (column === "INDEXED") filterStatus = ["INDEXED"];

          const columnItems = displayItems.filter((item) => filterStatus.includes(item.status));

          return (
            <div key={column} className="space-y-4">
              <span className="text-[10px] text-muted-foreground uppercase font-extrabold tracking-wider">{column}</span>
              <div className="space-y-3 min-h-[200px] p-4 rounded-xl border border-white/5 bg-white/[0.01]">
                {columnItems.length === 0 ? (
                  <p className="text-xs text-muted-foreground italic text-center pt-8">Column empty</p>
                ) : (
                  columnItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 rounded-lg bg-card border border-white/5 space-y-3 hover:border-white/10 transition-all"
                    >
                      <div className="space-y-1">
                        <Badge variant={item.status === "INDEXED" ? "success" : "info"}>
                          {item.status.replace("_", " ")}
                        </Badge>
                        <h4 className="text-xs font-bold text-white leading-snug">{item.title}</h4>
                      </div>
                      <p className="text-[10px] text-muted-foreground">Keyword: &ldquo;{item.keywordSeed || "none"}&rdquo;</p>
                      {item.status === "INDEXED" && (
                        <div className="text-[10px] text-primary flex items-center gap-1">
                          <LinkIcon className="h-3 w-3" />
                          <span className="truncate">/{item.slug}</span>
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
