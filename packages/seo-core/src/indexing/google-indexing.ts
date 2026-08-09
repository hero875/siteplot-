import { google } from "googleapis";

export class GoogleIndexingClient {
  private auth;

  constructor() {
    const clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (!clientEmail || !privateKey) {
      console.warn("Google credentials missing, Indexing API will run in mock mode.");
      this.auth = null;
    } else {
      this.auth = new google.auth.JWT(
        clientEmail,
        undefined,
        privateKey,
        ["https://www.googleapis.com/auth/indexing"]
      );
    }
  }

  async publishUrl(url: string, type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED") {
    if (!this.auth) {
      console.log(`[MOCK INDEXING API] Submitted index request for URL: ${url} (${type})`);
      return { urlNotificationMetadata: { latestUpdate: { url, type, notifyTime: new Date().toISOString() } } };
    }

    try {
      const indexing = google.indexing({ version: "v3", auth: this.auth });
      const response = await indexing.urlNotifications.publish({
        requestBody: {
          url,
          type,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Google Indexing API error:", error);
      throw error;
    }
  }

  async getUrlStatus(url: string) {
    if (!this.auth) {
      return { latestUpdate: { url, type: "URL_UPDATED", notifyTime: new Date().toISOString() } };
    }

    try {
      const indexing = google.indexing({ version: "v3", auth: this.auth });
      const response = await indexing.urlNotifications.getMetadata({
        url,
      });
      return response.data;
    } catch (error) {
      console.error("Google Indexing GET Metadata error:", error);
      throw error;
    }
  }
}
