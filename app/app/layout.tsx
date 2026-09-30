import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from './StoreProvider'
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Codyza Repo Analyzer",
  description: "Analyze GitHub repositories with optional AI-assisted insights for maintenance, onboarding, and project review.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <header style={{ padding: '20px 24px', borderBottom: '1px solid #e5e7eb', background: '#fff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h1 style={{ margin: 0, fontSize: 20 }}>Codyza — Repo Analyzer</h1>
            <nav aria-label="Main navigation">
              <Link href="/" style={{ marginLeft: 12, color: '#2563eb', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.5em' }}>Home</Link>
            </nav>
          </div>
        </header>
        <StoreProvider>{children}</StoreProvider>
        <footer style={{ borderTop: '1px solid #e5e7eb', padding: '12px 24px', background: '#fff' }}>
          <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', fontSize: 13, color: '#6b7280' }}>
            Built by Codyza — lightweight repo analysis tool
          </div>
        </footer>
      </body>
    </html>
  );
}
