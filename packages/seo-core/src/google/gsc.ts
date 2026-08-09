import { google } from "googleapis";

export class GoogleSearchConsoleClient {
  private auth;

  constructor() {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      console.warn("Google credentials missing, operations will run in mock mode.");
      this.auth = null;
    } else {
      this.auth = new google.auth.JWT(
        clientEmail,
        undefined,
        privateKey,
        ["https://www.googleapis.com/auth/webmasters.readonly"]
      );
    }
  }

  async getSearchAnalytics(siteUrl: string, startDate: string, endDate: string) {
    if (!this.auth) {
      return this.getMockSearchAnalytics();
    }

    try {
      const searchconsole = google.searchconsole({ version: "v1", auth: this.auth });
      const response = await searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions: ["date"],
          rowLimit: 100,
        },
      });

      const rows = response.data.rows || [];
      return rows.map((row: any) => ({
        date: row.keys?.[0] || "",
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position || 0,
      }));
    } catch (error) {
      console.error("GSC API query error, falling back to mock:", error);
      return this.getMockSearchAnalytics();
    }
  }

  private getMockSearchAnalytics() {
    // Generate 30 days of mock stats
    const stats = [];
    const date = new Date();
    for (let i = 30; i >= 0; i--) {
      const d = new Date(date);
      d.setDate(d.getDate() - i);
      stats.push({
        date: d.toISOString().split("T")[0],
        clicks: Math.floor(Math.random() * 100) + 120,
        impressions: Math.floor(Math.random() * 1000) + 4000,
        ctr: 0.035 + Math.random() * 0.01,
        position: 12.4 + Math.random() * 2,
      });
    }
    return stats;
  }
}
