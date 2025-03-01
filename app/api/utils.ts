import { prisma } from "@/prisma/prisma-client";

export async function updateCartTotalAmount(token: string) {
  const userCart = await prisma.cart.findFirst({
    where: { token },
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

  if (!userCart) {
    return;
  }

  const totalAmount = userCart.items.reduce((acc, { productVariant, ingredients, quantity }) => {
    return acc + (productVariant.price + ingredients.reduce((acc, ingredient) => acc + ingredient.price, 0)) * quantity;
  }, 0);

  return await prisma.cart.update({
    where: {
      id: userCart.id
    },
    data: {
      totalAmount
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
}