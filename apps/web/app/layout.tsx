import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tinyedge - PR Reviews That Stay in Their Lane",
  description:
    "Tinyedge reviews pull request diffs and highlights suggested test scenarios plus risky logic changes.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
