import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Personal Profile Posting Automation Kit",
  description:
    "A DIY, AI-agent-ready kit for setting up approved personal-profile posting from your own trusted browser.",
  openGraph: {
    title: "Personal Profile Posting Automation Kit",
    description:
      "Download the docs, prompts, n8n workflow, Sheet template, and local poster setup for approved personal-profile posting.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
