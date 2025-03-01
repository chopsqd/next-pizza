import React from "react";
import { cn } from "@/lib";
import * as CartItem from "@/components/shared";
import { Trash2Icon } from "lucide-react";

interface ICartDrawerItemProps {
  imageUrl: string;
  details: string
  name: string;
  price: number;
  quantity: number;
  disabled?: boolean
  onClickCountButton: (type: "plus" | "minus") => void
  onClickRemoveButton: () => void
  className?: string;
}

export const CartDrawerItem: React.FC<ICartDrawerItemProps> = ({
  imageUrl,
  name,
  price,
  details,
  quantity,
  disabled,
  onClickCountButton,
  onClickRemoveButton,
  className
}) => {
  return (
    <div className={cn("flex bg-white p-5 gap-6", { 'opacity-50 pointer-events-none': disabled }, className)}>
      <CartItem.Image src={imageUrl} />

      <div className={"flex-1"}>
        <CartItem.Info name={name} details={details} />

        <hr className={"my-3"}/>

        <div className="flex items-center justify-between">
          <CartItem.CountButton onClick={onClickCountButton} value={quantity} />

          <div className="flex items-center gap-3">
            <CartItem.Price value={price} />
            <Trash2Icon
              onClick={onClickRemoveButton}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              size={16}
            />
          </div>
        </div>
      </div>
    </div>
  );
};