import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type ChatMessage = {
  role: "user";
  content: string;
};

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimit = new Map<string, RateLimitEntry>();

const MAX_MESSAGES = 10;
const MAX_CONTENT_LENGTH = 2000;

async function isPaidSession(sessionId: string | undefined) {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!sessionId || !secretKey || !sessionId.startsWith("cs_")) {
    return false;
  }

  try {
    const stripe = new Stripe(secretKey, { apiVersion: "2025-02-24.acacia" });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return session.payment_status === "paid";
  } catch {
    return false;
  }
}

function sanitizeMessages(messages: unknown): ChatMessage[] {
  if (!Array.isArray(messages)) return [];

  return messages
    .slice(-MAX_MESSAGES)
    .map((message) => {
      if (!message || typeof message !== "object") return null;
      const maybeMessage = message as { role?: unknown; content?: unknown };
      const role = maybeMessage.role === "user" ? "user" : null;
      const content = typeof maybeMessage.content === "string" ? maybeMessage.content.slice(0, MAX_CONTENT_LENGTH) : null;
      if (!role || !content) return null;
      return { role, content };
    })
    .filter((message): message is ChatMessage => Boolean(message));
}

function getClientIp(request: NextRequest) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function checkRateLimit(sessionId: string, ip: string) {
  const key = `${sessionId}:${ip}`;
  const now = Date.now();
  const windowMs = 60 * 60 * 1000;
  const maxRequests = 40;
  const existing = rateLimit.get(key);

  if (!existing || existing.resetAt <= now) {
    rateLimit.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  if (existing.count >= maxRequests) {
    return false;
  }

  existing.count += 1;
  return true;
}

const systemPrompt = `You are the ProfilePilot Setup Assistant for paid buyers of ProfilePilot Kit.

Product summary:
- ProfilePilot Kit is a DIY digital download for setting up approved personal-profile posting from the buyer's own trusted computer/browser.
- Buyers download profilepilot-kit.zip, unzip it, open the profilepilot-kit/ folder in Hermes, OpenClaw, Claude Code, Codex, or another AI coding agent, tell it to read START-HERE.md, then paste the matching prompt from prompts/.
- The workflow uses a Google Sheet approval queue, optional n8n draft/queue automation, and a local Playwright browser poster.
- The local poster should only publish rows where status=approved, local_status=ready_to_post, scheduled_for is due, and posted_url is blank.
- Never tell buyers to bypass platform security. Stop on login, 2FA, checkpoint, suspicious-activity, or account-security screens.
- Never ask for passwords, API keys, tokens, recovery codes, cookies, or private credentials. Tell buyers to configure secrets locally in their own environment.
- This is a DIY kit, not done-for-you implementation.

Key setup files in the ZIP:
- START-HERE.md: first file to read.
- WHAT-YOU-NEED.md: requirements.
- GOOGLE-SHEET-TEMPLATE.md and google-sheets/sheet-columns.md: queue columns.
- N8N-SETUP.md and n8n/workflow.json: n8n import and customization guidance.
- SCRAPING-WEBSITE-URLS.md: how to add a target URL for n8n/Firecrawl/web scraping.
- local-poster/: local browser poster files.
- prompts/hermes-install-prompt.md and prompts/openclaw-install-prompt.md: AI setup prompts.
- TESTING-CHECKLIST.md and TROUBLESHOOTING.md.

When asked how to scrape a website/link in n8n:
1. Add or identify a source URL field, usually source_url or scrape_url.
2. Create a Manual Trigger or Schedule Trigger.
3. Add a Set node with the URL or read source_url rows from Google Sheets.
4. Add an HTTP Request node or Firecrawl node/API call to fetch/scrape that URL.
5. Convert scraped content into post_text and optional first_comment/source_url.
6. Append or update a row in the Google Sheet queue with status=draft or status=needs_review first.
7. Only after human review should status become approved and local_status become ready_to_post.
8. Run dry tests before real posting.

Answer style:
- Be concise but specific.
- Give numbered steps.
- Ask at most one clarifying question if needed.
- If the buyer is blocked, give the safest next diagnostic step.
- Keep the buyer moving one step at a time.`;

export async function POST(request: NextRequest) {
  let body: { sessionId?: string; messages?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const sessionId = body.sessionId;
  const paid = await isPaidSession(sessionId);

  if (!paid || !sessionId) {
    return NextResponse.json({ error: "Setup assistant access requires a completed ProfilePilot Kit purchase." }, { status: 403 });
  }

  if (!checkRateLimit(sessionId, getClientIp(request))) {
    return NextResponse.json({ error: "The setup assistant is temporarily rate limited. Please try again later." }, { status: 429 });
  }

  const messages = sanitizeMessages(body.messages);
  const openAiKey = process.env.OPENAI_API_KEY;

  if (!openAiKey) {
    return NextResponse.json(
      {
        error:
          "The setup assistant is installed, but OPENAI_API_KEY is not configured yet. Add it in Vercel to enable live buyer chat.",
      },
      { status: 503 }
    );
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 30000);

  let response: Response;
  try {
    response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        Authorization: `Bearer ${openAiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.2,
        max_tokens: 900,
        messages: [{ role: "system", content: systemPrompt }, ...messages],
      }),
    });
  } catch {
    clearTimeout(timeout);
    return NextResponse.json({ error: "The setup assistant could not reach the AI provider. Please try again." }, { status: 502 });
  } finally {
    clearTimeout(timeout);
  }

  if (!response.ok) {
    return NextResponse.json({ error: "The setup assistant could not generate a response. Please try again." }, { status: 502 });
  }

  let data: { choices?: Array<{ message?: { content?: unknown } }> };
  try {
    data = await response.json();
  } catch {
    return NextResponse.json({ error: "The setup assistant returned an unreadable response. Please try again." }, { status: 502 });
  }

  const answer = data?.choices?.[0]?.message?.content;

  if (!answer || typeof answer !== "string") {
    return NextResponse.json({ error: "The setup assistant returned an empty response. Please try again." }, { status: 502 });
  }

  return NextResponse.json({ answer });
}
