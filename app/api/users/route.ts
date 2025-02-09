import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.json({
    users: [1,2,3,4,5]
  })
}