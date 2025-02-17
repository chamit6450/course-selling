"use client";
import { useState } from "react";
import axios from "axios";

interface Question {
  text: string;
  options: string[];
  answer: string;
}

export default function AdminPanel() {
  const [title, setTitle] = useState<string>("");
  const [questions, setQuestions] = useState<Question[]>([
    { text: "", options: ["", "", "", ""], answer: "" },
  ]);
  const [loading, setLoading] = useState<boolean>(false);

  function addQuestion() {
    setQuestions([...questions, { text: "", options: ["", "", "", ""], answer: "" }]);
  }

  function updateQuestion<K extends keyof Question>(
    index: number,
    field: K,
    value: Question[K]
  ) {
    setQuestions((prev) =>
      prev.map((q, i) => (i === index ? { ...q, [field]: value } : q))
    );
  }

  async function createTest() {
    if (!title || questions.some((q) => !q.text || !q.answer || q.options.some((opt) => !opt))) return;

    setLoading(true);
    try {
      await axios.post("https://course-selling-q13g.vercel.app/api/tests", { title, questions });
      alert("Test created successfully!");
      setTitle("");
      setQuestions([{ text: "", options: ["", "", "", ""], answer: "" }]);
    } catch (error) {
      console.error("Error creating test:", error);
      alert("Error creating test. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen text-black bg-gray-100 flex flex-col items-center justify-center py-12">
      <div className="bg-white text-black rounded-lg shadow-2xl p-8 w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Create a New Test</h1>
        <div className="mb-6">
          <label htmlFor="title" className="block text-lg font-medium text-gray-600 mb-2">
            Test Title
          </label>
          <input
            type="text"
            id="title"
            placeholder="Enter Test Title"
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {questions.map((q, idx) => (
          <div key={idx} className="mb-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-50">
            <h2 className="text-2xl font-semibold mb-4 text-gray-700">Question {idx + 1}</h2>
            <div className="mb-4">
              <label htmlFor={`question-${idx}`} className="block text-md font-medium text-gray-600 mb-2">
                Question Text
              </label>
              <input
                type="text"
                id={`question-${idx}`}
                placeholder="Enter Question Text"
                className="w-full text-black p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={q.text}
                onChange={(e) => updateQuestion(idx, "text", e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="block text-md text-black font-medium text-gray-600 mb-2">Options</label>
              {q.options.map((option, i) => (
                <input
                  key={i}
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  className="w-full p-3 border text-black border-gray-300 rounded-lg shadow-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={option}
                  onChange={(e) => {
                    const updatedOptions = [...q.options];
                    updatedOptions[i] = e.target.value;
                    updateQuestion(idx, "options", updatedOptions);
                  }}
                />
              ))}
            </div>

            <div className="mb-4">
              <label htmlFor={`answer-${idx}`} className="block text-md font-medium text-gray-600 mb-2">
                Correct Answer
              </label>
              <input
                type="text"
                id={`answer-${idx}`}
                placeholder="Enter Correct Answer (e.g., A, B, C, D)"
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={q.answer}
                onChange={(e) => updateQuestion(idx, "answer", e.target.value)}
              />
            </div>
          </div>
        ))}

        <div className="flex items-center justify-between">
          <button
            onClick={addQuestion}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300"
          >
            Add Question
          </button>

          <button
            onClick={createTest}
            disabled={loading}
            className={`bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transition duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Creating..." : "Create Test"}
          </button>
        </div>
      </div>
    </div>
  );
}