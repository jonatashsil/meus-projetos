import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Classificados Online",
  description: "Classificados de carros, motos e utilitários novos e usados em todo o Brasil.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
