"use client";

import React from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib";
import { AuthButton, AuthModal, CartButton, Container, SearchInput } from "@/components/shared";

interface IHeaderProps {
  hasSearch?: boolean;
  hasCart?: boolean;
  className?: string;
}

export const Header: React.FC<IHeaderProps> = ({ hasSearch = true, hasCart = true, className }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthModalOpen, setIsAuthModalOpen] = React.useState(false);

  React.useEffect(() => {
    let toastMessage = "";

    if (searchParams.has('verified')) {
      toastMessage = 'Почта успешно подтверждена!';
    }

    if (searchParams.has("paid")) {
      toastMessage = "Заказ успешно оплачен! Информация отправлена на почту";
    }

    if (toastMessage) {
      setTimeout(() => {
        router.replace("/");
        toast.success(toastMessage, { duration: 3000 });
      }, 1000);
    }
  }, []);

  return (
    <header className={cn("border-b", className)}>
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

        {hasSearch && (
          <div className={"mx-10 flex-1"}>
            <SearchInput />
          </div>
        )}

        <div className={"flex items-center gap-3"}>
          <AuthModal open={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)}/>

          <AuthButton onClickAuth={() => setIsAuthModalOpen(true)}/>

          {hasCart && <CartButton />}
        </div>
      </Container>
    </header>
  );
};