"use client";
import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import axios from "axios";
import BlogDetails from "@/components/extra/BlogDetails";
import CheckOut from "@/components/CheckOut";
export default function BlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/api/blogById/${id}`);
         
        setBlog(res.data.blog);
      } catch (err) {
        console.log("Failed to fetch blog:", err);
        setError("Blog not found.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchBlog();
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading blog...</div>;
  if (error || !blog) notFound();

  return (
    <>
      
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <BlogDetails blog={blog} />
        <section className="my-12 px-6">
  <div className="max-w-2xl mx-auto text-center">
    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
      ❤️ Enjoyed this article?
    </h2>
    <p className="text-gray-600 dark:text-gray-300 mt-2">
      If this post helped you, consider supporting us with a small contribution.
      Your support helps us write more helpful blogs!
    </p>

    <div className="mt-6">
     <CheckOut  blogId={blog?._id} />
    </div>
  </div>
        </section>
      </main>
   
    </>
  );
}
