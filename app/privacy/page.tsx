export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-smoke px-6 py-12 text-ink">
      <article className="mx-auto max-w-3xl rounded-[2rem] border border-line bg-white p-8 shadow-soft md:p-12">
        <a href="/" className="text-sm font-bold text-brand-700">← Back</a>
        <h1 className="mt-6 text-4xl font-black tracking-[-0.04em]">Privacy</h1>
        <div className="mt-6 space-y-5 leading-8 text-slate-600">
          <p>
            This website uses Stripe for payment processing. Payment details are handled by Stripe and are not stored by this site.
          </p>
          <p>
            We may receive basic purchase information from Stripe, such as your email address, payment status, and checkout session ID, so we can provide access to the digital product and support your purchase.
          </p>
          <p>
            The downloadable kit runs on your own computer. You should not share social media passwords with the kit, this website, or any setup assistant.
          </p>
          <p>
            If analytics or advertising pixels are added later, this page should be updated to describe those tools and how they are used.
          </p>
        </div>
      </article>
    </main>
  );
}
