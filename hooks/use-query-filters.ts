import React from "react";
import qs from "qs";
import { useRouter } from "next/navigation";
import { IFilters } from "@/hooks/use-filters";

export const useQueryFilters = (filters: IFilters) => {
  const isMounted = React.useRef(false);
  const router = useRouter();

  React.useEffect(() => {
    if (isMounted.current) {
      const params = {
        ...filters.priceRange,
        pizzaTypes: Array.from(filters.selectedPizzaTypes),
        sizes: Array.from(filters.selectedSizes),
        ingredients: Array.from(filters.selectedIngredients)
      };

      const query = qs.stringify(params, { arrayFormat: "comma" });

      router.push(`?${query}`, { scroll: false });
    }

    isMounted.current = true;
  }, [filters]);
};