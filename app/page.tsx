const features = [
  "Google Sheet approval queue template",
  "n8n workflow JSON for draft/queue operations",
  "Local Playwright browser poster structure",
  "Hermes, OpenClaw, Claude Code setup prompts",
  "Mac-first setup walkthrough",
  "Safety, testing, and troubleshooting checklists",
];

const steps = [
  ["Draft", "Use n8n, your content process, or AI to add posts to the queue."],
  ["Approve", "Only rows marked approved and ready_to_post are eligible."],
  ["Post locally", "Your own computer publishes through your trusted browser session."],
  ["Log results", "The queue updates with posted/error status and troubleshooting notes."],
];

const faqs = [
  [
    "Does my computer need to stay on?",
    "Yes. This is local browser automation. Your Mac, PC, spare laptop, or mini computer needs to be awake during posting windows.",
  ],
  [
    "Do I need to give anyone my password?",
    "No. You log into your own browser yourself. The kit is designed around your existing trusted browser profile.",
  ],
  [
    "Does this bypass platform security?",
    "No. The setup is designed to stop on login, 2FA, checkpoint, suspicious activity, or account-security screens.",
  ],
  [
    "Can I use Hermes or OpenClaw?",
    "Yes. The kit includes prompt files that tell Hermes, OpenClaw, Claude Code, or another coding agent how to walk through the setup.",
  ],
  [
    "Can browser automation break?",
    "Yes. Social platforms change their interfaces. The kit includes troubleshooting and selector-debugging guidance, but it is a DIY product, not a fully managed service.",
  ],
  [
    "Can I just give the ZIP to my AI agent?",
    "Yes. Download and unzip the kit, open the unzipped profilepilot-kit folder in your coding agent, then paste the matching install prompt from the prompts folder. The agent should read START-HERE.md first and walk one step at a time.",
  ],
];

