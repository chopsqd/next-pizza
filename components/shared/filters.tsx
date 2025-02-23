"use client";

import React from "react";
import { CheckboxFiltersGroup, Title } from "@/components/shared";
import { Input, RangeSlider } from "@/components/ui";
import { useFilters, useIngredients, useQueryFilters } from "@/hooks";

interface IFiltersProps {
  className?: string;
}

export const Filters: React.FC<IFiltersProps> = ({ className }) => {
  const { ingredients, loading } = useIngredients();
  const filters = useFilters()

  useQueryFilters(filters)

  const filterItems = ingredients.map(item => ({ value: String(item.id), text: item.name }));

  const updatePrices = (prices: number[]) => {
    filters.setPrices('priceFrom', prices[0])
    filters.setPrices('priceTo', prices[1])
  }

  return (
    <div className={className}>
      <Title
        text="Фильтрация"
        size="sm"
        className="mb-5 font-bold pb-4 border-b border-b-neutral-100"
      />

      <CheckboxFiltersGroup
        title={"Тип теста"}
        name={"pizzaTypes"}
        className={"mb-5"}
        onClickCheckbox={filters.setPizzaTypes}
        selected={filters.selectedPizzaTypes}
        items={[
          { text: "Тонкое", value: "1" },
          { text: "Традиционное", value: "2" }
        ]}
      />

      <CheckboxFiltersGroup
        title={"Размеры"}
        name={"sizes"}
        className={"mb-5"}
        onClickCheckbox={filters.setSizes}
        selected={filters.selectedSizes}
        items={[
          { text: "20 см", value: "20" },
          { text: "30 см", value: "30" },
          { text: "40 см", value: "40" }
        ]}
      />

      <div className={"mt-5 border-y border-y-neutral-100 py-6 pb-7"}>
        <p className={"font-bold mb-3"}>Цена от и до:</p>
        <div className={"flex gap-3 mb-5"}>
          <Input
            type={"number"}
            placeholder={"0"}
            min={0}
            max={1000}
            value={String(filters.priceRange.priceFrom)}
            onChange={(e) => filters.setPrices("priceFrom", Number(e.target.value))}
          />
          <Input
            type={"number"}
            placeholder={"1000"}
            min={100}
            max={1000}
            value={String(filters.priceRange.priceTo)}
            onChange={(e) => filters.setPrices("priceTo", Number(e.target.value))}
          />
        </div>

        <RangeSlider
          min={0}
          max={1000}
          step={10}
          value={[filters.priceRange.priceFrom || 0, filters.priceRange.priceTo || 1000]}
          onValueChange={updatePrices}
        />
      </div>

      <CheckboxFiltersGroup
        title={"Ингредиенты"}
        name={"ingredients"}
        className={"mt-5"}
        limit={6}
        defaultItems={filterItems.slice(0, 6)}
        items={filterItems}
        loading={loading}
        onClickCheckbox={filters.setIngredients}
        selected={filters.selectedIngredients}
      />
    </div>
  );
};