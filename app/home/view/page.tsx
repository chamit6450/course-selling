"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../../components/CourseCard";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname } from "next/navigation";

interface Course {
  id: string;
  coursename: string;
  description: string;
}

export default function CoursePage() {
  const pathname = usePathname();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get<{ courses: Course[] }>("http://localhost:3000/api/courses");
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load courses.");
        setCourses([]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <p className="text-gray-400">{pathname}</p>
      <h1 className="text-2xl font-bold text-white mb-4">My Courses</h1>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-40 w-full border-2 rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course.id} id={course.id} title={course.coursename} description={course.description} />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No courses available</p>
      )}
    </div>
  );
}
