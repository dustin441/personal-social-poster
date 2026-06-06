"use client";

import { useState } from "react";
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
const stripePromise = publishableKey ? loadStripe(publishableKey) : null;

export function EmbeddedCheckoutBox() {
  const [accepted, setAccepted] = useState(false);

  const fetchClientSecret = async () => {
    if (!accepted) {
      throw new Error("Terms must be accepted before checkout starts.");
    }

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
    <div className="space-y-4">
      <div className="rounded-3xl border border-amber-200 bg-amber-50 p-5 text-sm leading-6 text-amber-950">
        <p className="font-black">Required purchase acknowledgement</p>
        <label className="mt-3 flex cursor-pointer gap-3">
          <input
            type="checkbox"
            checked={accepted}
            onChange={(event) => setAccepted(event.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 rounded border-amber-400 accent-brand-600"
          />
          <span>
            I understand this is an immediately delivered DIY digital product. I understand all sales are final once access is
            granted, this is not a done-for-you setup service, I need a compatible always-on computer/browser session, and I agree
            to the <a href="/terms" target="_blank" className="font-black underline">Terms and refund policy</a>.
          </span>
        </label>
      </div>

      {accepted ? (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
          <div className="overflow-hidden rounded-3xl border border-line bg-white p-2 shadow-soft">
            <EmbeddedCheckout />
          </div>
        </EmbeddedCheckoutProvider>
      ) : (
        <div className="rounded-3xl border border-line bg-white p-8 text-center shadow-soft">
          <p className="text-lg font-black text-ink">Accept the purchase acknowledgement to open secure checkout.</p>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            This extra confirmation protects both sides by making the digital-delivery and refund terms clear before payment.
          </p>
        </div>
      )}
    </div>
  );
}
