"use server";

import { hashSync } from "bcrypt";
import { cookies } from "next/headers";
import type { CheckoutFormSchemaType } from "@/schemas";
import { prisma } from "@/prisma/prisma-client";
import { OrderStatus, Prisma } from "@prisma/client";
import { createPayment, sendEmail } from "@/lib";
import { getUserSession } from "@/app/api/utils";

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
    });

    const paymentData = await createPayment({
      orderId: order.id,
      amount: order.totalAmount,
      description: `Оплата заказа #${order.id}`
    });

    if (!paymentData) {
      throw new Error("Payment data not found");
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

    await sendEmail(data.email, `Next Pizza | Оплатите заказ #${order.id}`, html);

    return paymentData.confirmation.confirmation_url;
  } catch (error) {
    console.log("[CREATE_ORDER] Server error:", error);
    throw error;
  }
}

export async function updateUserInfo(body: Prisma.UserUpdateInput) {
  try {
    const currentUser = await getUserSession();

    if (!currentUser) {
      throw new Error("Пользователь не найден");
    }

    const findUser = await prisma.user.findFirst({
      where: {
        id: Number(currentUser.id)
      }
    });

    await prisma.user.update({
      where: {
        id: Number(currentUser.id)
      },
      data: {
        fullName: body.fullName,
        email: body.email,
        password: body.password
          ? hashSync(body.password as string, 10)
          : findUser?.password
      }
    });
  } catch (error) {
    console.log("[UPDATE_USER] Server error:", error);
    throw error;
  }
}

export async function registerUser(body: Prisma.UserCreateInput) {
  try {
    const user = await prisma.user.findFirst({
      where: {
        email: body.email
      }
    });

    if (user) {
      throw new Error(user.verified ? "Пользователь уже существует" : "Почта не подтверждена");
    }

    const createdUser = await prisma.user.create({
      data: {
        fullName: body.fullName,
        email: body.email,
        password: hashSync(body.password, 10)
      }
    });

    const code = Math.floor(100000 + Math.random() * 900000).toString();

    await prisma.verificationCode.create({
      data: {
        code,
        userId: createdUser.id
      }
    });

    const html = `
      <p>Код подтверждения: <h2>${code}</h2></p>
      <p>
        <a href="http://localhost:3000/api/auth/verify?code=${code}">
          Подтвердить регистрацию
        </a>
      </p>
    `;

    await sendEmail(createdUser.email, 'Next Pizza | Подтверждение регистрации', html);
  } catch (error) {
    console.log("[REGISTER_USER] Server error:", error);
    throw error;
  }
}