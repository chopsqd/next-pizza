import React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

const cats = ["Все", "Комбо", "Закуски"];
const activeIndex = 0;

interface ICategoriesProps {
  className?: string;
}

export const Categories: React.FC<ICategoriesProps> = ({ className }) => {
  return (
    <div className={cn("inline-flex gap-1 bg-gray-50 p-1 rounded-2xl", className)}>
      {cats.map((category, index) => (
        <Link
          key={index}
          className={cn(
            "flex items-center font-bold h-11 rounded-2xl px-5",
            activeIndex === index && "bg-white shadow-md shadow-gray-200 text-primary"
          )}
          href={`/#${category}`}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};