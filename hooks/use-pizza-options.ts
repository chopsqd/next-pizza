import React from "react";
import { useSet } from "react-use";
import { mapPizzaType, pizzaSizes } from "@/constants";
import type { PizzaSize, PizzaType } from "@/constants";
import type { ProductVariant, Ingredient } from "@prisma/client";

export const usePizzaOptions = (
  variants: ProductVariant[],
  ingredients: Ingredient[]
) => {
  const [size, setSize] = React.useState<PizzaSize>(20);
  const [type, setType] = React.useState<PizzaType>(1);
  const [selectedIngredients, { toggle: toggleIngredient }] = useSet(new Set<number>([]));

  const pizzaPrice = variants.find((v) => v.size === size && v.pizzaType === type)?.price || 0;
  const totalIngredientsPrice = ingredients.reduce((acc, ingredient) => {
    return selectedIngredients.has(ingredient.id) ? acc + ingredient.price : acc;
  }, 0);

  const totalPrice = pizzaPrice + totalIngredientsPrice;
  const textDetails = `${size} см, ${mapPizzaType[type]} тесто`;

  const filteredPizzasByType = variants.filter(v => v.pizzaType === type);
  const availableSizes = pizzaSizes.map(({ name, value }) => ({
    name,
    value,
    disabled: !filteredPizzasByType.some(pizza => pizza.size === value)
  }));

  React.useEffect(() => {
    const isAvailableSize = availableSizes.find(item => item.value === size && !item.disabled);
    const availableSize = availableSizes.find(item => !item.disabled);

    if (!isAvailableSize && availableSize) {
      setSize(availableSize.value);
    }
  }, [type]);

  return {
    size,
    type,
    selectedIngredients, availableSizes,
    totalPrice,
    textDetails,
    setSize,
    setType,
    toggleIngredient
  };
};