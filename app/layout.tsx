import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.profilepilotkit.com"),
  title: "ProfilePilot Kit",
  description:
    "A DIY, AI-agent-ready kit for setting up approved personal-profile posting from your own trusted browser.",
  icons: {
    icon: "/profilepilot-mark.svg",
    shortcut: "/profilepilot-mark.svg",
    apple: "/profilepilot-logo.png",
  },
  openGraph: {
    title: "ProfilePilot Kit",
    description:
      "Download the docs, prompts, n8n workflow, Sheet template, and local poster setup for approved personal-profile posting.",
    type: "website",
    images: ["/profilepilot-logo.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
