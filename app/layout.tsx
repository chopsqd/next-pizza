import React from "react";
import { Nunito } from "next/font/google";
import { Header } from "@/components/shared";
import "./globals.css";

const nunito = Nunito({
  subsets: ["cyrillic"],
  variable: "--font-nunito",
  weight: ["400", "500", "600", "700", "800", "900"]
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link data-rh="true" rel="icon" href="/logo.png" />
        <title>Next Pizza</title>
      </head>
      <body className={nunito.variable}>
        <main className={"min-h-screen"}>
          <Header/>
          {children}
        </main>
      </body>
    </html>
  );
}