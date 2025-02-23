import React from "react";
import { useSet } from "react-use";
import { useSearchParams } from "next/navigation";

interface IPriceRangeState {
  priceFrom?: number;
  priceTo?: number;
}

interface IQueryFilters extends IPriceRangeState {
  pizzaTypes: string
  sizes: string
  ingredients: string
}

export interface IFilters {
  priceRange: IPriceRangeState
  selectedIngredients: Set<string>
  selectedSizes: Set<string>
  selectedPizzaTypes: Set<string>
}

interface IFiltersReturnProps extends IFilters {
  setPrices: (name: keyof IPriceRangeState, value: number) => void
  setIngredients: (value: string) => void
  setSizes: (value: string) => void
  setPizzaTypes: (value: string) => void
}

export const useFilters = (): IFiltersReturnProps => {
  const searchParams = useSearchParams() as unknown as Map<keyof IQueryFilters, string>;

  const [selectedIngredients, {toggle: onToggleIngredients}] = useSet(
    new Set<string>(searchParams.get('ingredients')?.split(','))
  )

  const [selectedSizes, { toggle: onToggleSizes }] = useSet(new Set<string>(
    searchParams.has('sizes')
      ? searchParams.get('sizes')?.split(',')
      : []
  ));

  const [selectedPizzaTypes, { toggle: onTogglePizzaTypes }] = useSet(new Set<string>(
    searchParams.has('pizzaTypes')
      ? searchParams.get('pizzaTypes')?.split(',')
      : []
  ));

  const [priceRange, setPriceRange] = React.useState<IPriceRangeState>({
    priceFrom: Number(searchParams.get('priceFrom')) || undefined,
    priceTo: Number(searchParams.get('priceTo')) || undefined
  });

  const updatePrice = (name: keyof IPriceRangeState, value: number) => {
    setPriceRange(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return {
    priceRange, selectedIngredients, selectedSizes, selectedPizzaTypes,
    setPrices: updatePrice,
    setIngredients: onToggleIngredients,
    setSizes: onToggleSizes,
    setPizzaTypes: onTogglePizzaTypes
  }
}