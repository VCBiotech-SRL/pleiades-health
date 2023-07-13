import { Providers } from "./providers";
import { env } from "@/env.mjs";
import { cn } from "@/lib/utils";
import { cal, inter } from "@/styles/fonts";
import "@/styles/globals.css";
import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "VCBiotech Health Community",
    template: `%s | VCBiotech Health Community`,
  },
  description:
    "VCBiotech Health Community offers healthcare professionals the best platform to modernize their private consultation.",
  keywords: [
    "Healthcare",
    "Medical Blog",
    "VCBiotech",
    "EMR",
    "Appointment Manager",
  ],
  authors: [
    {
      name: "Victor Calderon",
      url: "https://me.vcbio.tech/",
    },
  ],
  creator: "VictoCalderon",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: env.NEXT_PUBLIC_ROOT_DOMAIN,
    title: "VCBiotech Health Community",
    description:
      "We offer healthcare proffesionals the best platform to modernize their private consultations.",
    siteName: "VCBiotech Health Community",
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  metadataBase: new URL("https://" + env.NEXT_PUBLIC_ROOT_DOMAIN),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          cal.variable,
          inter.variable,
        )}
      >
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
