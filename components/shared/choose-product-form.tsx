import React from "react";
import { cn } from "@/lib/utils";
import { Title } from "@/components/shared";
import { Button } from "@/components/ui";

interface IChooseProductFormProps {
  imageUrl: string;
  name: string;
  onClickAdd?: VoidFunction;
  className?: string;
}

export const ChooseProductForm: React.FC<IChooseProductFormProps> = ({
 name,
 imageUrl,
 onClickAdd,
 className
}) => {
  return (
    <div className={cn(className, "flex flex-1")}>
      <div className="flex items-center justify-center flex-1 relative w-full">
        <img
          src={imageUrl}
          alt={name}
          className="relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]"
        />
      </div>

      <div className={"w-[490px] bg-[#F7F6F5] p-7"}>
        <Title text={name} size={"md"} className={"font-extrabold mb-1"} />

        <p className="text-gray-400">{123}</p>

        <Button
          loading={false}
          onClick={() => {}}
          className="h-[55px] px-10 text-base rounded-[18px] w-full mt-10">
          Добавить в корзину за {350} ₽
        </Button>
      </div>
    </div>
  );
};