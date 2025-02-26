"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface IVariant {
  name: string;
  value: string;
  disabled?: boolean;
}

interface IGroupVariantsProps {
  items: readonly IVariant[];
  onClick?: (value: IVariant["value"]) => void;
  selectedValue?: IVariant["value"];
  className?: string;
}

export const GroupVariants: React.FC<IGroupVariantsProps> = ({ items, onClick, selectedValue, className }) => {
  return (
    <div className={cn(className, "flex justify-between bg-[#F3F3F7] rounded-3xl p-1 select-none")}>
      {items.map((item) => (
        <div
          key={item.name}
          onClick={() => onClick?.(item.value)}
          className={cn(
            "flex items-center justify-center cursor-pointer h-[30px] px-5 flex-1 rounded-3xl transition-all duration-400 text-sm",
            {
              "bg-white shadow": item.value === selectedValue,
              "text-gray-500 opacity-50 pointer-events-none": item.disabled
            }
          )}>
          {item.name}
        </div>
      ))}
    </div>
  );
};