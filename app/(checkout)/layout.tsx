import React from "react";
import { Container, Header } from "@/components/shared";

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className={"min-h-screen bg-[#F4F1EE]"}>
      <Container>
        <Header
          hasSearch={false}
          hasCart={false}
          className={"border-b-gray-200"}
        />
        {children}
      </Container>
    </main>
  );
}