import type { Metadata } from "next";
import { Unbounded, Albert_Sans, Fira_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "ForgeX - AI App Builder",
  description:
    "ForgeX is an AI-powered web app builder — describe your idea in a prompt and get a fully functional, deployable application. Edit the code, preview it live, and download the project as a ZIP. It's an agentic SaaS builder with pay-as-you-go pricing.",
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon white-bg.png",
  },
};

const unbounder = Unbounded({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-heading",
});

const albertSans = Albert_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-title",
});

const firaSans = Fira_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${unbounder.variable} ${albertSans.variable} ${firaSans.variable} font-sans`}
      >
        <ClerkProvider
          afterSignOutUrl={"/"}
          publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            disableTransitionOnChange
          >
            <Header />
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}
