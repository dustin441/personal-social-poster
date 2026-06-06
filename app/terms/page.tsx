export default function TermsPage() {
  return (
    <main className="min-h-screen bg-smoke px-6 py-12 text-ink">
      <article className="mx-auto max-w-3xl rounded-[2rem] border border-line bg-white p-8 shadow-soft md:p-12">
        <a href="/" className="text-sm font-bold text-brand-700">← Back</a>
        <h1 className="mt-6 text-4xl font-black tracking-[-0.04em]">Terms</h1>
        <div className="mt-6 space-y-5 leading-8 text-slate-600">
          <p>
            The Personal Profile Posting Automation Kit is a downloadable DIY digital product. It includes setup documentation, templates, prompts, and automation starter files.
          </p>
          <p>
            This kit is not a fully managed service and does not guarantee compatibility with every social platform, account, device, browser, or future user interface change.
          </p>
          <p>
            You are responsible for reviewing and complying with the terms, policies, and automation rules of any platform you use. The kit does not bypass login, two-factor authentication, checkpoints, suspicious-activity warnings, or account-security prompts.
          </p>
          <p>
            Because this is a digital product, refunds are handled case by case. If you cannot access your files after purchase, contact support with your purchase email.
          </p>
          <p>
            This product is not affiliated with Meta, Facebook, Instagram, LinkedIn, n8n, Hermes, OpenClaw, Claude Code, Stripe, Vercel, or any social platform.
          </p>
        </div>
      </article>
    </main>
  );
}
