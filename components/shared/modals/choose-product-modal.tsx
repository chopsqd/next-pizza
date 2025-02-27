"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui";
import { ChoosePizzaForm, ChooseProductForm } from "@/components/shared";
import { ProductWithRelations } from "@/types/prisma";

interface IChooseProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<IChooseProductModalProps> = ({ className, product }) => {
  const router = useRouter();
  const isPizzaForm = Boolean(product.variants[0].pizzaType);

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn(className, "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden")}>
        {isPizzaForm ? (
          <ChoosePizzaForm
            imageUrl={product.imageUrl}
            name={product.name}
            ingredients={product.ingredients}
            variants={product.variants}
            onClickAddCart={() => {}}
          />
          ) : (
            <ChooseProductForm
              imageUrl={product.imageUrl}
              name={product.name}
            />
          )}
      </DialogContent>
    </Dialog>
  );
};