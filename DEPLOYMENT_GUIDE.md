# Deployment Guide: SEO Outcome Platform

This guide outlines the production deployment steps for the SitePilot Monorepo across Vercel, Supabase, Clerk, RazorpayX, Stripe, and GitHub Actions.

---

## 1. Database Setup (Supabase)
1. **Initialize Database**: Create a new database project in your Supabase dashboard.
2. **Apply Schema**: Run Prisma push or paste the schema inside the SQL Editor:
   ```bash
   pnpm run db:push
   ```
3. **Realtime Settings**: Enable Realtime on the `keywords`, `content_items`, and `backlinks` tables in your Supabase database configurations to allow instant updates.
4. **Enable RLS (Row Level Security)**: Run appropriate policies to secure organization tables:
   ```sql
   ALTER TABLE users ENABLE ROW LEVEL SECURITY;
   CREATE POLICY org_isolation ON users FOR ALL TO authenticated USING (organization_id = auth.jwt() ->> 'org_id');
   ```

---

## 2. Authentication Setup (Clerk B2B)
1. **Create Clerk Application**: Enable "Organizations" in the Clerk dashboard.
2. **Setup Callbacks**:
   - Authorized Redirect URI: `https://your-domain.com/dashboard`
   - Sign-in URL: `/sign-in`
3. **Configure Webhooks**: Create a Clerk Webhook pointing to `https://your-domain.com/api/webhooks/clerk` with events:
   - `user.created`
   - `organization.created`

---

## 3. Escrow Payments Setup
### Stripe Connect (Global)
1. Create a Stripe account and navigate to Connect.
2. Configure a Connect Webhook pointing to `https://your-domain.com/api/webhooks/stripe` listening to `checkout.session.completed` events.

### RazorpayX (India)
1. Create a RazorpayX account, copy your API key and secret.
2. Setup a Payout Webhook pointing to `https://your-domain.com/api/webhooks/razorpay` listening to `payout.processed` events.

---

## 4. Vercel Web Deployment
1. Create a new project in Vercel, referencing the Turborepo repository.
2. Configure Environment Variables in the project settings (refer to `.env.example`).
3. Set the Root Directory to `apps/web`.
4. Deploy the main branch.

---

## 5. GitHub Actions Secrets
Set the following secrets in your GitHub repository settings under `Settings > Secrets and Variables > Actions`:
- `DATABASE_URL`: Production Prisma database connection string.
- `OPENAI_API_KEY`: GPT-4o-mini generation credentials.
- `NOTION_API_KEY`: Notion Workspace connection token.
- `DATAFORSEO_LOGIN` & `DATAFORSEO_PASSWORD`: SEO API credits login.
- `GOOGLE_SERVICE_ACCOUNT_EMAIL` & `GOOGLE_PRIVATE_KEY`: Google credentials.
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`: Automated deployment secrets.
