import React from "react";
import { cn } from "@/lib/utils";
import { Categories, Container, SortPopup } from "@/components/shared";
import type { Category } from "@prisma/client";

interface ITopBarProps {
  className?: string;
  categories: Category[]
}

export const TopBar: React.FC<ITopBarProps> = ({ className, categories }) => {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
      <Container className="flex items-center justify-between ">
        <Categories categories={categories} />
        <div className="flex items-center">
          <SortPopup />
        </div>
      </Container>
    </div>
  );
};