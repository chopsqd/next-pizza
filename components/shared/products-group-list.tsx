"use client";

import React from "react";
import { useIntersection } from "react-use";
import { cn } from "@/lib/utils";
import { ProductCard, Title } from "@/components/shared";
import { useCategoryStore } from "@/store";
import { ProductWithRelations } from "@/types/prisma";

interface IProductsGroupListProps {
  title: string;
  products: ProductWithRelations[];
  className?: string;
  listClassName?: string;
  categoryId: number;
}

export const ProductsGroupList: React.FC<IProductsGroupListProps> = ({
   title,
   products,
   listClassName,
   categoryId,
   className
 }) => {
  const setActiveId = useCategoryStore((state) => state.setActiveId);
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    threshold: 0.4
  });

  React.useEffect(() => {
    if (intersection?.isIntersecting) {
      setActiveId(categoryId);
    }
  }, [intersection?.isIntersecting]);

  return (
    <div className={className} id={title} ref={intersectionRef}>
      <Title text={title} size="lg" className="font-extrabold mb-5" />
      <div className={cn("grid grid-cols-3 gap-[50px]", listClassName)}>
        {products
          .filter((product) => product.variants.length > 0)
          .map((product, i) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              imageUrl={product.imageUrl}
              price={product.variants[0].price}
            />
          ))}
      </div>
    </div>
  );
};