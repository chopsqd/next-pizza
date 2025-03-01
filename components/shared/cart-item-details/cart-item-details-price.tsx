import React from "react";
import { cn } from '@/lib';

interface ICartItemDetailsPriceProps {
  value: number;
  className?: string;
}

export const CartItemDetailsPrice: React.FC<ICartItemDetailsPriceProps> = ({ value, className }) => {
  return <h2 className={cn('font-bold', className)}>{value} ₽</h2>;
};
