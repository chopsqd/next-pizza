"use client"

import React from "react";
import { useFormContext } from "react-hook-form";
import { X } from "lucide-react";
import { Input } from "@/components/ui";

interface IFormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  required?: boolean;
  className?: string;
}

export const FormInput: React.FC<IFormInputProps> = ({ className, name, label, required, ...props }) => {
  const { register, formState: { errors }, watch, setValue } = useFormContext();

  const value = watch(name);
  const errorText = errors[name]?.message as string;

  return (
    <div className={className}>
      {label && (
        <p className="font-medium mb-2">
          {label} {required && <span className="text-red-500">*</span>}
        </p>
      )}

      <div className="relative">
        <Input className="h-12 text-md" {...register(name)} {...props} />

        {value && (
          <button
            onClick={() => setValue(name, "", { shouldValidate: true })}
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-30 hover:opacity-100 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {errorText && <p className={"text-red-500 text-sm mt-2"}>{errorText}</p>}
    </div>
  );
};