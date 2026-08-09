import { prisma } from "../index";

export async function getKeywordsByProject(projectId: string) {
  return prisma.keyword.findMany({
    where: { projectId },
    orderBy: { text: "asc" },
  });
}

export async function upsertKeyword(projectId: string, text: string, searchVolume = 0, difficulty = 0) {
  return prisma.keyword.upsert({
    where: {
      projectId_text: {
        projectId,
        text,
      },
    },
    update: {
      searchVolume,
      difficulty,
      lastSync: new Date(),
    },
    create: {
      projectId,
      text,
      searchVolume,
      difficulty,
      lastSync: new Date(),
    },
  });
}

export async function updateKeywordRank(keywordId: string, rank: number | null) {
  const keyword = await prisma.keyword.findUnique({
    where: { id: keywordId },
  });

  if (!keyword) return null;

  // Append to rankHistory: [{date: "2026-08-08", rank: 12}]
  const history = Array.isArray(keyword.rankHistory)
    ? (keyword.rankHistory as any[])
    : [];
  
  history.push({
    date: new Date().toISOString().split("T")[0],
    rank,
  });

  // Limit history length to last 60 entries
  if (history.length > 60) {
    history.shift();
  }

  return prisma.keyword.update({
    where: { id: keywordId },
    data: {
      currentRank: rank,
      rankHistory: history,
      lastSync: new Date(),
    },
  });
}
