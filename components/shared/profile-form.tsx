"use client";

import React from "react";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserInfo } from "@/app/actions";
import type { User } from "@prisma/client";
import { registerFormSchema, RegisterFormSchemaType } from "@/schemas";
import { Container, FormInput, Title } from "@/components/shared";
import { Button } from "@/components/ui";

interface IProfileFormProps {
  data: User;
}

export const ProfileForm: React.FC<IProfileFormProps> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: "",
      confirmPassword: ""
    }
  });

  const onSubmit = async (data: RegisterFormSchemaType) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password
      });

      toast.error("Данные обновлены 📝", { icon: "✅" });
    } catch (error) {
      return toast.error("Ошибка при обновлении данных", { icon: "❌" });
    }
  };

  return (
    <Container className="my-10">
      <Title text="Личные данные" size="md" className="font-bold" />

      <FormProvider {...form}>
        <form className="flex flex-col gap-5 w-96 mt-10" onSubmit={form.handleSubmit(onSubmit)}>
          <FormInput name="email" label="E-Mail" required />
          <FormInput name="fullName" label="Полное имя" required />

          <FormInput type="password" name="password" label="Новый пароль" required />
          <FormInput type="password" name="confirmPassword" label="Повторите пароль" required />

          <Button
            disabled={form.formState.isSubmitting}
            className="text-base mt-10"
            type="submit"
          >
            Сохранить
          </Button>

          <Button
            onClick={() => signOut({ callbackUrl: "/" })}
            variant="secondary"
            disabled={form.formState.isSubmitting}
            className="text-base"
            type="button"
          >
            Выйти
          </Button>
        </form>
      </FormProvider>
    </Container>
  );
};
