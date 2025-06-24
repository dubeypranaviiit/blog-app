"use client";
import { useParams } from "next/navigation";
import { FiClock, FiTag } from "react-icons/fi";
import LikeShareComment from "./LikeShareComment";

const BlogDetail = ({ blog }) => {
  const params = useParams();
  const id = params.id;
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

      <LikeShareComment blogId={id} />
    </main>
  );
};

export default BlogDetail;
