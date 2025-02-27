"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface IGroupVariantsProps {
  items: {name: string, value: number, disabled?: boolean}[]
  onClick?: (value: number) => void;
  value?: number;
  className?: string;
}

export const GroupVariants: React.FC<IGroupVariantsProps> = ({ items, onClick, value, className }) => {
  return (
    <div className={cn(className, "flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none")}>
      {items.map((item) => (
        <div
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
            {
              "bg-white shadow": item.value === value,
              "text-gray-500 opacity-50 pointer-events-none": item.disabled
            }
          )}>
          {item.name}
        </div>
      ))}
    </div>
  );
};