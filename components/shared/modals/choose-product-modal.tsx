"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent } from "@/components/ui";
import { ProductForm } from "@/components/shared";
import type { ProductWithRelations } from "@/types/prisma";

interface IChooseProductModalProps {
  product: ProductWithRelations;
  className?: string;
}

export const ChooseProductModal: React.FC<IChooseProductModalProps> = ({ className, product }) => {
  const router = useRouter();

  return (
    <Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
      <DialogContent className={cn(className, "p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden")}>
        <ProductForm product={product} handleSubmit={() => router.back()} />
      </DialogContent>
    </Dialog>
  );
};