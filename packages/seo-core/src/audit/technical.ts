export interface CrawlPage {
  url: string;
  statusCode: number;
  loadingTimeMs: number;
  hasSchema: boolean;
  metaTitleLength: number;
  metaDescLength: number;
}

export function analyzeCrawl(pages: CrawlPage[]) {
  if (!pages || pages.length === 0) {
    return {
      technicalScore: 100,
      indexationRate: 100,
      errorsCount: 0,
      schemaCoverage: 100,
      averageLoadingTimeMs: 0,
    };
  }

  let errors = 0;
  let hasSchemaCount = 0;
  let slowPages = 0;
  let totalTime = 0;

  pages.forEach((page) => {
    totalTime += page.loadingTimeMs;

    if (page.statusCode >= 400) {
      errors++;
    }
    if (page.hasSchema) {
      hasSchemaCount++;
    }
    if (page.loadingTimeMs > 2500) {
      // Pages loading in > 2.5s are slow (LCP warning)
      slowPages++;
    }
  });

  const avgLoadingTime = totalTime / pages.length;
  const indexationRate = Math.round(((pages.length - errors) / pages.length) * 100);
  const schemaCoverage = Math.round((hasSchemaCount / pages.length) * 100);

  // Compute a technical score out of 100
  let score = 100;
  score -= (errors / pages.length) * 50;
  score -= (slowPages / pages.length) * 30;
  if (schemaCoverage < 50) score -= 10;
  score = Math.max(0, Math.round(score));

  return {
    technicalScore: score,
    indexationRate,
    errorsCount: errors,
    schemaCoverage,
    averageLoadingTimeMs: Math.round(avgLoadingTime),
  };
}
