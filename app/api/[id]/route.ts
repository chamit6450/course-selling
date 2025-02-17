import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export async function GET(req: NextRequest, res:NextResponse, { params }: { params: { id: string } }) {
// export async function GET(req: NextRequest, res:NextResponse, { params: { id: string } }) {
    try {
        const id  = params.id; 
        
        const course = await prisma.course.findUnique({
            where: { id },
        });

        if (!course) {
            return NextResponse.json({ error: "Course not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, course });
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Failed to fetch course" }, { status: 500 });
    }
}
