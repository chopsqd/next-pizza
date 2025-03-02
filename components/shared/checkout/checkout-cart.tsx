import React from "react";
import { CheckoutItem, CheckoutItemSkeleton, WhiteBlock } from "@/components/shared";
import type { ICartState } from "@/store";

interface ICheckoutCartProps {
  loading: boolean
  items: ICartState['items']
  onClickCount: ICartState['updateItemQuantity']
  onClickRemove: ICartState['removeCartItem']
  getDetails: ICartState['getCartItemDetails']
  className?: string
}

export const CheckoutCart: React.FC<ICheckoutCartProps> = ({
  items,
  loading,
  onClickCount,
  onClickRemove,
  getDetails,
  className
}) => {
  return (
    <WhiteBlock title={"1. Корзина"} className={className}>
      <div className={"flex flex-col gap-5"}>
        {loading
          ? [...Array(4)].map((_, idx) => (
            <CheckoutItemSkeleton key={idx} />
          ))
          : items.map((item) => (
            <CheckoutItem
              key={item.id}
              name={item.name}
              price={item.price}
              disabled={item.disabled}
              imageUrl={item.imageUrl}
              quantity={item.quantity}
              details={getDetails(item)}
              onClickCountButton={type => onClickCount(item.id, item.quantity, type)}
              onClickRemove={() => onClickRemove(item.id)}
            />
          ))
        }
      </div>
    </WhiteBlock>
  );
};
