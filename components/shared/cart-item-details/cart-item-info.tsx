import React from "react";
import { cn } from "@/lib";

interface ICartItemInfoProps {
  name: string;
  details: string;
  className?: string;
}

export const CartItemInfo: React.FC<ICartItemInfoProps> = ({ name, details, className }) => {
  return (
    <div>
      <div className={cn("flex items-center justify-between", className)}>
        <h2 className="text-lg font-bold flex-1 leading-6">{name}</h2>
      </div>
      <p className="text-xs text-gray-400 w-[90%]">{details}</p>
    </div>
  );
};
