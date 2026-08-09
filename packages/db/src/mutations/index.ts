import { prisma } from "../index";
import { PlaybookType, ProjectStatus, MilestoneStatus, VerificationMethod, ContentStatus } from "@prisma/client";

export async function createUser(clerkId: string, email: string, name?: string, avatar?: string, role = "CLIENT") {
  return prisma.user.create({
    data: {
      clerkId,
      email,
      name,
      avatar,
      role,
    },
  });
}

export async function createOrganization(clerkOrgId: string, name: string, slug: string) {
  return prisma.organization.create({
    data: {
      clerkOrgId,
      name,
      slug,
    },
  });
}

export async function createProject(
  organizationId: string,
  name: string,
  playbookType: PlaybookType,
  niche: string,
  totalEscrowBudget: number
) {
  return prisma.$transaction(async (tx) => {
    // 1. Create project
    const project = await tx.project.create({
      data: {
        name,
        organizationId,
        playbookType,
        status: ProjectStatus.ONBOARDING,
        settings: { niche },
      },
    });

    // 2. Generate milestones based on playbook type
    const milestonesData = getMilestonesForPlaybook(playbookType, totalEscrowBudget);
    
    await tx.milestone.createMany({
      data: milestonesData.map((m) => ({
        projectId: project.id,
        title: m.title,
        description: m.description,
        targetValue: m.targetValue,
        verificationMethod: m.verificationMethod,
        escrowAmount: m.escrowAmount,
        status: MilestoneStatus.PENDING,
      })),
    });

    return project;
  });
}

export async function createContentItem(projectId: string, title: string, slug: string, keywordSeed?: string) {
  return prisma.contentItem.create({
    data: {
      projectId,
      title,
      slug,
      keywordSeed,
      status: ContentStatus.IDEA,
    },
  });
}

// Private helper to structure milestones based on productized playbooks
function getMilestonesForPlaybook(type: PlaybookType, budget: number) {
  switch (type) {
    case PlaybookType.LOCAL_DOMINATION:
      return [
        {
          title: "GBP & Local Schema Optimization",
          description: "Verify listing completion, review generation schema, and local page structure.",
          targetValue: "100% completed",
          verificationMethod: VerificationMethod.MANUAL_REVIEW,
          escrowAmount: budget * 0.20,
        },
        {
          title: "Top 3 Local Map Pack Rankings",
          description: "Rank target keywords inside the Google Map pack top 3 listings in target geo.",
          targetValue: "Top 3 Rank",
          verificationMethod: VerificationMethod.DATAFORSEO_RANK,
          escrowAmount: budget * 0.40,
        },
        {
          title: "30 Local Citation Link Building",
          description: "Build 30 verified local directory and listing profile links.",
          targetValue: "30 Links",
          verificationMethod: VerificationMethod.BACKLINK_COUNT,
          escrowAmount: budget * 0.40,
        },
      ];
    case PlaybookType.SAAS_AUTHORITY:
      return [
        {
          title: "Topical Map and Content Silos Blueprint",
          description: "Approval of semantic SEO outline and clusters for core SaaS categories.",
          targetValue: "Blueprint Approved",
          verificationMethod: VerificationMethod.MANUAL_REVIEW,
          escrowAmount: budget * 0.15,
        },
        {
          title: "15 Articles Published & Google Indexed",
          description: "Articles written, QA passed, pushed to CMS, and verified indexation status.",
          targetValue: "15 Indexed URLs",
          verificationMethod: VerificationMethod.INDEXATION_RATE,
          escrowAmount: budget * 0.45,
        },
        {
          title: "Monthly GSC Traffic Target",
          description: "Reach >1,500 monthly organic sessions on GSC searchanalytics dashboard.",
          targetValue: "1500 visits/mo",
          verificationMethod: VerificationMethod.GSC_TRAFFIC,
          escrowAmount: budget * 0.40,
        },
      ];
    case PlaybookType.ECOM_SCALE:
      return [
        {
          title: "Core Web Vitals & Technical Crawl Score Audit",
          description: "Optimize PageSpeed insights and CWV to reach craw score of 90+.",
          targetValue: "90+ Score",
          verificationMethod: VerificationMethod.INDEXATION_RATE,
          escrowAmount: budget * 0.20,
        },
        {
          title: "Category & Facet Nav Rank Boost",
          description: "Push target category page rankings into Google top 10 SERPs.",
          targetValue: "Top 10 Rank",
          verificationMethod: VerificationMethod.DATAFORSEO_RANK,
          escrowAmount: budget * 0.40,
        },
        {
          title: "DR 40+ Link Acquisition (20 Links)",
          description: "Secure 20 contextually relevant editorial links with Domain Rating > 40.",
          targetValue: "20 Links",
          verificationMethod: VerificationMethod.BACKLINK_COUNT,
          escrowAmount: budget * 0.40,
        },
      ];
    case PlaybookType.AFFILIATE_FLIP:
    default:
      return [
        {
          title: "Topical Pruning & E-E-A-T Content Review",
          description: "Perform massive site prune, content merge, and author bio trust integrations.",
          targetValue: "Audit complete",
          verificationMethod: VerificationMethod.MANUAL_REVIEW,
          escrowAmount: budget * 0.20,
        },
        {
          title: "Rank Recovery for Core Money Keywords",
          description: "Verify recovery of primary commercial keywords into top 8 positions.",
          targetValue: "Top 8 Rank",
          verificationMethod: VerificationMethod.DATAFORSEO_RANK,
          escrowAmount: budget * 0.40,
        },
        {
          title: "Monthly GSC Clicks Recovery Target",
          description: "Reach target threshold clicks rate on GSC analytics console.",
          targetValue: "3000 clicks/mo",
          verificationMethod: VerificationMethod.GSC_TRAFFIC,
          escrowAmount: budget * 0.40,
        },
      ];
  }
}
