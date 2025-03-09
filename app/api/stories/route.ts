import { NextResponse } from "next/server";
import { prisma } from "@/prisma/prisma-client";

export async function GET() {
  try {
    const stories = await prisma.story.findMany({
      include: {
        items: true
      }
    });

    return NextResponse.json(stories);
  } catch (error) {
    console.log("[STORIES_GET] Server error", error);
    return NextResponse.json({ message: "Во время обработки запроса произошла ошибка" }, { status: 500 });
  }
}