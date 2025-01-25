import React from "react";
import { cn } from "@/lib/utils";
import { Categories, Container, SortPopup } from "@/components/shared";

interface ITopBarProps {
  className?: string;
}

export const TopBar: React.FC<ITopBarProps> = ({ className }) => {
  return (
    <div className={cn("sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10", className)}>
      <Container className="flex items-center justify-between ">
        <Categories />
        <div className="flex items-center">
          <SortPopup />
          {/*<CartButton*/}
          {/*  className={cn(*/}
          {/*    'transition-all',*/}
          {/*    !cartVisible ? 'invisible w-0 p-0 opacity-0' : 'visible ml-5 opacity-100',*/}
          {/*  )}*/}
          {/*/>*/}
        </div>
      </Container>
    </div>
  );
};