"use client";
import { useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";

interface Course {
  coursename: string;
  description: string;
  content: string;
}

export default function CourseDetails() {
  const { id } = useParams();
  const pathname = usePathname();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCourse() {
      try {
        const response = await axios.get(`http://localhost:3000/api/courses/${id}`);
        setCourse(response.data.course);
      } catch (err) {
        console.error("Error fetching course:", err);
        setError("Failed to load course details.");
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchCourse();
  }, [id]);

  if (loading)
    return (
      <div className="flex">
        <div className="space-y-2 mt-8 ml-8">
          <Skeleton className="h-8 w-[250px] border-2" />
          <Skeleton className="h-8 w-[950px] border-2" />
          <Skeleton className="h-8 w-[950px] border-2" />
          <Skeleton className="h-8 w-[950px] border-2" />
          <Skeleton className="h-8 w-[950px] border-2" />
        </div>
      </div>
    );

  if (error) return <p className="text-red-500 text-center">{error}</p>;

  if (!course) return <p className="text-white text-center">No course found.</p>;

  return (
    <div className="p-6">
      {pathname}
      <h1 className="text-3xl font-bold text-white">{course?.coursename}</h1>
      <p className="text-gray-400 mt-2">{course?.description}</p>
      <h2 className="text-2xl text-white mt-4">Course Content:</h2>
      <p className="text-gray-300">{course?.content}</p>
    </div>
  );
}
