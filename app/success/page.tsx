import Stripe from "stripe";

async function getSession(sessionId: string | undefined) {
  if (!sessionId || !process.env.STRIPE_SECRET_KEY) {
    return null;
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-02-24.acacia" });
    return await stripe.checkout.sessions.retrieve(sessionId);
  } catch {
    return null;
  }
}

export default async function SuccessPage({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const params = await searchParams;
  const session = await getSession(params.session_id);
  const isPaid = session?.payment_status === "paid";
  const downloadHref = params.session_id ? `/api/download?session_id=${encodeURIComponent(params.session_id)}` : "#";
  const assistantHref = params.session_id ? `/assistant?session_id=${encodeURIComponent(params.session_id)}` : "#";

  return (
    <main className="min-h-screen bg-smoke px-6 py-12 text-ink">
      <div className="mx-auto max-w-3xl rounded-[2rem] border border-line bg-white p-8 shadow-soft md:p-12">
        <div className="mb-6 inline-flex rounded-full bg-brand-50 px-4 py-2 text-sm font-bold text-brand-700">
          {isPaid ? "Payment complete" : "Almost there"}
        </div>
        <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
          {isPaid ? "Your kit is ready." : "We need to verify your payment."}
        </h1>
        {isPaid ? (
          <>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Download the ZIP, unzip it, then give the unzipped profilepilot-kit folder to Hermes, OpenClaw, Claude Code, Codex, or your preferred coding agent. Do not paste the whole ZIP into chat; open the folder in the agent and paste the install prompt.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={downloadHref}
                className="inline-flex rounded-full bg-ink px-7 py-4 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-700"
              >
                Download the kit ZIP
              </a>
              <a
                href={assistantHref}
                className="inline-flex rounded-full border border-brand-100 bg-brand-50 px-7 py-4 text-base font-bold text-brand-700 transition hover:-translate-y-0.5 hover:bg-white"
              >
                Open Setup Assistant
              </a>
            </div>
            <div className="mt-6 rounded-3xl border border-brand-100 bg-brand-50 p-6">
              <h2 className="text-xl font-black">Need help while installing?</h2>
              <p className="mt-3 leading-7 text-slate-700">
                Your purchase includes access to the ProfilePilot Setup Assistant. Ask it how to configure n8n, where to paste a website URL for scraping, how to use Firecrawl or HTTP Request, how to connect the Sheet, and how to run dry tests before any real post.
              </p>
            </div>
            <div className="mt-8 rounded-3xl border border-line bg-smoke p-6">
              <h2 className="text-xl font-black">Start here after download</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
                <li>Download profilepilot-kit.zip and unzip it.</li>
                <li>Open the unzipped profilepilot-kit folder in your AI coding agent or terminal.</li>
                <li>Tell the agent: “Read START-HERE.md first. Walk me through this setup one step at a time. Verify each step before continuing.”</li>
                <li>Paste the matching prompt from prompts/hermes-install-prompt.md, prompts/openclaw-install-prompt.md, or the closest prompt for your agent.</li>
                <li>Let the agent inspect the docs and files, then help you create the Sheet, configure n8n, configure the local poster, and run dry tests.</li>
                <li>Do not approve a real post until the testing checklist passes.</li>
              </ol>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-line bg-white p-6">
                <h2 className="text-xl font-black">What is inside the ZIP</h2>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                  <li>✓ START-HERE, requirements, architecture, safety, support, and troubleshooting docs</li>
                  <li>✓ Google Sheet approval queue template and sample rows</li>
                  <li>✓ n8n workflow folder for queue/draft automation and website URL scraping guidance</li>
                  <li>✓ Local Playwright poster folder with scripts and environment template</li>
                  <li>✓ AI-agent install prompts for guided setup</li>
                  <li>✓ Testing and go-live checklists</li>
                </ul>
              </div>
              <div className="rounded-3xl border border-line bg-white p-6">
                <h2 className="text-xl font-black">Install framework</h2>
                <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm leading-6 text-slate-700">
                  <li>Create or copy the Google Sheet queue.</li>
                  <li>Configure n8n or your content process to add draft rows.</li>
                  <li>Connect the local poster to the Sheet and browser profile.</li>
                  <li>Test config, browser login, dry-run posting, and status logging.</li>
                  <li>Start with a small posting schedule and monitor the first runs.</li>
                </ol>
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              If you just paid, refresh this page in a few seconds. If you reached this page directly, go back and complete checkout first.
            </p>
            <a href="/" className="mt-8 inline-flex rounded-full bg-ink px-7 py-4 text-base font-bold text-white shadow-soft">
              Back to checkout
            </a>
          </>
        )}
        <p className="mt-8 text-sm leading-6 text-slate-500">
          Important: this kit requires a computer that stays awake during posting windows and a browser profile where you are already logged into the social platform.
        </p>
      </div>
    </main>
  );
}
