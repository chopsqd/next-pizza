import React from "react";
import { Header } from "@/components/shared";

export default function HomeLayout({
   children,
   modal
}: Readonly<{
   children: React.ReactNode,
   modal: React.ReactNode
}>) {
  return (
    <main className={"min-h-screen"}>
      <Header />
      {children}
      {modal}
    </main>
  );
}