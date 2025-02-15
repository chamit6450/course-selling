"use client";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const [coursename, setCoursename] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [content, setContent] = useState<string>(""); 
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function postData() {
    if (!coursename || !description || !content) {
      setError("All fields are required!");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const response = await axios.post("/api/courses", {
        courseName: coursename,
        description,
        content,
      });

      setSuccess("Course created successfully!");
      setCoursename("");
      setDescription("");
      setContent(""); 
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.error || "An error occurred");
      } else {
        setError("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  }

  // ✅ Handle alerts outside JSX using useEffect
  useEffect(() => {
    if (error) {
      alert(error);
      setError(null); // Reset error after showing alert
    }
    if (success) {
      alert(success);
      setSuccess(null); // Reset success after showing alert
    }
  }, [error, success]);

  return (
    <div className="flex mt-16 justify-center">
      <Card className="w-[550px]">
        <CardHeader>
          <CardTitle>Create Course</CardTitle>
          <CardDescription>Create a new course with detailed content.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Course Name</Label>
              <Input
                id="name"
                placeholder="Course Name"
                value={coursename}
                onChange={(e) => setCoursename(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                placeholder="Detailed Course Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button onClick={postData} disabled={loading}>
            {loading ? "Posting..." : "Post"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
