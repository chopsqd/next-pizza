import type { Cart, CartItem, Ingredient, Product, ProductVariant } from "@prisma/client";

export type CartItemDTO = CartItem & {
  productVariant: ProductVariant & { product: Product };
  ingredients: Ingredient[];
};

export interface CartDTO extends Cart {
  items: CartItemDTO[];
}

export interface CreateCartItemDTO {
  productVariantId: number,
  ingredients?: number[]
}