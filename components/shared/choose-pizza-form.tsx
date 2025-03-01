import React from "react";
import { cn } from "@/lib/utils";
import type { Ingredient, ProductVariant } from "@prisma/client";
import { Button } from "@/components/ui";
import { GroupVariants, IngredientCard, PizzaImage, Title } from "@/components/shared";
import { pizzaSizes, pizzaTypes } from "@/constants";
import { usePizzaOptions } from "@/hooks";

interface IChoosePizzaFormProps {
  loading: boolean
  imageUrl: string;
  name: string;
  ingredients: Ingredient[];
  variants: ProductVariant[];
  onSubmit: (id: number, ingredients: number[]) => void;
  className?: string;
}

export const ChoosePizzaForm: React.FC<IChoosePizzaFormProps> = ({
 loading,
 name,
 variants,
 imageUrl,
 ingredients,
 onSubmit,
 className
}) => {
  const {
    size,
    type,
    selectedIngredients, availableSizes,
    totalPrice,
    textDetails,
    currentVariantId,
    setSize,
    setType,
    toggleIngredient
  } = usePizzaOptions(variants, ingredients);

  const handleAddClick = () => {
    if (currentVariantId) {
      onSubmit(currentVariantId, Array.from(selectedIngredients))
    }
  }

  return (
    <div className={cn(className, "flex flex-1")}>
      <PizzaImage imageUrl={imageUrl} size={size} />

      <div className={"w-[490px] bg-[#F7F6F5] p-7"}>
        <Title text={name} size={"md"} className={"font-extrabold mb-1"} />

        <p className="text-gray-400">{textDetails}</p>

        <div className={"flex flex-col gap-4 mt-5"}>
          <GroupVariants
            items={pizzaSizes}
            value={size}
            onClick={setSize}
          />
          <GroupVariants
            items={pizzaTypes}
            value={type}
            onClick={setType}
          />
        </div>

        <div className={"bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar mt-5"}>
          <div className={"grid grid-cols-3 gap-3"}>
            {ingredients.map((ingredient) => (
              <IngredientCard
                key={ingredient.id}
                name={ingredient.name}
                imageUrl={ingredient.imageUrl}
                price={ingredient.price}
                onClick={() => toggleIngredient(ingredient.id)}
                active={selectedIngredients.has(ingredient.id)}
              />
            ))}
          </div>
        </div>

        <Button
          loading={loading}
          onClick={handleAddClick}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10"
        >
          Добавить в корзину за {totalPrice} ₽
        </Button>
      </div>
    </div>
  );
};