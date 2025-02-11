"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function TestList() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchTests() {
      try {
        const response = await axios.get("http://localhost:3000/api/tests");
        setTests(response.data.tests);
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchTests();
  }, []);

  if (loading) return <div className="text-center text-white">Loading tests...</div>;

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Available Tests</h1>
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
    </div>
  );
}
