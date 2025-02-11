"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      const response = await axios.post("/api/login", formData);
      localStorage.setItem("token", response.data.token);
      setMessage("✅ Login successful! Redirecting...");

      setTimeout(() => {
        router.push("/home");
      }, 1500);
    } catch (error: any) {
      setMessage(error.response?.data?.error || "❌ Login failed");
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      {/* Login Card */}
      <Card className="w-full max-w-md bg-gray-900 p-6 rounded-xl shadow-lg">
        <CardHeader>
        <CardTitle className="text-center text-white text-3xl font-bold">
            Welcome to <span className="text-blue-500">SkillX</span>
          </CardTitle>
          <p className="text-center text-gray-400">Login to access your courses</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-gray-300">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="example@gmail.com"
                className="bg-gray-800 border-gray-700 text-white rounded-xl"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="password" className="text-gray-300">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                className="bg-gray-800 border-gray-700 text-white rounded-xl"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl">
              Login
            </Button>
          </form>
          {message && (
            <p className="mt-2 text-center text-green-400 font-medium">{message}</p>
          )}
          <p className="text-center text-gray-400 text-sm mt-3">
            Don't have an account? <a href="http://localhost:3000/auth/signup" className="text-blue-400 hover:text-blue-500">Sign up here</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
