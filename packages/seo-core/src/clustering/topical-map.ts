export interface KeywordData {
  text: string;
  searchVolume: number;
  difficulty: number;
}

export interface TopicalCluster {
  pillar: string;
  intent: "COMMERCIAL" | "INFORMATIONAL" | "TRANSACTIONAL" | "NAVIGATIONAL";
  keywords: KeywordData[];
  supportingKeywords: KeywordData[];
  estimatedDifficulty: number;
  totalVolume: number;
}

export function buildTopicalMap(keywords: KeywordData[]): TopicalCluster[] {
  if (!keywords || keywords.length === 0) return [];

  const clusters: { [key: string]: KeywordData[] } = {};

  // Simple keyword matching semantic clustering algorithm
  keywords.forEach((keyword) => {
    const words = keyword.text.toLowerCase().split(/\s+/);
    // Find a common core topic word (longer than 3 chars and not stopword)
    const stopWords = ["best", "how", "to", "for", "with", "the", "in", "pricing", "alternative"];
    const coreWord = words.find((w) => w.length > 3 && !stopWords.includes(w)) || words[0];

    if (!clusters[coreWord]) {
      clusters[coreWord] = [];
    }
    clusters[coreWord].push(keyword);
  });

  return Object.entries(clusters).map(([pillarWord, clusterKeywords]) => {
    // Sort keywords by search volume
    const sorted = [...clusterKeywords].sort((a, b) => b.searchVolume - a.searchVolume);
    const mainPillar = sorted[0]?.text || pillarWord;
    const totalVolume = sorted.reduce((acc, curr) => acc + curr.searchVolume, 0);
    const avgDifficulty = Math.round(
      sorted.reduce((acc, curr) => acc + curr.difficulty, 0) / sorted.length
    );

    // Guess search intent based on words
    let intent: TopicalCluster["intent"] = "INFORMATIONAL";
    const lowercasePillar = mainPillar.toLowerCase();
    if (lowercasePillar.includes("pricing") || lowercasePillar.includes("cost") || lowercasePillar.includes("buy")) {
      intent = "TRANSACTIONAL";
    } else if (lowercasePillar.includes("best") || lowercasePillar.includes("review") || lowercasePillar.includes("vs")) {
      intent = "COMMERCIAL";
    }

    return {
      pillar: mainPillar,
      intent,
      keywords: sorted.slice(0, 1),
      supportingKeywords: sorted.slice(1),
      estimatedDifficulty: avgDifficulty,
      totalVolume,
    };
  });
}
