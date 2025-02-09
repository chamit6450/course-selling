"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./../../components/CourseCard";
import { Skeleton } from "@/components/ui/skeleton"

export default function CoursePage() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/admin/courses/api");
        // D:\Cohort 3\course\app\admin\courses\api\route.ts
        console.log("API Response:", response.data);
        setCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setCourses([]);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return(
    <div className=" ml-20 mt-10 flex">
      <div className="space-y-2 mt-8 mr-8">
        <Skeleton className="h-8 w-[350px] border-2" />
        <Skeleton className="h-8 w-[350px] border-2" />
        <Skeleton className="h-8 w-[350px] border-2" />
      </div>
      <div className="space-y-2 mt-8 mr-8">
        <Skeleton className="h-8 w-[350px] border-2" />
        <Skeleton className="h-8 w-[350px] border-2" />
        <Skeleton className="h-8 w-[350px] border-2" />
      </div>
      <div className="space-y-2 mt-8 mr-8">
        <Skeleton className="h-8 w-[350px] border-2 " />
        <Skeleton className="h-8 w-[350px] border-2" />
        <Skeleton className="h-8 w-[350px] border-2" />
      </div>
      </div>   
  )

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-white mb-4">My Courses</h1>

      {courses.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              id={course.id} // ✅ Pass course ID
              title={course.coursename}
              description={course.description}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-400">No courses available</p>
      )}
    </div>
  );
}
