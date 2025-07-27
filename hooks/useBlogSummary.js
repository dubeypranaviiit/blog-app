"use client";
import { useState } from "react";
import axios from "axios";

const useBlogSummary = () => {
  const [summary, setSummary] = useState("");
  const [language, setLanguage] = useState("English");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
 console.log('hook work');
  const summarize = async (content) => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.post("/api/summarize", {
        content,
        language,
      });
   
      setSummary(res.data.summary || "No summary generated.");
    } catch (err) {
      console.error("Summary error:", err);
      setError("Failed to generate summary.");
    } finally {
      setLoading(false);
    }
  };

  return {
    summary,
    language,
    setLanguage,
    loading,
    error,
    summarize,
  };
};

export default useBlogSummary;
