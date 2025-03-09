"use client";

import React from "react";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCart } from "@/hooks";
import { cn } from "@/lib";
import { CheckoutSidebar, Container, Title } from "@/components/shared";
import * as Checkout from "@/components/shared/checkout";
import { checkoutFormSchema, CheckoutFormSchemaType } from "@/schemas";
import { createOrder } from "@/app/actions";
import { Api } from "@/services/api-client";

const VAT = 15;
const DELIVERY_PRICE = 250;

export default function CheckoutPage() {
  const {data: session} = useSession()
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const {
    items,
    totalAmount,
    loading,
    getCartItemDetails,
    updateItemQuantity,
    removeCartItem
  } = useCart();

  const form = useForm<CheckoutFormSchemaType>({
    resolver: zodResolver(checkoutFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      comment: ""
    }
  });

  const onSubmit: SubmitHandler<CheckoutFormSchemaType> = async (data) => {
    try {
      setIsSubmitting(true);

      const url = await createOrder(data);

      toast.error("Заказ успешно оформлен! 📝 Переход на оплату...", { icon: "✅" });

      if (url) {
        location.href = url;
      }
    } catch (error) {
      console.log(error);
      setIsSubmitting(false);
      toast.error("Не удалось создать заказ", { icon: "❌" });
    }
  };

  const fetchUserInfo = async () => {
    const data = await Api.auth.getMe();
    const [firstName, lastName] = data.fullName.split(' ');

    form.setValue('firstName', firstName);
    form.setValue('lastName', lastName);
    form.setValue('email', data.email);
  }

  React.useEffect(() => {
    if (session) {
      fetchUserInfo()
    }
  }, [session])

  const vatPrice = (totalAmount * VAT) / 100;
  const totalPrice = totalAmount + DELIVERY_PRICE + vatPrice;

  return (
    <Container className={"mt-10"}>
      <Title text={"Оформление заказа"} className={"font-extrabold mb-8 text-[36px]"} />

      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={"flex gap-10"}
        >
          <div className={"flex flex-col gap-10 flex-1 mb-20"}>
            <Checkout.Cart
              items={items}
              loading={loading}
              onClickCount={updateItemQuantity}
              onClickRemove={removeCartItem}
              getDetails={getCartItemDetails}
            />

            <Checkout.PersonalInfo className={cn({ "opacity-40 pointer-events-none": loading })} />

            <Checkout.Address className={cn({ "opacity-40 pointer-events-none": loading })} />
          </div>

          <div className={"w-[450px]"}>
            <CheckoutSidebar
              loading={loading || isSubmitting}
              totalAmount={totalAmount}
              deliveryPrice={DELIVERY_PRICE}
              totalPrice={totalPrice}
              vatPrice={vatPrice}
            />
          </div>
        </form>
      </FormProvider>
    </Container>
  );
}