import { CheckoutButton } from "@/components/CheckoutButton";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-ink">
      <section className="gradient-grid overflow-hidden border-b border-line">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <a href="#top" className="flex items-center gap-2 text-sm font-bold tracking-tight">
            <img src="/profilepilot-mark.svg" alt="" className="h-9 w-9 rounded-xl shadow-sm" />
            <span>ProfilePilot Kit</span>
          </a>
          <div className="hidden items-center gap-6 text-sm text-slate-600 sm:flex">
            <a href="#included" className="hover:text-ink">Included</a>
            <a href="#demo" className="hover:text-ink">Demo</a>
            <a href="#faq" className="hover:text-ink">FAQ</a>
            <a href="#pricing" className="hover:text-ink">Pricing</a>
          </div>
        </nav>

        <div id="top" className="mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-10 lg:grid-cols-[1.08fr_0.92fr] lg:pb-28 lg:pt-20">
          <div className="flex flex-col items-start">
            <div className="mb-6 rounded-full border border-brand-100 bg-white/80 px-4 py-2 text-sm font-medium text-brand-700 shadow-sm backdrop-blur">
              Beta launch: AI-agent-ready DIY automation kit
            </div>
            <h1 className="max-w-4xl text-5xl font-black tracking-[-0.055em] text-ink sm:text-6xl lg:text-7xl">
              Stop copy-pasting approved posts into your personal profile.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-650 text-slate-600 sm:text-xl">
              A downloadable kit that helps Hermes, OpenClaw, Claude Code, or your coding agent set up a local browser-based posting workflow from your own trusted computer.
            </p>
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <CheckoutButton className="rounded-full bg-ink px-7 py-4 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
                Get the Kit — $97
              </CheckoutButton>
              <a href="#included" className="rounded-full border border-line bg-white px-7 py-4 text-base font-bold text-ink transition hover:-translate-y-0.5 hover:border-brand-100 hover:bg-brand-50">
                See what’s included
              </a>
            </div>
            <p className="mt-5 max-w-xl text-sm leading-6 text-slate-500">
              Requires a computer that can stay awake during posting windows. This is a DIY workflow, not a managed social media service.
            </p>
          </div>

          <div className="relative">
            <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-brand-100 blur-3xl" />
            <div className="relative rounded-[2rem] border border-line bg-white/88 p-5 shadow-soft backdrop-blur">
              <div className="mb-5 flex items-center gap-3 rounded-[1.5rem] border border-line bg-white p-4">
                <img src="/profilepilot-mark.svg" alt="ProfilePilot Kit logo" className="h-14 w-14 rounded-2xl object-cover" />
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-600">ProfilePilot Kit</p>
                  <p className="mt-1 text-sm font-semibold text-slate-700">Download. Unzip. Let your AI agent install it.</p>
                </div>
              </div>
              <div className="rounded-[1.5rem] bg-ink p-5 text-white">
                <div className="flex items-center gap-2 border-b border-white/10 pb-4">
                  <span className="h-3 w-3 rounded-full bg-red-400" />
                  <span className="h-3 w-3 rounded-full bg-yellow-300" />
                  <span className="h-3 w-3 rounded-full bg-mint" />
                  <span className="ml-3 text-xs text-white/50">approved-posts.csv</span>
                </div>
                <div className="mt-5 space-y-3 font-mono text-xs leading-6 text-white/76">
                  <p><span className="text-mint">status</span>: approved</p>
                  <p><span className="text-mint">local_status</span>: ready_to_post</p>
                  <p><span className="text-mint">scheduled_for</span>: today 9:00 AM</p>
                  <p><span className="text-mint">platform</span>: personal profile</p>
                  <p><span className="text-mint">action</span>: open trusted browser → post → update sheet</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {features.slice(0, 4).map((feature) => (
                  <div key={feature} className="rounded-2xl border border-line bg-smoke p-4 text-sm font-medium text-slate-700">
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">The problem</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Personal profile posting still turns into manual busywork.
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Posts drafted in Docs or Sheets",
              "Approvals scattered across messages",
              "Manual copy/paste every day",
              "Missed posting windows",
              "Forgotten source links or first comments",
              "No clean status or error trail",
            ].map((item) => (
              <div key={item} className="rounded-3xl border border-line bg-white p-5 shadow-sm">
                <span className="text-lg font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      <section className="mx-auto max-w-6xl px-6 py-20" id="demo">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">See it in action</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Watch the approved-post workflow run from queue to browser.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              This demo shows the practical flow buyers are setting up: approved content in a queue, a local computer using a trusted browser session, and status logging after the run.
            </p>
          </div>
          <div className="overflow-hidden rounded-[2rem] border border-line bg-ink p-2 shadow-soft">
            <iframe
              src="https://drive.google.com/file/d/1FUtI33jU9u_Xl9F9mXnPduXgtfjtmDS6/preview"
              className="aspect-video w-full rounded-[1.5rem] bg-black"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
              title="ProfilePilot Kit workflow demo"
            />
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-smoke py-20" id="included">
        <div className="mx-auto max-w-6xl px-6">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">What you get</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              The files, prompts, and walkthrough your AI agent needs to install the workflow.
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature} className="rounded-3xl border border-line bg-white p-6 shadow-sm">
                <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-50 text-brand-700">✓</div>
                <h3 className="text-lg font-bold">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 rounded-[2rem] border border-line bg-white p-6 shadow-soft md:p-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">After purchase</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              The download is packaged so your AI agent can take it from there.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              Buyers get one ZIP containing the docs, prompts, templates, n8n workflow files, local poster starter files, safety guidance, and testing checklists.
            </p>
          </div>
          <div className="rounded-[1.5rem] bg-smoke p-6">
            <ol className="list-decimal space-y-3 pl-5 text-slate-700">
              <li>Download <span className="font-bold text-ink">profilepilot-kit.zip</span> from the thank-you page.</li>
              <li>Unzip it so you have a normal <span className="font-bold text-ink">profilepilot-kit/</span> folder.</li>
              <li>Open that folder in Hermes, OpenClaw, Claude Code, Codex, or another AI coding agent.</li>
              <li>Tell the agent: “Read START-HERE.md first. Walk me through this setup one step at a time. Verify each step before continuing.”</li>
              <li>Paste the matching prompt from the <span className="font-bold text-ink">prompts/</span> folder and run dry tests before approving any real post.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">How it works</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              You approve it. Your computer posts it.
            </h2>
            <p className="mt-5 text-lg leading-8 text-slate-600">
              The kit is designed around local browser automation because personal-profile platforms usually trust your normal device, cookies, and browser session more than a random cloud server.
            </p>
          </div>
          <div className="grid gap-4">
            {steps.map(([title, body], index) => (
              <div key={title} className="flex gap-5 rounded-3xl border border-line bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-ink text-sm font-black text-white">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-1 leading-7 text-slate-600">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink py-20 text-white">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-mint">Important requirement</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
              Why does it run from your computer?
            </h2>
          </div>
          <div className="text-lg leading-8 text-white/72">
            <p>
              Personal-profile posting is most reliable from your own logged-in browser, on a device the platform already recognizes. That means you need a computer that can stay awake during posting windows: your Mac, PC, spare laptop, or a small always-on computer.
            </p>
            <p className="mt-5">
              The kit does not ask for your social password and does not bypass security screens. If login, 2FA, checkpoint, or suspicious-activity prompts appear, the automation should stop and let you handle it manually.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-20" id="pricing">
        <div className="rounded-[2rem] border border-line bg-white p-6 shadow-soft md:p-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-600">Beta launch</p>
              <h2 className="mt-4 text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                Get the complete DIY kit.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
                Download the docs, templates, prompts, n8n workflow, and local poster setup. Give the folder to your AI coding agent and follow the step-by-step walkthrough.
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-smoke p-6">
              <div className="text-sm font-bold uppercase tracking-[0.18em] text-slate-500">One-time price</div>
              <div className="mt-3 text-6xl font-black tracking-[-0.06em]">$97</div>
              <ul className="mt-6 space-y-3 text-sm font-medium text-slate-700">
                <li>✓ v1 kit files</li>
                <li>✓ AI setup prompts</li>
                <li>✓ n8n + Google Sheet workflow</li>
                <li>✓ Local browser posting setup</li>
                <li>✓ Safety + troubleshooting docs</li>
              </ul>
              <div className="mt-7">
                <CheckoutButton className="w-full rounded-full bg-ink px-7 py-4 text-base font-bold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60">
                  Get instant access
                </CheckoutButton>
              </div>
              <p className="mt-4 text-xs leading-5 text-slate-500">
                DIY digital product. Not affiliated with Meta, Facebook, LinkedIn, n8n, Hermes, OpenClaw, or any social platform.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-20" id="faq">
        <h2 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">FAQ</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <div key={question} className="rounded-3xl border border-line bg-white p-6 shadow-sm">
              <h3 className="text-lg font-black">{question}</h3>
              <p className="mt-3 leading-7 text-slate-600">{answer}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-line px-6 py-8 text-sm text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ProfilePilot Kit</p>
          <div className="flex gap-5">
            <a href="/terms" className="hover:text-ink">Terms</a>
            <a href="/privacy" className="hover:text-ink">Privacy</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
