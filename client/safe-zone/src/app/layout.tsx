import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Safe-Zone",
  description: "Your word give life to the world",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
