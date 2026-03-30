import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { SectionTheme } from "@/components/SectionTheme";
import { PostHogProvider } from "@/components/PostHogProvider";

export const metadata: Metadata = {
  title: "Hana Benko",
  description:
    "Carnegie Mellon CS student. Building technology that improves access to learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          <SectionTheme>
            <Nav />
            <main>{children}</main>
          </SectionTheme>
        </PostHogProvider>
      </body>
    </html>
  );
}
