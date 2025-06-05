import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Garden from "@/components/Garden";
import FloatingPlayer from "@/components/FloatingPlayer";
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nosso Amor",
  description: "Um site especial para celebrar nosso amor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gradient-to-b from-pink-50 to-purple-50 min-h-screen pb-16`}>
        <ThemeProvider>
        <Garden />
        <Navigation />
        <main className="relative z-10">
          {children}
        </main>
        <FloatingPlayer />
        </ThemeProvider>
      </body>
    </html>
  );
}
