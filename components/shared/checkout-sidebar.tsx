import React from "react";
import { ArrowRight, Package, Percent, Truck } from "lucide-react";
import { cn } from "@/lib";
import { Button, Skeleton } from "@/components/ui";
import { WhiteBlock } from "./white-block";

interface ICheckoutSidebarProps {
  loading: boolean;
  totalAmount: number;
  totalPrice: number;
  vatPrice: number;
  deliveryPrice: number;
  className?: string;
}

export const CheckoutSidebar: React.FC<ICheckoutSidebarProps> = ({
 totalAmount,
 loading,
 totalPrice,
 vatPrice,
 deliveryPrice,
 className
}) => {
  return (
    <WhiteBlock className={cn('p-6 sticky top-4', className)}>
      <div className="flex flex-col gap-1">
        <span className="text-xl">Итого:</span>
        {loading
          ? <Skeleton className={"h-11 w-48"}/>
          : <span className="h-11 text-[34px] font-extrabold">{totalPrice} ₽</span>
        }
      </div>

      <div className="flex my-4">
        <span className="flex flex-1 text-lg text-neutral-500">
          <div className={"flex items-center"}>
            <Package size={18} className={"mr-2 text-gray-300"}/>
            Стоимость корзины:
          </div>
          <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
        </span>

        {loading
          ? <Skeleton className={"h-6 w-16 rounded-[6px]"}/>
          : <span className="font-bold text-lg">{totalAmount} ₽</span>
        }
      </div>

      <div className="flex my-4">
        <span className="flex flex-1 text-lg text-neutral-500">
          <div className={"flex items-center"}>
            <Percent size={18} className={"mr-2 text-gray-300"}/>
            Налоги:
          </div>
          <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
        </span>

        {loading
          ? <Skeleton className={"h-6 w-16 rounded-[6px]"}/>
          : <span className="font-bold text-lg">{vatPrice} ₽</span>
        }
      </div>

      <div className="flex my-4">
        <span className="flex flex-1 text-lg text-neutral-500">
          <div className={"flex items-center"}>
            <Truck size={18} className={"mr-2 text-gray-300"}/>
            Доставка:
          </div>
          <div className="flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2" />
        </span>

        {loading
          ? <Skeleton className={"h-6 w-16 rounded-[6px]"}/>
          : <span className="font-bold text-lg">{deliveryPrice} ₽</span>
        }
      </div>

      <Button
        loading={loading}
        type="submit"
        className="w-full h-14 rounded-2xl mt-6 text-base font-bold"
      >
        Оформить заказ
        <ArrowRight className="w-5 ml-2" />
      </Button>
    </WhiteBlock>
  );
};
