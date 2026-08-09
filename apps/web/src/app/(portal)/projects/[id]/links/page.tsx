import React from "react";
import { Card, CardHeader, CardTitle, CardContent, Table, TableHeader, TableBody, TableRow, TableHead, TableCell, Badge } from "@repo/ui";
import { Link2, ShieldCheck, Globe } from "lucide-react";

export default function BacklinksPage({ params }: { params: { id: string } }) {
  const { id } = params;

  const links = [
    {
      source: "dentalhealthmag.com/implant-pains-solutions",
      anchor: "sitepilot dentist blueprint",
      target: "/blog/dental-schema",
      dr: 58,
      status: "LIVE",
    },
    {
      source: "healthcareinsights.org/orthodontist-costs-comparison",
      anchor: "dental implants cost details",
      target: "/blog/orthodontic-implants-cost",
      dr: 64,
      status: "LIVE",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-outfit text-white">Acquired Backlink Network</h2>
        <p className="text-xs text-muted-foreground mt-1">
          High-authority links built directly into campaign landing pages to boost search page trust indices.
        </p>
      </div>

      <Card className="glass-panel border-white/5">
        <CardHeader>
          <CardTitle className="text-white font-outfit flex items-center gap-2">
            <Link2 className="h-5 w-5 text-primary" />
            Live Links Wall
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source URL</TableHead>
                <TableHead>Anchor Text</TableHead>
                <TableHead>Target Page</TableHead>
                <TableHead>Domain Rating (DR)</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {links.map((link, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium text-white flex items-center gap-2 max-w-[280px] truncate">
                    <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                    <span>{link.source}</span>
                  </TableCell>
                  <TableCell>&ldquo;{link.anchor}&rdquo;</TableCell>
                  <TableCell className="text-primary truncate max-w-[150px]">{link.target}</TableCell>
                  <TableCell className="font-extrabold text-white">DR {link.dr}</TableCell>
                  <TableCell>
                    <Badge variant="success" className="gap-1">
                      <ShieldCheck className="h-3 w-3" /> {link.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
