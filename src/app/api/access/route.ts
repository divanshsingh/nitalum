import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { code } = await request.json();

  if (code !== process.env.ACCESS_CODE) {
    return NextResponse.json(
      { error: "Invalid access code" },
      { status: 401 }
    );
  }

  return NextResponse.json({ success: true });
}