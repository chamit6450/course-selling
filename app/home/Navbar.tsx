"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import React from "react";
import { useRouter } from "next/navigation"; // We need this for redirection

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear authentication data from localStorage (or sessionStorage)
    localStorage.removeItem("authToken"); // Replace with your actual storage key
    sessionStorage.removeItem("user"); // Replace with your actual session data if necessary

    // Redirect user to the login page or home page after logout
    router.push("https://course-selling-q13g.vercel.app/auth/login"); // Adjust path to your actual login route
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#060c16] text-white shadow-md shadow-blue-500/20">
      {/* Left Logo */}
      <h1 className="text-lg font-semibold">SkillX</h1>

      {/* Center Navigation */}
      <div className="flex items-center space-x-6 bg-black/20 px-6 py-2 rounded-full shadow-sm shadow-blue-400/20 hover:shadow-blue-500/40 transition-all duration-300">
        <Button variant="ghost" className="text-white rounded-full hover:bg-black/30">
          <Link href="https://course-selling-q13g.vercel.app/home">Home</Link>
        </Button>
        <Button variant="ghost" className="text-white rounded-full hover:bg-black/30">
          <Link href="https://course-selling-q13g.vercel.app/home/view">Courses</Link>
        </Button>
        <Button variant="ghost" className="text-white rounded-full hover:bg-black/30">
          <Link href="https://course-selling-q13g.vercel.app/home/test">Tests</Link>
        </Button>
        <Button variant="ghost" className="text-white rounded-full hover:bg-black/30">
          <Link href="https://course-selling-q13g.vercel.app/home/feedback">Feedback</Link>
        </Button>
      </div>

      {/* Right Logout Button */}
      <Button
        variant="ghost"
        className="bg-black/20 text-white px-6 py-2 rounded-full hover:bg-black/30 shadow-sm shadow-blue-400/20 hover:shadow-blue-500/40 transition-all duration-300"
        onClick={handleLogout} // Attach logout handler to the button
      >
        Log Out
      </Button>
    </nav>
  );
}
