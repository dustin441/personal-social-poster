"use client";

import { useState } from "react";

type CheckoutButtonProps = {
  children: React.ReactNode;
  className?: string;
};

export function CheckoutButton({ children, className }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      const data = (await response.json()) as { url?: string; error?: string };

      if (!response.ok || !data.url) {
        throw new Error(data.error || "Could not start checkout.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not start checkout.");
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-start gap-3">
      <button
        onClick={startCheckout}
        disabled={loading}
        className={className ?? "rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"}
      >
        {loading ? "Opening checkout..." : children}
      </button>
      {error ? <p className="max-w-md text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
