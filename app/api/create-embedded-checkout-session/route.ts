import { NextResponse } from "next/server";
import Stripe from "stripe";

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
    "http://localhost:3000"
  );
}

export async function POST() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!secretKey || !priceId) {
    return NextResponse.json(
      { error: "Embedded checkout is not configured yet. Add STRIPE_SECRET_KEY and STRIPE_PRICE_ID in Vercel." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2025-02-24.acacia" });
  const siteUrl = getSiteUrl().replace(/\/$/, "");

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    return_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    metadata: {
      product: "personal-profile-posting-automation-kit",
    },
  });

  if (!session.client_secret) {
    return NextResponse.json({ error: "Stripe did not return an embedded checkout client secret." }, { status: 500 });
  }

  return NextResponse.json({ clientSecret: session.client_secret });
}
