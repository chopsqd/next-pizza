"use server";

import { cookies } from "next/headers";
import { prisma } from "@/prisma/prisma-client";
import type { CheckoutFormSchemaType } from "@/schemas";
import { OrderStatus } from "@prisma/client";
import { createPayment, sendEmail } from "@/lib";

export async function createOrder(data: CheckoutFormSchemaType) {
  try {
    const cookieStore = cookies();
    const cartToken = cookieStore.get("cartToken")?.value;

    if (!cartToken) {
      throw new Error("Cart token not found");
    }

    /* Находим корзину по токену */
    const userCart = await prisma.cart.findFirst({
      include: {
        user: true,
        items: {
          include: {
            ingredients: true,
            productVariant: {
              include: {
                product: true
              }
            }
          }
        }
      },
      where: {
        token: cartToken
      }
    });

    /* Проверка данных корзины */
    if (!userCart) {
      throw new Error("Cart not found");
    }

    if (userCart.totalAmount === 0) {
      throw new Error("Cart is empty");
    }

    /* Создаем заказ */
    const order = await prisma.order.create({
      data: {
        token: cartToken,
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phone: data.phone,
        address: data.address,
        comment: data.comment,
        totalAmount: userCart.totalAmount,
        status: OrderStatus.PENDING,
        items: JSON.stringify(userCart.items)
      }
    });

    /* Очищаем корзину */
    await prisma.cart.update({
      where: {
        id: userCart.id
      },
      data: {
        totalAmount: 0
      }
    });

    await prisma.cartItem.deleteMany({
      where: {
        cartId: userCart.id
      }
    })

    const paymentData = await createPayment({
      orderId: order.id,
      amount: order.totalAmount,
      description: `Оплата заказа #${order.id}`
    })

    if (!paymentData) {
      throw new Error('Payment data not found')
    }

    await prisma.order.update({
      where: {
        id: order.id
      },
      data: {
        paymentId: paymentData.id
      }
    });

    const html = `
      <h3>Заказ #${order.id}</h3>
      <p>
        Оплатите заказ на сумму ${order.totalAmount}. 
        Перейдите <a href="${paymentData.confirmation.confirmation_url}">по этой ссылке</a> для оплаты заказа.
      </p>
    `;

    await sendEmail(data.email, `Next Pizza | Оплатите заказ #${order.id}`, html)

    return paymentData.confirmation.confirmation_url;
  } catch (error) {
    console.log("[SERVER ACTION ERROR] Server error:", error);
  }
}