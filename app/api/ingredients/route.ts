import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany();

    return NextResponse.json(ingredients);
  } catch (error) {
    console.log('[INGREDIENTS_GET] Server error', error);
    return NextResponse.json({ message: 'Во время обработки запроса произошла ошибка' }, { status: 500 });
  }
}