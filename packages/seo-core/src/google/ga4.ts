import { google } from "googleapis";

export class GoogleAnalyticsClient {
  private auth;

  constructor() {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      console.warn("Google credentials missing, GA4 operations will run in mock mode.");
      this.auth = null;
    } else {
      this.auth = new google.auth.JWT(
        clientEmail,
        undefined,
        privateKey,
        ["https://www.googleapis.com/auth/analytics.readonly"]
      );
    }
  }

  async getTrafficReport(propertyId: string, startDate: string, endDate: string) {
    if (!this.auth) {
      return this.getMockTrafficReport();
    }

    try {
      const analyticsdata = google.analyticsdata({ version: "v1beta", auth: this.auth });
      const response = await analyticsdata.properties.runReport({
        property: `properties/${propertyId}`,
        requestBody: {
          dateRanges: [{ startDate, endDate }],
          dimensions: [{ name: "date" }],
          metrics: [
            { name: "activeUsers" },
            { name: "sessions" },
            { name: "conversions" },
          ],
        },
      });

      const rows = response.data.rows || [];
      return rows.map((row: any) => ({
        date: row.dimensionValues?.[0]?.value || "",
        users: parseInt(row.metricValues?.[0]?.value || "0", 10),
        sessions: parseInt(row.metricValues?.[1]?.value || "0", 10),
        conversions: parseInt(row.metricValues?.[2]?.value || "0", 10),
      })).sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      console.error("GA4 API report error, falling back to mock:", error);
      return this.getMockTrafficReport();
    }
  }

  private getMockTrafficReport() {
    const report = [];
    const date = new Date();
    for (let i = 30; i >= 0; i--) {
      const d = new Date(date);
      d.setDate(d.getDate() - i);
      const activeUsers = Math.floor(Math.random() * 200) + 800;
      report.push({
        date: d.toISOString().split("T")[0].replace(/-/g, ""),
        users: activeUsers,
        sessions: Math.floor(activeUsers * 1.2),
        conversions: Math.floor(activeUsers * 0.02),
      });
    }
    return report;
  }
}
