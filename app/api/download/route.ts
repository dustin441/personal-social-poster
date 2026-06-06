import { NextRequest, NextResponse } from "next/server";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import Stripe from "stripe";

async function isPaidSession(sessionId: string) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    return false;
  }

  try {
    const stripe = new Stripe(secretKey, { apiVersion: "2025-02-24.acacia" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid";
  } catch {
    return false;
  }
}

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId || !(await isPaidSession(sessionId))) {
    return NextResponse.json({ error: "Payment verification required." }, { status: 403 });
  }

  if (process.env.KIT_DOWNLOAD_URL) {
    return NextResponse.redirect(process.env.KIT_DOWNLOAD_URL);
  }

  try {
    const file = await readFile(join(process.cwd(), "private", "profilepilot-kit.zip"));
    return new NextResponse(file, {
      headers: {
        "Content-Type": "application/zip",
        "Content-Disposition": 'attachment; filename="profilepilot-kit.zip"',
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json(
      { error: "The kit ZIP has not been connected yet. Set KIT_DOWNLOAD_URL in Vercel, or add private/profilepilot-kit.zip before launch." },
      { status: 404 }
    );
  }
}
