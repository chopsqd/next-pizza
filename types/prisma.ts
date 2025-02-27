import type { Product, ProductVariant, Ingredient } from "@prisma/client";

export type ProductWithRelations = Product & {variants: ProductVariant[], ingredients: Ingredient[]}