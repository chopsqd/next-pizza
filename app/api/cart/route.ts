import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";
import { updateCartTotalAmount } from "@/app/api/utils";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("cartToken")?.value;

    if (!token) {
      return NextResponse.json({ totalAmount: 0, items: [] });
    }

    const userCart = await prisma.cart.findFirst({
      where: {
        token
      },
      include: {
        items: {
          orderBy: {
            createdAt: "desc"
          },
          include: {
            productVariant: {
              include: {
                product: true
              }
            },
            ingredients: true
          }
        }
      }
    });

    return NextResponse.json(userCart);
  } catch (error) {
    console.log("[CART_GET] Server error", error);
    return NextResponse.json({ message: "Во время обработки запроса произошла ошибка" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const data = (await req.json()) as { productVariantId: number, ingredients?: number[] };
    let token = req.cookies.get("cartToken")?.value;

    if (!token) {
      token = crypto.randomUUID();
    }

    let userCart = await prisma.cart.findFirst({
      where: { token }
    });

    if (!userCart) {
      userCart = await prisma.cart.create({
        data: { token }
      });
    }

    const findCartItem = await prisma.cartItem.findFirst({
      where: {
        cartId: userCart.id,
        productVariantId: data.productVariantId,
        ingredients: {
          every: {
            id: { in: data.ingredients }
          }
        }
      }
    });

    // Если товар был найден, делаем +1 к количеству
    if (findCartItem) {
      await prisma.cartItem.update({
        where: {
          id: findCartItem.id
        },
        data: {
          quantity: findCartItem.quantity + 1
        }
      });
    } else {
      await prisma.cartItem.create({
        data: {
          cartId: userCart.id,
          productVariantId: data.productVariantId,
          quantity: 1,
          ingredients: { connect: data.ingredients?.map((id) => ({ id })) }
        }
      });
    }

    const updatedUserCart = await updateCartTotalAmount(token);

    const response = NextResponse.json(updatedUserCart);
    response.cookies.set("cartToken", token);

    return response;
  } catch (error) {
    console.log("[CART_POST] Server error", error);
    return NextResponse.json({ message: "Во время обработки запроса произошла ошибка" }, { status: 500 });
  }
}