"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from "@repo/ui";
import { FileText, Cpu, ArrowRight, CheckCircle2, RefreshCw } from "lucide-react";

export default function ContentQueuePage({ params }: { params: { id: string } }) {
  const { id } = params;
  
  // Real React state to simulate initiating AI Content Factory runs
  const [items, setItems] = useState([
    {
      id: "c_1",
      title: "SOP guide for dental schema optimization",
      status: "INDEXED",
      keywords: "dental schema",
      url: "https://downtowndental.com/blog/dental-schema",
    },
    {
      id: "c_2",
      title: "Pricing details for orthodontic implants",
      status: "PUBLISHED",
      keywords: "orthodontic implants cost",
      url: "https://downtowndental.com/blog/orthodontic-implants-cost",
    },
    {
      id: "c_3",
      title: "Dental emergency tips checklist",
      status: "HUMAN_EDIT",
      keywords: "dental emergency tips",
      url: null,
    },
  ]);
  const [loading, setLoading] = useState(false);

  const triggerFactory = async () => {
    setLoading(true);
    // Simulate API call to Content Factory Orchestrator
    setTimeout(() => {
      const newItem = {
        id: `c_${items.length + 1}`,
        title: "How to choose a cosmetic orthodontist in 2026",
        status: "AI_DRAFT",
        keywords: "cosmetic orthodontist",
        url: null,
      };
      setItems([newItem, ...items]);
      setLoading(false);
      alert("AI Content Factory successfully generated brief, wrote first draft, passed QA criteria, and pushed to Notion Queue!");
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-outfit text-white">AI Content Factory Queue</h2>
          <p className="text-xs text-muted-foreground mt-1">
            Produce articles at scale using our AI orchestrator pipelines, polished by pod content specialists.
          </p>
        </div>
        <Button size="sm" variant="default" onClick={triggerFactory} disabled={loading} className="gap-2">
          <Cpu className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
          <span>{loading ? "Running pipeline..." : "Trigger AI Generation"}</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["AI_DRAFT & HUMAN_EDIT", "PUBLISHED", "INDEXED"].map((column) => {
          let filterStatus = ["AI_DRAFT", "HUMAN_EDIT"];
          if (column === "PUBLISHED") filterStatus = ["PUBLISHED"];
          if (column === "INDEXED") filterStatus = ["INDEXED"];

          const columnItems = items.filter((item) => filterStatus.includes(item.status));

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
                      <p className="text-[10px] text-muted-foreground">Keyword: &ldquo;{item.keywords}&rdquo;</p>
                      {item.url && (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] text-primary hover:underline flex items-center gap-1"
                        >
                          View page <ArrowRight className="h-3 w-3" />
                        </a>
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
