import React from "react";
import type { Ingredient } from "@prisma/client";
import { Api } from "@/services/api-client";

export const useIngredients = () => {
  const [ingredients, setIngredients] = React.useState<Ingredient[]>([]);
  const [loading, setLoading] = React.useState(true);

  async function fetchIngredients() {
    try {
      setLoading(true);
      const response = await Api.ingredients.getAll();
      setIngredients(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  React.useEffect(() => {
    fetchIngredients();
  }, []);

  return { ingredients, loading };
};