"use client";

import React from "react";
import toast from "react-hot-toast";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui";
import { ChoosePizzaForm, ChooseProductForm } from "@/components/shared";
import { ProductWithRelations } from "@/types/prisma";
import { useCartStore } from "@/store";

interface IChooseProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<IChooseProductModalProps> = ({ className, product }) => {
  const router = useRouter();
  const firstVariant = product.variants[0];
  const isPizzaForm = Boolean(firstVariant.pizzaType);
  const { addCartItem, loading } = useCartStore();

  const onSubmit = async (variant?: number, ingredients?: number[]) => {
    try {
      await addCartItem({
        productVariantId: variant ?? firstVariant.id,
        ingredients
      });

      toast.success("Добавлено в корзину");
      router.back();
    } catch (error) {
      console.error(error);
      toast.error("Не удалось добавить в корзину");
    }
  };

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn(className, "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden")}>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variants={product.variants}
            onSubmit={onSubmit}
            loading={loading}
          />
        ) : (
          <ChooseProductForm
            imageUrl={product.imageUrl}
            name={product.name}
            price={firstVariant.price}
            onSubmit={onSubmit}
            loading={loading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};