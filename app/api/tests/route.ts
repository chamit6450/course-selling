import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// GET all tests
export async function GET() {
  try {
    const tests = await prisma.test.findMany({ include: { questions: true } });
    return NextResponse.json({ success: true, tests });
  } catch (error: unknown) {
    console.error("Error fetching tests:", error);

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}

// POST - Create a test with multiple questions
export async function POST(req: Request) {
  try {
    const { title, questions } = await req.json();

    if (!title || !questions || questions.length === 0) {
      return NextResponse.json(
        { success: false, error: "Title and at least one question are required" },
        { status: 400 }
      );
    }

    const newTest = await prisma.test.create({
      data: {
        title,
        questions: {
          create: questions.map((q: { text: string; options: string[]; answer: string }) => ({
            text: q.text,
            options: q.options,
            answer: q.answer,
          })),
        },
      },
      include: { questions: true },
    });

    return NextResponse.json({ success: true, test: newTest });
  } catch (error: unknown) {
    console.error("Error creating test:", error);

    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : "An unknown error occurred" },
      { status: 500 }
    );
  }
}
