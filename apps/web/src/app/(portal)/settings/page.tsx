import React from "react";
import { Card, CardHeader, CardTitle, CardContent, Button } from "@repo/ui";
import { CheckCircle2, AlertCircle, PlusCircle, Settings, Key, Globe } from "lucide-react";

export default function SettingsPage() {
  const integrations = [
    {
      name: "Google Search Console",
      status: "CONNECTED",
      desc: "Used for tracking organic clicks, keywords impressions, and landing page sessions count.",
      details: "Connected site: https://downtowndental.com",
    },
    {
      name: "Google Analytics (GA4)",
      status: "CONNECTED",
      desc: "Used to verify organic traffic conversion goals for performance payouts.",
      details: "Property ID: properties/4291804",
    },
    {
      name: "WordPress CMS Publishing",
      status: "DISCONNECTED",
      desc: "Permits AI Content Factory to publish verified, approved article drafts directly to your blog queue.",
      details: "Requires WP REST API Application Password.",
    },
  ];

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="font-outfit font-extrabold text-3xl text-white flex items-center gap-2">
          <Settings className="h-7 w-7 text-primary" />
          Settings & Integrations
        </h1>
        <p className="text-muted-foreground text-xs mt-1">
          Link external SEO databases and content managers to activate automated milestone release tracking.
        </p>
      </div>

      <div className="space-y-6">
        {integrations.map((item, idx) => (
          <Card key={idx} className="glass-panel border-white/5">
            <CardContent className="p-6 flex flex-col sm:flex-row justify-between gap-6">
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{item.name}</h3>
                  {item.status === "CONNECTED" ? (
                    <span className="text-[10px] text-escrow-emerald bg-escrow-emerald/5 border border-escrow-emerald/20 px-2 py-0.5 rounded font-bold">
                      Connected
                    </span>
                  ) : (
                    <span className="text-[10px] text-zinc-500 bg-zinc-500/5 border border-zinc-500/20 px-2 py-0.5 rounded font-bold">
                      Disconnected
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                <div className="flex items-center gap-1.5 text-xs text-white bg-white/[0.01] border border-white/5 p-2 rounded max-w-fit">
                  {item.status === "CONNECTED" ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-escrow-emerald" />
                  ) : (
                    <AlertCircle className="h-3.5 w-3.5 text-zinc-500" />
                  )}
                  <span>{item.details}</span>
                </div>
              </div>

              <div className="sm:min-w-[150px] flex flex-col justify-center">
                {item.status === "CONNECTED" ? (
                  <Button size="sm" variant="outline" className="text-xs hover:text-red-400">
                    Disconnect API
                  </Button>
                ) : (
                  <Button size="sm" variant="default" className="text-xs gap-1">
                    <PlusCircle className="h-3.5 w-3.5" /> Configure API
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
