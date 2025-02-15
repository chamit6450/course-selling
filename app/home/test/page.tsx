"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface Test {
  id: string;
  title: string;
}

export default function TestList() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchTests() {
      try {
        const response = await axios.get<{ success: boolean; tests: Test[] }>("http://localhost:3000/api/tests");
        if (response.data.success) {
          setTests(response.data.tests);
        } else {
          setError("Failed to load tests.");
        }
      } catch (error) {
        setError("Error fetching tests. Please try again later.");
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTests();
  }, []);

  if (loading) return <div className="text-center text-white">Loading tests...</div>;

  if (error)
    return <div className="text-center text-red-500 font-medium">{error}</div>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Available Tests</h1>
      {tests.length === 0 ? (
        <p className="text-gray-400">No tests available.</p>
      ) : (
        <ul>
          {tests.map((test) => (
            <li
              key={test.id}
              className="p-4 bg-gray-800 rounded-lg mb-4 cursor-pointer hover:bg-gray-700"
              onClick={() => router.push(`/home/test/${test.id}`)}
            >
              {test.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
