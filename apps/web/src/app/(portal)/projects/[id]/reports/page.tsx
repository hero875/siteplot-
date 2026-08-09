import React from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@repo/ui";
import { FileText, Download, Calendar, Mail } from "lucide-react";

export default function ReportsPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const reports = [
    {
      title: "July 2026 Monthly Campaign Summary",
      type: "Monthly",
      date: "Aug 01, 2026",
      desc: "Comprehensive review of keyword rankings improvements, live backlinks placed, and escrow milestone release checks.",
    },
    {
      title: "Weekly Rankings Scan - Week 31",
      type: "Weekly",
      date: "Aug 07, 2026",
      desc: "Weekly ranking fluctuations scan details for the local Map Pack dental keywords list.",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-outfit text-white">Campaign Audit Reports</h2>
        <p className="text-xs text-muted-foreground mt-1">
          Auto-generated weekly & monthly summaries of crawl logs, keyword trends, and deliverables.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, idx) => (
          <Card key={idx} className="glass-panel border-white/5 flex flex-col justify-between">
            <CardHeader className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase font-bold text-primary tracking-wider">{report.type} Report</span>
                <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" /> {report.date}
                </span>
              </div>
              <CardTitle className="text-lg text-white font-outfit">{report.title}</CardTitle>
              <p className="text-xs text-muted-foreground leading-relaxed">{report.desc}</p>
            </CardHeader>
            <CardContent className="flex gap-2 border-t border-white/5 pt-4 mt-4">
              <Button size="sm" variant="outline" className="flex-1 gap-1 text-xs">
                <Download className="h-4 w-4" /> Download PDF
              </Button>
              <Button size="sm" variant="ghost" className="gap-1 text-xs text-muted-foreground hover:text-white">
                <Mail className="h-4 w-4" /> Email Team
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
