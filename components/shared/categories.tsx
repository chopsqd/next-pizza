"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCategoryStore } from "@/store";
import type { Category } from "@prisma/client";

interface ICategoriesProps {
  className?: string;
  categories: Category[]
}

export const Categories: React.FC<ICategoriesProps> = ({ className, categories }) => {
  const categoryActiveId = useCategoryStore((state) => state.activeId);

  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
      {categories.map(({ name, id }, index) => (
        <Link
          key={index}
          href={`/#${name}`}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            categoryActiveId === id && "bg-white shadow-md shadow-gray-200 text-primary"
          )}
        >
          {name}
        </Link>
      ))}
    </div>
  );
};