import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "mock_key", {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  try {
    let event: Stripe.Event;

    if (process.env.STRIPE_SECRET_KEY) {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ""
      );
    } else {
      // Sandbox / mock mode
      const rawEvent = JSON.parse(body);
      event = rawEvent as Stripe.Event;
    }

    console.log(`[Stripe Webhook] Received event: ${event.type}`);

    // Handle connect or checkout events
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const metadata = session.metadata;
      
      if (metadata && metadata.milestoneId) {
        // Update milestone status to PAID in escrow
        await prisma.milestone.update({
          where: { id: metadata.milestoneId },
          data: {
            status: "PAID",
            escrowTxId: session.payment_intent as string,
          },
        });
        console.log(`[Stripe Webhook] Escrow funded for milestone: ${metadata.milestoneId}`);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Stripe Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
