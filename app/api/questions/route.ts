import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// POST - Add question to test
export async function POST(req: Request) {
  try {
    const { testId, text, options, answer } = await req.json();
    const newQuestion = await prisma.question.create({
      data: { testId, text, options, answer },
    });
    return NextResponse.json({ success: true, question: newQuestion });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
