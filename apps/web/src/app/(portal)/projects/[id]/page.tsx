import React from "react";
import { Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from "@repo/ui";
import { ShieldCheck, Calendar, Users, Target } from "lucide-react";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const keywords = [
    { text: "best dental implants downtown", volume: 450, difficulty: 58, rank: 4 },
    { text: "cosmetic dentist office review", volume: 3200, difficulty: 60, rank: 9 },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Campaign Details Column */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="glass-panel border-white/5 p-6 space-y-4">
          <h2 className="text-xl font-bold font-outfit text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Campaign Strategy Outline
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            This campaign targets cosmetic and high-intent dental search queries. We have structured location pages and customized dental schemas to boost Google Maps visibility, targeting a top 3 map pack placement inside 6 months.
          </p>
        </Card>

        {/* Target Keywords Table */}
        <Card className="glass-panel border-white/5">
          <CardHeader>
            <CardTitle className="text-white font-outfit">Campaign Target Keywords</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Target Keyword</TableHead>
                  <TableHead>Search Volume</TableHead>
                  <TableHead>Keyword Difficulty</TableHead>
                  <TableHead>Current Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keywords.map((kw, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-semibold text-white">{kw.text}</TableCell>
                    <TableCell>{kw.volume}</TableCell>
                    <TableCell>{kw.difficulty}%</TableCell>
                    <TableCell>
                      <Badge variant={kw.rank <= 5 ? "success" : "info"}>
                        Rank {kw.rank}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Metadata sidebar */}
      <div className="space-y-6">
        <Card className="glass-panel border-white/5 p-6 space-y-4">
          <h3 className="text-lg font-bold font-outfit text-white">Campaign Details</h3>
          <div className="space-y-3 text-xs text-muted-foreground">
            <div className="flex justify-between items-center">
              <span>Timeline:</span>
              <span className="text-white font-medium flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" /> 6 Months Contract
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span>Total Budget:</span>
              <span className="text-white font-medium">$6,500 Escrowed</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Escrow Security:</span>
              <span className="text-escrow-emerald font-semibold flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5" /> RazorpayX Secured
              </span>
            </div>
          </div>
        </Card>

        <Card className="glass-panel border-white/5 p-6 space-y-4">
          <h3 className="text-lg font-bold font-outfit text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-secondary" />
            Assigned Delivery Pod
          </h3>
          <div className="space-y-3">
            {[
              { name: "Sarah K.", role: "Strategist", initial: "SK" },
              { name: "John D.", role: "Content Specialist", initial: "JD" },
              { name: "Michael C.", role: "Technical SEO", initial: "MC" },
              { name: "David L.", role: "Link Builder", initial: "DL" },
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
          </div>
        </Card>
      </div>
    </div>
  );
}
