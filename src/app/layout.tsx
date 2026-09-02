import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Java Trainer",
  description: "Aprende Java con un motor de aprendizaje activo",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`dark ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <header className="bg-card border-b border-border px-4 sm:px-6 py-3">
          <nav className="max-w-5xl mx-auto flex items-center justify-between gap-3">
            <Link href="/" className="font-bold text-base sm:text-lg text-foreground whitespace-nowrap">
              ☕ Java Trainer
            </Link>
            <div className="flex gap-3 sm:gap-4 text-sm">
              <Link href="/map" className="text-muted-foreground hover:text-foreground whitespace-nowrap">
                Mapa
              </Link>
              <Link href="/progress" className="text-muted-foreground hover:text-foreground whitespace-nowrap">
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
