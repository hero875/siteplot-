import React from "react";
import { Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from "@repo/ui";
import { ShieldCheck, AlertCircle, TrendingDown, HelpCircle, Activity } from "lucide-react";

export default function InsurancePage() {
  const claims = [
    {
      id: "cl_1",
      date: "Jul 15, 2026",
      reason: "GSC Traffic drop >15% (Core Algo Update)",
      metric: "Drop: 18.4% rolling clicks",
      status: "APPROVED",
      action: "Assigned Algo-Recovery Pod Gamma (Strategic Content rewrite complete)",
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      {/* Header banner */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-outfit font-extrabold text-3xl text-white flex items-center gap-2">
            <ShieldCheck className="h-7 w-7 text-escrow-emerald" />
            SEO Algorithmic Insurance
          </h1>
          <p className="text-muted-foreground text-xs mt-1">
            Algorithmic volatility protection. Continuous traffic tracking and zero-cost recovery pod allocation.
          </p>
        </div>
        <Badge variant="success" className="gap-1.5 px-3 py-1">
          <Activity className="h-3.5 w-3.5 animate-pulse" /> Live Policy Active
        </Badge>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="glass-panel border-white/5">
          <CardContent className="p-6 space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Quarterly Premium</span>
            <p className="text-xl font-extrabold text-white">$250.00</p>
            <span className="text-[10px] text-muted-foreground">Billed quarterly automatically</span>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/5">
          <CardContent className="p-6 space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Coverage Limit</span>
            <p className="text-xl font-extrabold text-white">$10,000.00</p>
            <span className="text-[10px] text-muted-foreground">Max allocated recovery services value</span>
          </CardContent>
        </Card>

        <Card className="glass-panel border-white/5">
          <CardContent className="p-6 space-y-1">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Policy Start Date</span>
            <p className="text-xl font-extrabold text-white">Jan 01, 2026</p>
            <span className="text-[10px] text-muted-foreground">Expires: Dec 31, 2026</span>
          </CardContent>
        </Card>
      </div>

      {/* Insurance Claims logs */}
      <Card className="glass-panel border-white/5">
        <CardHeader>
          <CardTitle className="text-white font-outfit">Claims & Auto-Recovery History</CardTitle>
        </CardHeader>
        <CardContent>
          {claims.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted-foreground italic">No claims filed yet.</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Date</TableHead>
                  <TableHead>Trigger Reason</TableHead>
                  <TableHead>Scanned Metric</TableHead>
                  <TableHead>Claim Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {claims.map((claim) => (
                  <React.Fragment key={claim.id}>
                    <TableRow className="border-b-0">
                      <TableCell className="font-semibold text-white">{claim.date}</TableCell>
                      <TableCell className="text-white font-medium">{claim.reason}</TableCell>
                      <TableCell className="text-red-400">{claim.metric}</TableCell>
                      <TableCell>
                        <Badge variant="success">{claim.status}</Badge>
                      </TableCell>
                    </TableRow>
                    <TableRow className="hover:bg-transparent">
                      <TableCell colSpan={4} className="bg-white/[0.01] p-4 text-[11px] text-muted-foreground border-b">
                        <strong>Auto-Recovery Action:</strong> {claim.action}
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Policy details text */}
      <Card className="glass-panel border-white/5 p-6 space-y-4">
        <h3 className="text-lg font-bold font-outfit text-white">How SEO Insurance Works</h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Google frequently rolls out major algorithmic core updates that can cause organic search traffic dips. SitePilot continually scans your Google Search Console integration data. If a rolling 14-day click rate drops by more than 15% immediately following a confirmed Google algorithm update, SitePilot registers a claim automatically. 
          Upon approval, an expert recovery pod is assigned at no extra charge to audit redirect maps, re-evaluate topical clusters, rewrite thin posts, and clean links profile until traffic recovers or the coverage limit is exhausted.
        </p>
      </Card>
    </div>
  );
}
