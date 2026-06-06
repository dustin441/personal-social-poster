export default function TermsPage() {
  return (
    <main className="min-h-screen bg-smoke px-6 py-12 text-ink">
      <article className="mx-auto max-w-4xl rounded-[2rem] border border-line bg-white p-8 shadow-soft md:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand-700">Terms and Conditions</p>
        <h1 className="mt-3 text-4xl font-black tracking-[-0.04em]">ProfilePilot Kit Terms</h1>
        <p className="mt-3 text-sm text-slate-500">Effective date: June 6, 2026 • Version 1.0</p>

        <div className="mt-8 space-y-7 text-sm leading-7 text-slate-700">
          <section>
            <h2 className="text-xl font-black text-ink">1. Product being purchased</h2>
            <p className="mt-2">
              The ProfilePilot Kit is a downloadable digital product. It includes documentation,
              prompts, templates, starter workflow files, and starter local automation files intended to help a buyer set up
              a human-approved personal-profile posting workflow. It is not a managed service, custom implementation,
              guaranteed software-as-a-service subscription, or promise of future compatibility with any third-party platform.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-ink">2. Digital delivery and access</h2>
            <p className="mt-2">
              After successful payment, the buyer receives access to a downloadable ZIP file through the purchase success page.
              Access to the success/download page, Stripe payment records, and server logs may be used as evidence that the
              digital product was delivered. The buyer is responsible for downloading, saving, and backing up the files after purchase.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-ink">3. No guarantee of results or platform compatibility</h2>
            <p className="mt-2">
              Browser automation depends on buyer environment, browser state, account permissions, platform UI changes, third-party
              service availability, and each platform's security systems. We do not guarantee that the kit will work forever, work
              on every computer, work with every account, bypass platform limitations, or produce any specific business outcome,
              revenue, followers, engagement, impressions, or leads.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-ink">4. Buyer responsibilities</h2>
            <p className="mt-2">By purchasing, the buyer acknowledges that they are responsible for:</p>
            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>having a compatible computer that can stay awake during posting windows;</li>
              <li>installing or using Node.js, Chrome/Chromium, Google Sheets, n8n, and any required local tools;</li>
              <li>being logged into their own social platform account in their own browser;</li>
              <li>reviewing and approving all content before publishing;</li>
              <li>complying with all third-party platform terms, laws, and policies;</li>
              <li>stopping the automation if a login, 2FA, checkpoint, suspicious-activity, or account-security screen appears;</li>
              <li>testing with dry runs before publishing a real post.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-black text-ink">5. Human approval and safety limits</h2>
            <p className="mt-2">
              The kit is designed around human approval. It should not be used for spam, high-volume posting, deceptive activity,
              credential sharing, bypassing security systems, or unauthorized access. The buyer is solely responsible for what is
              posted from their account and for any consequences of using automation with third-party platforms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-ink">6. Refund policy</h2>
            <p className="mt-2">
              Because this is an immediately delivered digital product containing downloadable files, prompts, templates, and setup
              documentation, all sales are final once purchase access is granted. Refunds are not provided because a buyer changed
              their mind, did not read the requirements, decided not to install the kit, lacks a compatible computer, expected a
              done-for-you service, or has platform/account-specific issues outside our control.
            </p>
            <p className="mt-2">
              If a buyer cannot access the download due to a technical delivery issue, they must contact support within 7 days of
              purchase so we can restore access or resend the files. Our first remedy for delivery issues is replacement access,
              not an automatic refund.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-ink">7. Support boundaries</h2>
            <p className="mt-2">
              The base purchase includes the digital kit only. It does not include one-on-one installation, unlimited troubleshooting,
              custom code, custom n8n builds, platform selector updates, or future maintenance unless explicitly purchased separately.
              Paid setup or implementation support may be offered separately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-ink">8. License and redistribution</h2>
            <p className="mt-2">
              Purchase grants one buyer a non-transferable license to use the kit for their own business or personal-brand workflow.
              The buyer may not resell, redistribute, publish, share, upload, sublicense, or include the kit files in another product,
              course, repository, agency deliverable, or marketplace listing without written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-ink">9. Chargebacks and payment disputes</h2>
            <p className="mt-2">
              The buyer agrees to contact support first if there is a delivery or access issue. Filing a payment dispute after receiving
              access to the digital product may result in submission of purchase records, checkout consent, download/access logs,
              product descriptions, these Terms, and related correspondence to the payment processor or card issuer as evidence of
              digital delivery and buyer agreement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-ink">10. Third-party services</h2>
            <p className="mt-2">
              This product is not affiliated with, endorsed by, or sponsored by Meta, Facebook, LinkedIn, Stripe, Google, n8n, Vercel,
              Hermes, OpenClaw, Claude, or any third-party platform. Third-party services may change or limit features at any time.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-ink">11. Limitation of liability</h2>
            <p className="mt-2">
              To the maximum extent permitted by law, liability is limited to the amount paid for the kit. We are not responsible for
              lost profits, lost accounts, platform restrictions, business interruption, data loss, reputational harm, or indirect,
              incidental, special, consequential, or punitive damages related to use or inability to use the kit.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-black text-ink">12. Acceptance</h2>
            <p className="mt-2">
              By checking the purchase acknowledgement box, completing checkout, or accessing the download, the buyer confirms that
              they read, understood, and agreed to these Terms and the refund policy.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}
