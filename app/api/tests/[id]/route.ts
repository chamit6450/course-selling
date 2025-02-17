import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest,res:NextResponse, { params }: { params: { id: string } }) {
  const id = params.id;

  if (!id) {
    return NextResponse.json({ success: false, message: "Test ID is required" }, { status: 400 });
  }

  try {
    const test = await prisma.test.findUnique({
      where: { id },
      include: { questions: true },
    });

    if (!test) {
      return NextResponse.json({ success: false, message: "Test not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, test, message: "Test found" });
  } catch (error: unknown) {
    console.error("Error fetching test:", error);

    return NextResponse.json(
      { success: false, message: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
