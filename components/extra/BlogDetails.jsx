
"use client";
import { useParams } from "next/navigation";
import { FiClock, FiTag } from "react-icons/fi";
import LikeShareComment from "./LikeShareComment";
import useBlogSummary from "@/hooks/useBlogSummary";

const BlogDetails = ({ blog }) => {
  const { id } = useParams();
  const {
    summary,
    language,
    setLanguage,
    loading,
    error,
    summarize,
  } = useBlogSummary();

const handleSummarize = () => {
  if (!blog?.description) {
    console.warn("No blog content (description) available to summarize.");
    return;
  }

  summarize(blog.description); 
};

  return (
    <main className="container mx-auto px-4 py-10 max-w-4xl">
      <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>

      {blog.image && (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-[400px] object-cover rounded-xl mb-6"
        />
      )}

      <div className="flex flex-wrap items-center gap-4 mb-6 text-gray-600">
        <div className="flex items-center gap-2">
          <FiClock /> {blog.readingTime || "5 min read"}
        </div>
        <div className="flex items-center gap-2">
          <FiTag /> {blog.category || "Uncategorized"}
        </div>
        <div>{new Date(blog.createdAt).toLocaleDateString()}</div>
      </div>

      <div className="prose max-w-none dark:prose-invert mb-10">
        <p>{blog.description}</p>
        {blog.content?.map((para, idx) => (
          <p key={idx}>{para}</p>
        ))}
      </div>

    
      <div className="bg-white dark:bg-gray-800 p-4 rounded mb-8">
        <h2 className="text-lg font-semibold mb-2">Summarize This Blog</h2>
        <div className="flex gap-4 items-center mb-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="border px-2 py-1 rounded"
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Tamil">Tamil</option>
          </select>

          <button
            onClick={handleSummarize}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {loading ? "Summarizing..." : "Get Summary"}
          </button>
        </div>

        {error && <p className="text-red-500">{error}</p>}

        {summary && (
          <div className="bg-white dark:bg-gray-900 p-3 rounded border dark:border-gray-700">
            <h3 className="font-semibold mb-1">Summary ({language}):</h3>
            <p>{summary}</p>
          </div>
        )}
      </div>

      <LikeShareComment blogId={id} />
    </main>
  );
};

export default BlogDetails;

