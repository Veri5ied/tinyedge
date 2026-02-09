import "./globals.css";

export const metadata = {
  title: "Tinyedge",
  description: "Tinyedge",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
