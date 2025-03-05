import React from 'react';
import { cn } from '@/lib';
import { X } from 'lucide-react';
import * as CartItemDetails from "./cart-item-details";

interface ICheckoutItemProps {
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
  details: string
  disabled?: boolean
  className?: string;
  onClickRemove: () => void;
  onClickCountButton: (type: 'plus' | 'minus') => void;
}

export const CheckoutItem: React.FC<ICheckoutItemProps> = ({
  name,
  price,
  imageUrl,
  quantity,
  details,
  disabled,
  className,
  onClickCountButton,
  onClickRemove,
}) => {
  return (
    <div className={cn('flex items-center justify-between', { 'opacity-50 pointer-events-none': disabled }, className)}>
      <div className="flex items-center gap-5 flex-1">
        <CartItemDetails.Image src={imageUrl} />
        <CartItemDetails.Info
          name={name}
          details={details}
        />
      </div>

      <CartItemDetails.Price value={price} />

      <div className="flex items-center gap-5 ml-20">
        <CartItemDetails.CountButton
          onClick={onClickCountButton}
          value={quantity}
        />
        <button
          type={"button"}
          onClick={onClickRemove}
        >
          <X
            size={20}
            className="text-gray-400 cursor-pointer hover:text-gray-600"
          />
        </button>
      </div>
    </div>
  );
};
