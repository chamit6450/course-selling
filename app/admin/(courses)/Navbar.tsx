"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear the token or user session data from localStorage or sessionStorage
    localStorage.removeItem("authToken"); // Adjust according to your actual storage

    // Optionally, you can also clear any other session-related data
    sessionStorage.removeItem("user");

    // Redirect the user to the login page or homepage
    router.push("/login"); // You can change this to the desired route after logout
  };

  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-[#060c16] text-white shadow-md shadow-blue-500/20">
      {/* Left Logo */}
      <h1 className="text-lg font-semibold">SkillX</h1>

      {/* Center Navigation */}
      <div className="flex items-center space-x-6 bg-black/20 px-6 py-2 rounded-full shadow-sm shadow-blue-400/20 hover:shadow-blue-500/40 transition-all duration-300">
        <Button variant="ghost" className="text-white rounded-full hover:bg-black/30">
          <Link href="/admin/allcourses">Courses</Link>
        </Button>
        <Button variant="ghost" className="text-white rounded-full hover:bg-black/30">
          <Link href="/admin/create">Add Course</Link>
        </Button>
        <Button variant="ghost" className="text-white rounded-full hover:bg-black/30">
          <Link href="/admin/test/createtest">Add Test</Link>
        </Button>
        <Button variant="ghost" className="text-white rounded-full hover:bg-black/30">
          <Link href="/admin/attendance">Mark attendance</Link>
        </Button>
        
      </div>
        {/* Logout Button */}
        <Button
          variant="ghost"
          className="bg-black/20 text-white px-6 py-2 rounded-full hover:bg-black/30 shadow-sm shadow-blue-400/20 hover:shadow-blue-500/40 transition-all duration-300"
       
          onClick={handleLogout}
        >
          Logout
        </Button>

     
    
    </nav>
  );
}
