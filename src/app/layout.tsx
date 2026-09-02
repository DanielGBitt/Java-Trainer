import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Java Trainer",
  description: "Aprende Java con un motor de aprendizaje activo",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <header className="bg-white border-b border-gray-200 px-4 py-3">
          <nav className="max-w-5xl mx-auto flex items-center gap-6">
            <Link href="/" className="font-bold text-lg text-gray-900">
              ☕ Java Trainer
            </Link>
            <div className="flex gap-4 text-sm">
              <Link href="/map" className="text-gray-600 hover:text-gray-900">
                Mapa
              </Link>
              <Link href="/progress" className="text-gray-600 hover:text-gray-900">
                Progreso
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
