import React from "react";
import Link from "next/link";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@repo/ui";
import { ShieldCheck, Cpu, Play } from "lucide-react";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Premium Navbar */}
      <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/5 py-4">
        <div className="container max-w-6xl mx-auto flex items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
              S
            </div>
            <span className="font-outfit font-extrabold tracking-tight text-lg text-white">
              SITE<span className="text-primary">PILOT</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
            <Link href="/playbooks" className="hover:text-white transition-colors">
              Playbooks
            </Link>
            <Link href="/calculator" className="hover:text-white transition-colors">
              Escrow Calculator
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <SignedIn>
              <Link href="/dashboard">
                <Button variant="outline" size="sm">
                  Portal Dashboard
                </Button>
              </Link>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
              <Link href="/sign-in">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button variant="default" size="sm">
                  Get Started
                </Button>
              </Link>
            </SignedOut>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-black/60 py-12">
        <div className="container max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
                S
              </div>
              <span className="font-outfit font-extrabold tracking-tight text-lg text-white">
                SITE<span className="text-primary">PILOT</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Outcome-as-a-Service SEO platform. Pay only when verified rankings, traffic, and links hit targets.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li><Link href="/playbooks">Product Playbooks</Link></li>
              <li><Link href="/calculator">Escrow Calculator</Link></li>
              <li><Link href="/dashboard">Live Client Portal</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-xs text-muted-foreground">
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
              <li>SEO Insurance Coverage</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Security</h4>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-escrow-emerald" />
              <span>RazorpayX Escrow Protection</span>
            </div>
          </div>
        </div>
        <div className="container max-w-6xl mx-auto px-6 border-t border-white/5 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-muted-foreground">
          <span>&copy; {new Date().getFullYear()} SitePilot Technologies. All rights reserved.</span>
          <div className="flex items-center gap-2 mt-4 md:mt-0">
            <Cpu className="h-3.5 w-3.5 text-secondary" />
            <span>AI content factory verified</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
