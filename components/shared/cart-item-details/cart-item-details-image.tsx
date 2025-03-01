import React from "react";
import { cn } from '@/lib';

interface ICartItemDetailsImageProps {
  src: string;
  className?: string;
}

export const CartItemDetailsImage: React.FC<ICartItemDetailsImageProps> = ({ src, className }) => {
  return <img alt={"Pizza Image"} className={cn('w-[60px] h-[60px]', className)} src={src} />;
};
