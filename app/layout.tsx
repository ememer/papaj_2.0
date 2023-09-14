import "./globals.css";
import type { Metadata } from "next";
import Header from "./components/Header";

export const metadata: Metadata = {
  title: "Papaj 2.0",
  description: "Gentalmans club app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-mirage-800 to-purple-700 via-70% text-gray-300">
        <Header />
        <main className="min-h-90-screen mx-auto">{children}</main>
      </body>
    </html>
  );
}
