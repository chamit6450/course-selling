import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        if (!body.courseName || !body.content) {
            return NextResponse.json({ error: "Course name and content are required" }, { status: 400 });
        }

        const course = await prisma.course.create({
            data: {
                coursename: body.courseName,
                description: body.description || "",
                content: body.content,
            },
        });

        return NextResponse.json({ msg: "Course added successfully", course }, { status: 201 });
    } catch (error: unknown) {
        console.error("Error adding course:", error);
        return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
    }
}

export async function GET() {
    try {
        console.log("Connecting to database...");
        const courses = await prisma.course.findMany({
            select: {
                id: true,
                coursename: true,
                description: true,
                content: true
            },
        });

        console.log("Fetched Courses:", courses);

        return NextResponse.json({ message: "Courses fetched successfully", courses });
    } catch (error) {
        console.error("Database connection error:", error);
        return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
    }
}
export async function DELETE(req: NextRequest) {
    try {
        const { id } = await req.json();

        if (!id) {
            return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
        }

        await prisma.course.delete({
            where: { id },
        });

        return NextResponse.json({ message: "Course deleted successfully" }, { status: 200 });
    } catch (error: unknown) {
        console.error("Error deleting course:", error);
        return NextResponse.json({ error: "Internal Server Error", details: (error as Error).message }, { status: 500 });
    }
}
