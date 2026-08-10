import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { Button } from "@repo/ui";
import { LayoutDashboard, FolderKanban, ShieldCheck, Settings, BookOpen, Layers } from "lucide-react";
import { prisma } from "@repo/db";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId, orgId, orgSlug } = auth();

  // Enforce authentication
  if (!userId) {
    redirect("/sign-in");
  }

  // Auto-register Organization in Supabase
  if (orgId) {
    await prisma.organization.upsert({
      where: { clerkOrgId: orgId },
      update: {},
      create: {
        clerkOrgId: orgId,
        name: orgSlug ? orgSlug.toUpperCase() : "My Organization",
        slug: orgSlug || `org-${orgId.toLowerCase().substring(0, 8)}`,
      },
    });
  }

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 border-r border-white/5 bg-card flex flex-col justify-between shrink-0">
        <div className="p-6 space-y-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-tr from-primary to-secondary flex items-center justify-center font-bold text-white shadow-lg shadow-primary/20">
              S
            </div>
            <span className="font-outfit font-extrabold tracking-tight text-lg text-white">
              SITE<span className="text-primary">PILOT</span>
            </span>
          </Link>

          <nav className="flex flex-col gap-1 text-sm font-medium">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-all"
            >
              <LayoutDashboard className="h-4 w-4" />
              <span>Overview Dashboard</span>
            </Link>
            <Link
              href="/projects"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-all"
            >
              <FolderKanban className="h-4 w-4" />
              <span>Projects</span>
            </Link>
            <Link
              href="/settings/insurance"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-all"
            >
              <ShieldCheck className="h-4 w-4" />
              <span>SEO Insurance</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-white transition-all"
            >
              <Settings className="h-4 w-4" />
              <span>Integrations & settings</span>
            </Link>
          </nav>
        </div>

        {/* User context footer */}
        <div className="p-6 border-t border-white/5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-semibold uppercase">Organization</span>
            <OrganizationSwitcher
              afterCreateOrganizationUrl="/dashboard"
              afterLeaveOrganizationUrl="/dashboard"
              afterSwitchOrganizationUrl="/dashboard"
              appearance={{
                elements: {
                  rootBox: "w-36",
                  organizationSwitcherTrigger: "text-xs text-white",
                },
              }}
            />
          </div>
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <UserButton afterSignOutUrl="/" />
              <span className="text-xs font-semibold text-white">My Profile</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Subheader banner */}
        {!orgId && (
          <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-500 text-xs px-6 py-3 flex items-center justify-between">
            <span>Warning: You must select or create a B2B Organization to view live delivery analytics.</span>
            <OrganizationSwitcher />
          </div>
        )}
        <main className="flex-1 overflow-y-auto bg-black/40 relative">
          {children}
        </main>
      </div>
    </div>
  );
}
