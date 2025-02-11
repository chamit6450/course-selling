"use client";
import { useEffect, useRef } from "react";
import { redirect, useRouter } from "next/navigation";

export default function TailwindHero() {
  const cursorRef = useRef(null);
   const router = useRouter();

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (cursorRef.current) {
        requestAnimationFrame(() => {
          cursorRef.current.style.transform = `translate(${e.clientX - 128}px, ${e.clientY - 128}px)`;
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-[#0c0f19] text-white px-6 overflow-hidden">
      {/* Cursor Hover Effect */}
      <div
        ref={cursorRef}
        className="absolute w-64 h-64 bg-[#20a149]/40 border-2 border-[#20a149] rounded-full blur-3xl transition-transform duration-200 ease-out pointer-events-none"
        style={{ position: "fixed", top: 0, left: 0 }}
      ></div>

      {/* Header Section */}
      <div className="text-center max-w-4xl relative z-10">
        <p className="text-gray-400 text-sm uppercase tracking-wide">
          Enhance Your Learning with <span className="text-[#FFD700]">Interactive Tests</span>
        </p>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter">
          Master Your <span className="text-[#e6cb37] font-semibold">Courses</span> <br />
          <span className="inline-block">with Engaging Quizzes and Assessments.</span>
        </h1>
      </div>

      {/* Subtext Section */}
      <div className="text-center max-w-3xl mt-6 relative z-10">
        <p className="text-lg text-gray-300 font-medium">
          Improve your knowledge through structured <span className="text-[#20a149] font-semibold">Course Content</span> and test your understanding with interactive <span className="text-[#20a149] font-semibold">Quizzes</span>. Track your progress and achieve your learning goals effectively.
        </p>
      </div>

      {/* Buttons Section */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-8 relative z-10">
        <button onClick={() => router.push('/home/view')}
         className="bg-gray-200 text-black px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-300 transition">
          Start Learning
        </button>
        <div className="flex items-center bg-gray-800 text-gray-400 px-4 py-3 rounded-full">
          
          <button onClick={() => router.push('/home/test')} className="mr-2">📝 Take a Test</button>
        </div>
        
      </div>
    </div>
  );
}