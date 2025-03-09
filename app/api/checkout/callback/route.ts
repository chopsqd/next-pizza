import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import type { CartItem, ProductVariant, Product } from "@prisma/client";
import { OrderStatus} from "@prisma/client";
import { sendEmail } from "@/lib";

type PaymentCallbackDataType = {
  type: string;
  event: string;
  object: {
    id: string;
    status: string;
    amount: { value: string; currency: "RUB" };
    income_amount: { value: string; currency: "RUB" };
    description: string;
    recipient: { account_id: string; gateway_id: string };
    payment_method: {
      type: string;
      id: string;
      saved: boolean;
      title: string;
    };
    captured_at: string;
    created_at: string;
    test: boolean;
    refunded_amount: { value: string; currency: "RUB" };
    paid: boolean;
    refundable: true;
    metadata: { order_id: string };
    authorization_details: {
      rrn: string;
      auth_code: string;
    };
  };
};

type OrderItemType = CartItem & { productVariant: ProductVariant & { product: Product } }

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as PaymentCallbackDataType;

    const order = await prisma.order.findFirst({
      where: {
        id: Number(body.object.metadata.order_id)
      }
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" });
    }

    await prisma.order.update({
      where: {
        id: order.id
      },
      data: {
        status: OrderStatus.SUCCEEDED
      }
    });

    const items = JSON.parse(order?.items as string) as Array<OrderItemType>;

    const html = `
      <h1>Спасибо за покупку!</h1>
  
      <p>Ваш заказ #${order?.id} оплачен. Список товаров:</p>
  
      <ul>
        ${items
          .map((item) => `<li>${item.productVariant.product.name} | (${item.productVariant.price} ₽ x ${item.quantity} шт.)</li>`)
          .join("")
        }
      </ul>
    `;

    await sendEmail(order.email, `Next Pizza | Заказ #${order?.id} оформлен!`, html)
  } catch (error) {
    console.log("[CHECKOUT_CALLBACK_POST] Server error", error);
    return NextResponse.json({ message: "Во время обработки запроса произошла ошибка" }, { status: 500 });
  }
}