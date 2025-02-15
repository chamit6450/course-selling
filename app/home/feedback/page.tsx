"use client";

import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface FormData {
  name: string;
  email: string;
  feedback: string;
}

export default function FeedbackForm() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", feedback: "" });
  const [message, setMessage] = useState<string>("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.feedback) {
      setMessage("❌ Please fill out all fields");
      return;
    }

    try {
      // Simulating an API request
      setTimeout(() => {
        setMessage("✅ Thank you for your feedback!");
        setFormData({ name: "", email: "", feedback: "" });
      }, 1000);
    } catch (error) {
      setMessage("❌ Submission failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex pt-24 justify-center rounded-xl bg-gray-900 text-white px-6">
      <div className="w-full h-1/2 max-w-lg bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Feedback Form</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Your Name"
            className="bg-gray-700 text-white border-gray-600 rounded-xl"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            type="email"
            placeholder="Your Email"
            className="bg-gray-700 text-white border-gray-600 rounded-xl"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
          />
          <Textarea
            placeholder="Your Feedback"
            className="bg-gray-700 text-white border-gray-600"
            rows={4} 
            value={formData.feedback}
            onChange={(e) => setFormData({ ...formData, feedback: e.target.value })}
            required
          />
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-xl">
            Submit Feedback
          </Button>
        </form>
        {message && <p className="mt-3 text-center text-lg font-medium">{message}</p>}
      </div>
    </div>
  );
}
