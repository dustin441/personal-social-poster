"use client";

import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export function EmbeddedCheckoutBox() {
  const fetchClientSecret = async () => {
    const response = await fetch("/api/create-embedded-checkout-session", { method: "POST" });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Unable to start checkout.");
    }

    return data.clientSecret as string;
  };

  if (!stripePromise) {
    return (
      <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-red-900">
        <h2 className="text-xl font-black">Stripe publishable key is missing</h2>
        <p className="mt-2 leading-7">
          Add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in Vercel to enable embedded checkout.
        </p>
      </div>
    );
  }

  return (
    <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
      <div className="overflow-hidden rounded-3xl border border-line bg-white p-2 shadow-soft">
        <EmbeddedCheckout />
      </div>
    </EmbeddedCheckoutProvider>
  );
}
