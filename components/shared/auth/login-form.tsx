import React from "react";
import toast from "react-hot-toast";
import { FormProvider, useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { loginFormSchema, LoginFormSchemaType } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormInput, Title } from "@/components/shared";
import { Button } from "@/components/ui";

interface ILoginFormProps {
  onClose: VoidFunction;
}

export const LoginForm: React.FC<ILoginFormProps> = ({ onClose }) => {
  const form = useForm<LoginFormSchemaType>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  const onSubmit = async (data: LoginFormSchemaType) => {
    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (!response?.ok) {
        return toast.error('Неверный E-Mail или пароль', {icon: '❌'});
      }

      onClose();
    } catch (error) {
      console.log("Error [LOGIN]", error);
      toast.error("Не удалось войти", { icon: "❌" });
    }
  };

  return (
    <FormProvider {...form}>
      <form className={"flex flex-col gap-5"} onSubmit={form.handleSubmit(onSubmit)}>
        <div className={"flex justify-between items-center"}>
          <div className="mr-2">
            <Title text="Вход в аккаунт" size="md" className="font-bold" />
            <p className="text-gray-400">Введите свою почту, чтобы войти в свой аккаунт</p>
          </div>
          <img src="/assets/images/phone-icon.png" alt="phone-icon" width={60} height={60} />
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput type="password" name="password" label="Пароль" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base"
          type="submit"
        >
          Войти
        </Button>
      </form>
    </FormProvider>
  );
};
