"use client";

import React from "react";
import { Button, Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib";
import { CartDrawerItem } from "@/components/shared";
import { useCartStore } from "@/store";


interface ICartDrawerProps {
  className?: string;
}

export const CartDrawer: React.FC<React.PropsWithChildren<ICartDrawerProps>> = ({ children, className }) => {
  const {
    items,
    totalAmount,
    fetchCartItems,
    getCartItemDetails,
    updateItemQuantity,
    removeCartItem
  } = useCartStore();

  const onClickCountButton = (id: number, quantity: number, type: "plus" | "minus") => {
    const newQuantity = type === "plus" ? quantity + 1 : quantity - 1;
    updateItemQuantity(id, newQuantity);
  };

  React.useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className={cn("flex flex-col justify-between pb-0 bg-[#F4F1EE]", className)}>
        <SheetHeader>
          <SheetTitle>
            В корзине <span className="font-bold">{items.length} товара</span>
          </SheetTitle>
        </SheetHeader>

        <div className={"-mx-6 mt-5 overflow-auto flex-1"}>
          {items.map((item) => (
            <div
              key={item.id}
              className={"mb-2"}
            >
              <CartDrawerItem
                imageUrl={item.imageUrl}
                details={getCartItemDetails(item)}
                name={item.name}
                price={item.price}
                quantity={item.quantity}
                onClickCountButton={type => onClickCountButton(item.id, item.quantity, type)}
                onClickRemoveButton={() => removeCartItem(item.id)}
              />
            </div>
          ))}
        </div>

        <SheetFooter className="-mx-6 bg-white p-8">
          <div className="w-full">
            <div className="flex mb-4">
              <span className="flex flex-1 text-lg text-neutral-500">
                Итого
                <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
              </span>

              <span className="font-bold text-lg">{totalAmount} ₽</span>
            </div>

            <Link href="/cart">
              <Button
                type="submit"
                className="w-full h-12 text-base"
              >
                Оформить заказ
                <ArrowRight className="w-5 ml-2" />
              </Button>
            </Link>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};