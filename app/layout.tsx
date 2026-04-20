
/**
 * Root Layout
 * Structure: Route Groups for clean organization
 * 
 * Directory structure (note: route groups don't affect URLs):
 * app/(auth)/login → /login
 * app/(auth)/signup → /signup
 * app/(protected)/dashboard → /dashboard
 * app/page.tsx → /
 * 
 * AuthProvider wraps all routes at root level to ensure
 * authentication context is available throughout the app.
 */

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../src/context/AuthContext"; // ✅ Wraps all app routes

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SAMPRA Development Fund",
  description: "Access funding, development programs, and opportunities to grow your creative career. We support artists, creators, and organisations across South Africa.",
  icons: {
    icon: "/sampra-logo-color .svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        
        {/* ✅ THIS IS THE WRAP */}
        <AuthProvider>
          {children}
        </AuthProvider>

      </body>
    </html>
  );
}