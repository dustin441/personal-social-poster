"use client";

import { FormEvent, useMemo, useState } from "react";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type SetupAssistantChatProps = {
  sessionId: string;
};

const starterQuestions = [
  "What do I do first after downloading the ZIP?",
  "How do I add a website URL for n8n to scrape?",
  "What should I ask my AI coding agent to do?",
  "My browser poster dry run failed. What should I check?",
];

export default function SetupAssistantChat({ sessionId }: SetupAssistantChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Welcome to the ProfilePilot Setup Assistant. Tell me where you are in the setup, what tool you are using, and any error message you see. I’ll walk you through one step at a time.",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSend = useMemo(() => input.trim().length > 0 && !isLoading, [input, isLoading]);

  async function sendMessage(nextInput?: string) {
    const text = (nextInput ?? input).trim();
    if (!text || isLoading) return;

    setError(null);
    setInput("");
    const nextMessages: Message[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setIsLoading(true);

    try {
      const response = await fetch("/api/assistant-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, messages: nextMessages.slice(-10) }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "The setup assistant is unavailable right now.");
      }

      setMessages([...nextMessages, { role: "assistant", content: data.answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "The setup assistant is unavailable right now.");
      setMessages(nextMessages);
    } finally {
      setIsLoading(false);
    }
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void sendMessage();
  }

  return (
    <div className="rounded-[2rem] border border-line bg-white p-4 shadow-soft md:p-6">
      <div className="flex flex-wrap gap-2 border-b border-line pb-4">
        {starterQuestions.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => void sendMessage(question)}
            className="rounded-full border border-brand-100 bg-brand-50 px-4 py-2 text-left text-xs font-bold text-brand-700 transition hover:border-brand-300 hover:bg-white disabled:opacity-50"
            disabled={isLoading}
          >
            {question}
          </button>
        ))}
      </div>

      <div className="mt-5 max-h-[560px] space-y-4 overflow-y-auto pr-1">
        {messages.map((message, index) => (
          <div key={`${message.role}-${index}`} className={message.role === "user" ? "flex justify-end" : "flex justify-start"}>
            <div
              className={
                message.role === "user"
                  ? "max-w-[88%] rounded-3xl bg-ink px-5 py-4 text-sm leading-6 text-white"
                  : "max-w-[92%] whitespace-pre-wrap rounded-3xl bg-smoke px-5 py-4 text-sm leading-6 text-slate-700"
              }
            >
              {message.content}
            </div>
          </div>
        ))}
        {isLoading ? <div className="text-sm font-bold text-slate-500">Thinking through the next step…</div> : null}
      </div>

      {error ? <div className="mt-4 rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-700">{error}</div> : null}

      <form onSubmit={onSubmit} className="mt-5 flex flex-col gap-3 sm:flex-row">
        <textarea
          value={input}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask about setup, n8n, Google Sheets, scraping a URL, dry-run tests, or browser poster errors…"
          className="min-h-24 flex-1 rounded-3xl border border-line px-5 py-4 text-sm leading-6 outline-none transition focus:border-brand-300 focus:ring-4 focus:ring-brand-50"
        />
        <button
          type="submit"
          disabled={!canSend}
          className="rounded-3xl bg-ink px-7 py-4 text-sm font-black text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-50 sm:self-end"
        >
          Send
        </button>
      </form>

      <p className="mt-4 text-xs leading-5 text-slate-500">
        Safety note: never paste passwords, API keys, recovery codes, or private social account credentials into this chat. The assistant will tell you to stop on login, 2FA, checkpoint, suspicious-activity, or account-security screens.
      </p>
    </div>
  );
}
