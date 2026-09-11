import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    name: "Einstein IQ Test",
    status: "ok",
    description:
      "Free online IQ quiz for practice and entertainment. Not a clinical IQ assessment.",
  });
}
