"use client";

import React from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { cn } from "@/lib";
import { Button } from "@/components/ui";
import { CartDrawer } from "@/components/shared";
import { useCartStore } from "@/store";

interface ICartButtonProps {
  className?: string;
}

export const CartButton: React.FC<ICartButtonProps> = ({ className }) => {
  const { items, totalAmount, loading } = useCartStore();

  return (
    <CartDrawer>
      <Button
        loading={loading}
        className={cn("group relative", { "w-[105px]": loading }, className)}
      >
        <b>{totalAmount} ₽</b>
        <span className={"h-full w-[1px] bg-white/30 mx-3"} />
        <div className="flex items-center gap-1 transition duration-300 group-hover:opacity-0">
          <ShoppingCart className="h-4 w-4 relative" strokeWidth={2} />
          <b>{items.length}</b>
        </div>
        <ArrowRight
          size={20}
          className="w-5 absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0"
        />
      </Button>
    </CartDrawer>
  );
};