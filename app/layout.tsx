import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Providers } from "./providers";
import { EmotionRegistry } from "@/lib/emotion-registry";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const fontEf = Geist({
  variable: "--font-ef",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
  display: "swap",
});

// next/font must stay in the root layout, but the body class comes from
// globals.css which already includes the Tailwind reset.
export const metadata: Metadata = {
  title: "EventFlow — Your Feedback Shapes Better Events",
  description:
    "EventFlow is a SaaS event feedback and review platform. Share your experience, help organizers improve, and make every event better.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontEf.variable} ${geistSans.variable}`}>
      {/* margin reset comes from MUI CssBaseline + Tailwind preflight, not an
          inline style — inline styles on <body> caused a hydration mismatch
          (React expanded `margin: 0` to longhands on the server). */}
      <body>
        <EmotionRegistry>
          <Providers>{children}</Providers>
        </EmotionRegistry>
      </body>
    </html>
  );
}