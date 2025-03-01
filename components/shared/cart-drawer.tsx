"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib";
import {
  Button,
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui";
import { CartDrawerItem, Title } from "@/components/shared";
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
        {totalAmount > 0  ? (
          <>
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
                    disabled={item.disabled}
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
          </>
        ) : (
          <div className={"flex flex-col h-full justify-center"}>
            <div className="flex flex-col items-center justify-center w-72 mx-auto">
              <Image src="/assets/images/empty-box.png" alt="Empty cart" width={120} height={120} />
              <Title size="sm" text="Корзина пустая" className="text-center font-bold my-2" />
              <p className="text-center text-neutral-500 mb-5">
                Добавьте хотя бы одну пиццу, чтобы совершить заказ
              </p>

              <SheetClose>
                <Button className="w-56 h-12 text-base" size="lg">
                  <ArrowLeft className="w-5 mr-2" />
                  Вернуться назад
                </Button>
              </SheetClose>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};