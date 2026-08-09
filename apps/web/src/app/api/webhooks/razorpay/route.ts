import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@repo/db";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  try {
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAYX_WEBHOOK_SECRET || "mock_secret")
      .update(body)
      .digest("hex");

    // Secure validation (skip if keys not loaded in sandbox)
    if (process.env.RAZORPAYX_WEBHOOK_SECRET && signature !== expectedSignature) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(body);
    const event = payload.event;
    console.log(`[RazorpayX Webhook] Received: ${event}`);

    // Payout captured / transferred escrow releases
    if (event === "payout.processed") {
      const payout = payload.payload.payout.entity;
      const notes = payout.notes;

      if (notes && notes.milestoneId) {
        await prisma.milestone.update({
          where: { id: notes.milestoneId },
          data: {
            status: "ESCROW_RELEASED",
            escrowTxId: payout.id,
            releasedAt: new Date(),
          },
        });
        console.log(`[RazorpayX Webhook] Payout processed for milestone: ${notes.milestoneId}`);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("RazorpayX Webhook error:", error);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}
