// Генерирует данные
import { prisma } from "./prisma-client";
import {
  cartItem,
  carts,
  categories,
  ingredients,
  pizza_one,
  pizza_three,
  pizza_two,
  products,
  productVariants,
  users
} from "./constants";

async function up() {
  await prisma.user.createMany({
    data: users
  });

  await prisma.category.createMany({
    data: categories
  });

  await prisma.ingredient.createMany({
    data: ingredients
  });

  await prisma.product.createMany({
    data: products
  });

  await prisma.product.create({
    data: pizza_one
  });

  await prisma.product.create({
    data: pizza_two
  });

  await prisma.product.create({
    data: pizza_three
  });

  await prisma.productVariant.createMany({
    data: productVariants
  });

  await prisma.cart.createMany({
    data: carts
  });

  await prisma.cartItem.create({
    data: cartItem
  });
}

// Очищает данные
async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "ProductVariant" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });