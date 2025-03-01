import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("query") || "";

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive"
        }
      },
      take: 5
    });

    return NextResponse.json(products);
  } catch (error) {
    console.log('[SEARCH_GET] Server error', error);
    return NextResponse.json({ message: 'Во время обработки запроса произошла ошибка' }, { status: 500 });
  }
}