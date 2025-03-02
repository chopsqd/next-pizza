import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormAddress, FormTextarea, WhiteBlock } from "@/components/shared";

interface ICheckoutAddressProps {
  className?: string;
}

export const CheckoutAddress: React.FC<ICheckoutAddressProps> = ({ className }) => {
  const { control } = useFormContext();

  return (
    <WhiteBlock title={"3. Адрес доставки"} className={className}>
      <div className="flex flex-col gap-5">
        <Controller
          control={control}
          name={"address"}
          render={({ field, fieldState }) => (
            <>
              <FormAddress onChange={field.onChange} />
              {fieldState.error && <p className="text-red-500 text-sm mt-2">{fieldState.error.message}</p>}
            </>
          )}
        />
        <FormTextarea
          name={"comment"}
          className={"text-base"}
          placeholder={"Комментарий к заказу"}
          rows={5}
        />
      </div>
    </WhiteBlock>
  );
};