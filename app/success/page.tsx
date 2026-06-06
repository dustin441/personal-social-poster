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
              Download the ZIP, unzip it, open the folder in Hermes, OpenClaw, Claude Code, or your coding agent, then paste the setup prompt from the prompts folder.
            </p>
            <a
              href={downloadHref}
              className="mt-8 inline-flex rounded-full bg-ink px-7 py-4 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-700"
            >
              Download the kit ZIP
            </a>
            <div className="mt-8 rounded-3xl border border-line bg-smoke p-6">
              <h2 className="text-xl font-black">Start here after download</h2>
              <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700">
                <li>Unzip the folder and open START-HERE.md first.</li>
                <li>Open the unzipped folder in Hermes, OpenClaw, Claude Code, Codex, or your preferred coding agent.</li>
                <li>Paste prompts/hermes-install-prompt.md, prompts/openclaw-install-prompt.md, or the closest prompt for your agent.</li>
                <li>Follow the setup docs in order: requirements, Google Sheet, n8n, local poster, testing, then go-live.</li>
                <li>Run dry tests before any real post.</li>
                <li>Do not approve a real post until the testing checklist passes.</li>
              </ol>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-3xl border border-line bg-white p-6">
                <h2 className="text-xl font-black">What is inside the ZIP</h2>
                <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-700">
                  <li>✓ START-HERE, requirements, architecture, safety, support, and troubleshooting docs</li>
                  <li>✓ Google Sheet approval queue template and sample rows</li>
                  <li>✓ n8n workflow folder for queue/draft automation</li>
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
