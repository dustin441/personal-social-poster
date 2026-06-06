import { EmbeddedCheckoutBox } from "@/components/EmbeddedCheckoutBox";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-smoke px-6 py-10 text-ink">
      <div className="mx-auto max-w-5xl">
        <a href="/" className="text-sm font-bold text-brand-700">← Back to overview</a>
        <div className="mt-8 grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <section className="rounded-[2rem] border border-line bg-white p-7 shadow-soft">
            <div className="rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700 inline-flex">
              Secure checkout
            </div>
            <h1 className="mt-5 text-4xl font-black tracking-[-0.04em]">
              Personal Profile Posting Automation Kit
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Download the docs, prompts, n8n workflow, Google Sheet template, and local browser posting setup files.
            </p>
            <div className="mt-7 rounded-3xl bg-smoke p-5">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">Today</div>
              <div className="mt-2 text-5xl font-black tracking-[-0.06em]">$97</div>
              <ul className="mt-5 space-y-3 text-sm font-medium text-slate-700">
                <li>✓ AI-agent-ready setup walkthrough</li>
                <li>✓ Hermes/OpenClaw/Claude Code prompts</li>
                <li>✓ n8n + Google Sheet workflow</li>
                <li>✓ Local browser poster setup</li>
                <li>✓ Safety and troubleshooting docs</li>
              </ul>
            </div>
            <p className="mt-5 text-sm leading-6 text-slate-500">
              This is a DIY digital product. It requires a computer that can stay awake during posting windows.
            </p>
          </section>
          <EmbeddedCheckoutBox />
        </div>
      </div>
    </main>
  );
}
