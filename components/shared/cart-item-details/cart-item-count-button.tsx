import React from 'react';
import { cn } from '@/lib';
import { CountIconButton } from "./count-icon-button";

interface ICartItemCountButtonProps {
  value?: number;
  size?: 'sm' | 'lg';
  onClick?: (type: 'plus' | 'minus') => void;
  className?: string;
}

export const CartItemCountButton: React.FC<ICartItemCountButtonProps> = ({
  className,
  onClick,
  value = 1,
  size = 'sm',
}) => {
  return (
    <div className={cn('inline-flex items-center justify-between gap-3', className)}>
      <CountIconButton
        disabled={value === 1}
        onClick={() => onClick?.('minus')}
        size={size}
        type="minus"
      />

      <b className={size === 'sm' ? 'text-sm' : 'text-md'}>{value}</b>

      <CountIconButton
        onClick={() => onClick?.('plus')}
        size={size}
        type="plus"
      />
    </div>
  );
};
