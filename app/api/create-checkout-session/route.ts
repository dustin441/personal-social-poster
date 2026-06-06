import { NextResponse } from "next/server";
import Stripe from "stripe";

function getSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    try {
      const url = new URL(configuredUrl);
      const host = url.host.toLowerCase();

      if (url.protocol === "https:" && !host.endsWith(".vercel.app") && !host.includes("localhost")) {
        return url.origin;
      }
    } catch {
      // Ignore malformed values and fall back below.
    }
  }

  if (process.env.NODE_ENV === "development") {
    return configuredUrl || "http://localhost:3000";
  }

  return "https://www.profilepilotkit.com";
}

export async function POST() {
  if (process.env.STRIPE_PAYMENT_LINK_URL) {
    return NextResponse.json({ url: process.env.STRIPE_PAYMENT_LINK_URL });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  const priceId = process.env.STRIPE_PRICE_ID;

  if (!secretKey || !priceId) {
    return NextResponse.json(
      { error: "Stripe is not configured yet. Add STRIPE_SECRET_KEY and STRIPE_PRICE_ID in Vercel, or set STRIPE_PAYMENT_LINK_URL." },
      { status: 500 }
    );
  }

  const stripe = new Stripe(secretKey, { apiVersion: "2025-02-24.acacia" });
  const siteUrl = getSiteUrl().replace(/\/$/, "");

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: priceId, quantity: 1 }],
    allow_promotion_codes: true,
    billing_address_collection: "auto",
    customer_creation: "if_required",
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/?checkout=cancelled`,
    metadata: {
      product: "profilepilot-kit",
    },
  });

  if (!session.url) {
    return NextResponse.json({ error: "Stripe did not return a checkout URL." }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}
