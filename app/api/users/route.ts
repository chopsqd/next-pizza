import { NextResponse } from "next/server";

export function GET() {
  try {
    return NextResponse.json({
      users: [1, 2, 3, 4, 5]
    })
  } catch (error) {
    console.log('[USERS_GET] Server error', error);
    return NextResponse.json({ message: 'Во время обработки запроса произошла ошибка' }, { status: 500 });
  }
}