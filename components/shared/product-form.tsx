"use client";

import React from "react";
import toast from "react-hot-toast";
import { useCartStore } from "@/store";
import type { ProductWithRelations } from "@/types/prisma";
import { ChoosePizzaForm, ChooseProductForm } from "./";

interface IProductFormProps {
  handleSubmit?: VoidFunction
  product: ProductWithRelations;
}

export const ProductForm: React.FC<IProductFormProps> = ({ handleSubmit, product }) => {
  const { addCartItem, loading } = useCartStore();

  const firstVariant = product.variants[0];
  const isPizzaForm = Boolean(firstVariant.pizzaType);

  const onSubmit = async (variant?: number, ingredients?: number[]) => {
    try {
      await addCartItem({
        productVariantId: variant ?? firstVariant.id,
        ingredients
      });

      toast.success("Добавлено в корзину");
      handleSubmit?.()
    } catch (error) {
      console.error(error);
      toast.error("Не удалось добавить в корзину");
    }
  };

  if (isPizzaForm) {
    return (
      <ChoosePizzaForm
        imageUrl={product.imageUrl}
        name={product.name}
        ingredients={product.ingredients}
        variants={product.variants}
        onSubmit={onSubmit}
        loading={loading}
      />
    );
  }

  return (
    <ChooseProductForm
      imageUrl={product.imageUrl}
      name={product.name}
      price={firstVariant.price}
      onSubmit={onSubmit}
      loading={loading}
    />
  );
};