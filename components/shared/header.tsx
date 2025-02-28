import React from "react";
import { cn } from "@/lib/utils";
import { CartButton, Container, SearchInput } from "@/components/shared";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui";
import { ArrowRight, ShoppingCart, User } from "lucide-react";

interface IHeaderProps {
  className?: string;
}

export const Header: React.FC<IHeaderProps> = ({ className }) => {
  return (
    <header className={cn("border border-b", className)}>
      <Container className={"flex items-center justify-between py-8"}>
        <Link href="/">
          <div className="flex items-center gap-4">
            <Image src="/logo.png" width={35} height={35} alt="Logo" />
            <div>
              <h1 className="text-2xl uppercase font-black">Next Pizza</h1>
              <p className="text-sm text-gray-400 leading-3">вкусней уже некуда</p>
            </div>
          </div>
        </Link>

        <div className={"mx-10 flex-1"}>
          <SearchInput/>
        </div>

        <div className={"flex items-center gap-3"}>
          <Button variant={"outline"} className={"flex items-center gap-1"}>
            <User size={16} />
            Войти
          </Button>

          <CartButton/>
        </div>
      </Container>
    </header>
  );
};