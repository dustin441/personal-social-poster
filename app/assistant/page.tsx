import Link from "next/link";
import Stripe from "stripe";
import SetupAssistantChat from "@/components/SetupAssistantChat";

async function getSession(sessionId: string | undefined) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY || !sessionId.startsWith("cs_")) {
    return null;
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" });
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}

export default async function AssistantPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const params = await searchParams;
  const session = await getSession(params.session_id);
  const isPaid = session?.payment_status === "paid";

  if (!isPaid || !params.session_id) {
    return (
      <main className="min-h-screen bg-smoke px-6 py-12 text-ink">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-line bg-white p-8 shadow-soft md:p-12">
          <div className="mb-6 inline-flex rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700">
            Buyer access only
          </div>
          <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">Setup Assistant access requires a completed purchase.</h1>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Use the Setup Assistant link from your ProfilePilot Kit thank-you page. That link includes your verified checkout session so we can keep the assistant gated for buyers.
          </p>
          <Link href="/checkout" className="mt-8 inline-flex rounded-full bg-ink px-7 py-4 text-base font-bold text-white shadow-soft">
            Go to checkout
          </Link>
        </div>
      </main>
    );
  }

  const assistantHref = `/assistant?session_id=${encodeURIComponent(params.session_id)}`;
  const downloadHref = `/api/download?session_id=${encodeURIComponent(params.session_id)}`;
  const n8nUrl = process.env.NEXT_PUBLIC_N8N_AFFILIATE_URL || "https://n8n.io";
  const firecrawlUrl = process.env.NEXT_PUBLIC_FIRECRAWL_AFFILIATE_URL || "https://www.firecrawl.dev";

  return (
    <main className="min-h-screen bg-smoke px-6 py-12 text-ink">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="mb-4 inline-flex rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700">
              Buyer setup workspace
            </div>
            <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">ProfilePilot Setup Assistant</h1>
            <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
              Ask questions about the ZIP, n8n, Google Sheets, scraping a website URL, local browser posting, dry-run tests, or troubleshooting. The assistant keeps the setup step-by-step and safety-first.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={downloadHref} className="rounded-full bg-ink px-6 py-3 text-sm font-black text-white shadow-soft transition hover:bg-brand-700">
              Download ZIP
            </a>
            <a href={assistantHref} className="rounded-full border border-line bg-white px-6 py-3 text-sm font-black text-ink transition hover:border-brand-100 hover:bg-brand-50">
              Save assistant link
            </a>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1fr_0.42fr]">
          <SetupAssistantChat sessionId={params.session_id} />

          <aside className="space-y-4">
            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black">Best first prompt</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                “I downloaded and unzipped ProfilePilot Kit. Help me open the folder in my AI coding agent, read START-HERE.md, and walk through setup one step at a time.”
              </p>
            </div>

            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black">Scrape a website URL</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
                <li>Add the page URL to `source_url` or `scrape_url`.</li>
                <li>Use n8n to fetch it with HTTP Request or Firecrawl.</li>
                <li>Turn the scraped content into draft post text.</li>
                <li>Write it to the Sheet as draft or needs_review.</li>
                <li>Approve manually before posting locally.</li>
              </ol>
            </div>

            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black">Helpful accounts</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                You may need n8n for workflow automation and Firecrawl if you want cleaner website scraping. Use your own accounts and keep API keys private.
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <a href={n8nUrl} target="_blank" rel="noreferrer" className="rounded-full border border-line px-4 py-2 text-center text-sm font-black hover:bg-smoke">
                  n8n account
                </a>
                <a href={firecrawlUrl} target="_blank" rel="noreferrer" className="rounded-full border border-line px-4 py-2 text-center text-sm font-black hover:bg-smoke">
                  Firecrawl account
                </a>
              </div>
            </div>

            <div className="rounded-[2rem] border border-line bg-white p-6 shadow-sm">
              <h2 className="text-xl font-black">Safety boundaries</h2>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                Stop on login, 2FA, checkpoint, suspicious-activity, or account-security screens. Do not share credentials in chat. Do not publish a real post until dry-run tests pass and you approve it.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
