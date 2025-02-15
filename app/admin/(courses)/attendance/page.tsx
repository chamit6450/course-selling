"use client";
import { useEffect, useState } from "react";
import axios from "axios";

// Define a type for a student
interface Student {
  id: string;
  name: string;
}

// Define a type for the attendance state
type AttendanceState = Record<string, boolean>;

export default function AttendancePage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<AttendanceState>({});
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await axios.get<{ success: boolean; users: Student[] }>(
          "http://localhost:3000/api/login"
        );

        if (response.data.success) {
          setStudents(response.data.users);

          // Initialize attendance state with all students marked as absent
          const initialAttendance: AttendanceState = response.data.users.reduce(
            (acc, student) => {
              acc[student.id] = false;
              return acc;
            },
            {} as AttendanceState
          );

          setAttendance(initialAttendance);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStudents();
  }, []);

  const toggleAttendance = (id: string) => {
    setAttendance((prev) => ({
      ...prev,
      [id]: !prev[id], // Toggle attendance
    }));
  };

  const submitAttendance = () => {
    console.log("Attendance Submitted:", attendance);
    alert("Attendance marked successfully!");
  };

  if (loading) return <div className="text-center text-white">Loading students...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center py-12">
      <h1 className="text-3xl font-bold mb-6">Mark Attendance</h1>
      <div className="w-full max-w-md bg-gray-800 p-6 rounded-lg shadow-lg">
        <ul>
          {students.map((student) => (
            <li key={student.id} className="flex items-center justify-between p-4 border-b border-gray-700">
              <span className="text-lg">{student.name}</span>
              <input
                type="checkbox"
                checked={attendance[student.id] || false}
                onChange={() => toggleAttendance(student.id)}
                className="w-5 h-5"
              />
            </li>
          ))}
        </ul>
        <button
          onClick={submitAttendance}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg shadow-lg transition"
        >
          Submit Attendance
        </button>
      </div>
    </div>
  );
}
