import type { Metadata } from "next";
import { Inter, Pathway_Extreme } from "next/font/google";
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";

const inter = Inter({ subsets: ["latin"] });
const pathway = Pathway_Extreme({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "File Tracka",
  description: "Budget File Tracking at Your Finger Tips",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <UserProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>
        <body className={pathway.className}>{children}</body>
      </html>
    </UserProvider>
  );
}
