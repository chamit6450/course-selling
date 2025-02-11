"use client";
import axios from "axios";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function Page() {
  const [coursename, setCoursename] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState(""); // ✅ Fixed: Added state for content
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

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
    } catch (err: any) {
      setError(err.response ? err.response.data.error : "An error occurred");
    } finally {
      setLoading(false);
    }
  }

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
                placeholder="Brief Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="content">Content</Label>
              <Textarea
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
      {/* ✅ Success/Error Messages */}
      {error && alert("course not added")}
      {success && alert("Course added successfully")}
      </Card>

    </div>
  );
}
