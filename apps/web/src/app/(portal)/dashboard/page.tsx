import React from "react";
import { auth } from "@clerk/nextjs/server";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  Badge,
  AreaChart,
  GaugeChart,
} from "@repo/ui";
import { ShieldCheck, TrendingUp, Link2, FileText, Settings, User } from "lucide-react";

export default function DashboardPage() {
  const { orgId } = auth();

  // Mock initial dashboard state data
  const trafficData = [
    { date: "Jul 10", Sessions: 1200, Conversions: 24, CTR: 3.2 },
    { date: "Jul 15", Sessions: 1400, Conversions: 28, CTR: 3.4 },
    { date: "Jul 20", Sessions: 1650, Conversions: 35, CTR: 3.6 },
    { date: "Jul 25", Sessions: 1800, Conversions: 38, CTR: 3.7 },
    { date: "Aug 01", Sessions: 2100, Conversions: 42, CTR: 3.9 },
    { date: "Aug 08", Sessions: 2450, Conversions: 51, CTR: 4.2 },
  ];

  const keywords = [
    { term: "local dentist near me", volume: 8400, difficulty: 45, rank: 2, status: "UP" },
    { term: "emergency root canal cost", volume: 1800, difficulty: 60, rank: 5, status: "UP" },
    { term: "invisalign doctor review", volume: 3200, difficulty: 55, rank: 9, status: "DOWN" },
    { term: "best cosmetic dental implants", volume: 1200, difficulty: 72, rank: 14, status: "UP" },
  ];

  const backlinks = [
    { anchor: "sitepilot dentist blueprint", source: "dentalhealthmag.com", dr: 58, status: "LIVE" },
    { anchor: "dental implants cost details", source: "healthcareinsights.org", dr: 64, status: "LIVE" },
    { anchor: "invisalign doctors near me", source: "localhealthratings.net", dr: 42, status: "LIVE" },
  ];

  const contentQueue = [
    { title: "SOP guide for dental schema optimization", status: "INDEXED" },
    { title: "Pricing details for orthodontic implants", status: "PUBLISHED" },
    { title: "Dental emergency tips checklist", status: "HUMAN_EDIT" },
  ];

  return (
    <div className="p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-outfit font-extrabold text-3xl text-white">Live Client Portal</h1>
          <p className="text-muted-foreground text-xs">Real-time keyword ranks, organic traffic, and backlink milestones.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="success" className="gap-1.5 px-3 py-1">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>SEO Insurance Active</span>
          </Badge>
          <Badge variant="secondary" className="px-3 py-1 text-white">
            Delivery Pod: Alpha-Local
          </Badge>
        </div>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="glass-panel border-white/5">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Organic Sessions</span>
              <p className="text-2xl font-extrabold text-white">2,450</p>
              <span className="text-[10px] text-escrow-emerald font-semibold flex items-center gap-0.5">
                <TrendingUp className="h-3 w-3" /> +15.4% this month
              </span>
            </div>
            <div className="h-10 w-10 rounded bg-white/5 flex items-center justify-center border border-white/10 text-primary">
              <TrendingUp className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/5">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Total Backlinks</span>
              <p className="text-2xl font-extrabold text-white">164</p>
              <span className="text-[10px] text-escrow-emerald font-semibold">+8 live links today</span>
            </div>
            <div className="h-10 w-10 rounded bg-white/5 flex items-center justify-center border border-white/10 text-purple-400">
              <Link2 className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/5">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Content In Silos</span>
              <p className="text-2xl font-extrabold text-white">18 Articles</p>
              <span className="text-[10px] text-purple-400 font-semibold">12 URLs indexed</span>
            </div>
            <div className="h-10 w-10 rounded bg-white/5 flex items-center justify-center border border-white/10 text-pink-400">
              <FileText className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/5">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-[10px] text-muted-foreground uppercase font-bold">Milestones Hit</span>
              <p className="text-2xl font-extrabold text-white">2 / 3</p>
              <span className="text-[10px] text-muted-foreground">Next release: Rank Top 3</span>
            </div>
            <div className="h-10 w-10 rounded bg-white/5 flex items-center justify-center border border-white/10 text-amber-500">
              <Settings className="h-5 w-5" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Charts & Rankings Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left main reports */}
        <div className="lg:col-span-2 space-y-8">
          {/* GSC organic traffic Area Chart */}
          <Card className="glass-panel border-white/5">
            <CardHeader>
              <CardTitle className="text-white font-outfit">Organic Sessions & Conversions Flow</CardTitle>
            </CardHeader>
            <CardContent>
              <AreaChart
                data={trafficData}
                index="date"
                categories={["Sessions", "Conversions"]}
                colors={["#8b5cf6", "#10b981"]}
              />
            </CardContent>
          </Card>

          {/* Keyword Rank Table */}
          <Card className="glass-panel border-white/5">
            <CardHeader>
              <CardTitle className="text-white font-outfit">Google Keyword Placements (Target list)</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Target Keyword</TableHead>
                    <TableHead>Search Volume</TableHead>
                    <TableHead>Difficulty (KD)</TableHead>
                    <TableHead>Current Rank</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {keywords.map((kw, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-semibold text-white">{kw.term}</TableCell>
                      <TableCell>{kw.volume.toLocaleString()}</TableCell>
                      <TableCell>{kw.difficulty}%</TableCell>
                      <TableCell>
                        <Badge variant={kw.rank <= 3 ? "success" : kw.rank <= 10 ? "info" : "outline"}>
                          Position {kw.rank}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {kw.status === "UP" ? (
                          <span className="text-escrow-emerald text-xs font-bold">▲ Up</span>
                        ) : (
                          <span className="text-red-400 text-xs font-bold">▼ Down</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Backlink Wall */}
          <Card className="glass-panel border-white/5">
            <CardHeader>
              <CardTitle className="text-white font-outfit">Live Backlink Acquisitions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {backlinks.map((link, idx) => (
                  <div key={idx} className="p-4 rounded-lg bg-white/[0.02] border border-white/5 space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-white uppercase">DR {link.dr}</span>
                      <Badge variant="success">Live</Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground truncate">Source: {link.source}</p>
                    <p className="text-xs text-white font-medium truncate">Anchor: &ldquo;{link.anchor}&rdquo;</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar reports */}
        <div className="space-y-8">
          {/* Tech Health Score Dial */}
          <Card className="glass-panel border-white/5 text-center">
            <CardHeader>
              <CardTitle className="text-white font-outfit">Technical Health Score</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <GaugeChart value={94} title="CRAWL AUDIT OK" />
            </CardContent>
          </Card>

          {/* Content Kanban status checklist */}
          <Card className="glass-panel border-white/5">
            <CardHeader>
              <CardTitle className="text-white font-outfit">Content production status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {contentQueue.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs p-3 rounded bg-white/[0.01] border border-white/5">
                  <span className="text-muted-foreground font-medium truncate max-w-[160px]">{item.title}</span>
                  <Badge variant={item.status === "INDEXED" ? "success" : "info"}>
                    {item.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pod delivery roster */}
          <Card className="glass-panel border-white/5">
            <CardHeader>
              <CardTitle className="text-white font-outfit">Delivery Pod Contacts</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Sarah K.", role: "Strategist", initial: "SK" },
                { name: "John D.", role: "Content Lead", initial: "JD" },
                { name: "Michael C.", role: "Technical SEO", initial: "MC" },
              ].map((member, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-primary/20 text-primary-foreground border border-primary/30 flex items-center justify-center font-bold text-xs">
                    {member.initial}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{member.name}</h4>
                    <p className="text-[10px] text-muted-foreground">{member.role}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
