"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function TestDetails() {
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    async function fetchTest() {
      try {
        const response = await axios.get(`http://localhost:3000/api/tests/${id}`);
        setTest(response.data.test);
      } catch (error) {
        console.error("Error fetching test:", error);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchTest();
  }, [id]);

  if (loading) return <div className="text-center text-white">Loading test details...</div>;

  if (!test) return <div className="text-center text-white">Test not found.</div>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">{test.title}</h1>
      <ul>
  {test.questions.map((q) => (
    <li key={q.id} className="p-4 bg-gray-800 rounded-lg mb-4">
      <p className="font-semibold">{q.text}</p> {/* ✅ Question */}
      <div className="mt-2">
        {q.options.map((option, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="radio"
              id={`question-${q.id}-option-${index}`}
              name={`question-${q.id}`}
              value={option}
              className="mr-2 accent-green-400" // Custom color for radio button
            />
            <label htmlFor={`question-${q.id}-option-${index}`} >
              {option}
            </label>
          </div>
        ))}
      </div>
    </li>
  ))}
</ul>

<div className="mt-4">
  <button
    type="submit"
    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
  >
    Submit
  </button>
</div>
      <button
        onClick={() => router.push("/tests")}
        className="mt-4 bg-blue-500 px-4 py-2 rounded"
      >
        Back to Tests
      </button>
    </div>
  );
}
