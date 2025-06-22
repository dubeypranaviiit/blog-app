"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiHeart,
  FiShare2,
  FiMessageSquare,
  FiTrash2,
} from "react-icons/fi";
import ShareModal from "./ShareModal";
import { useUser } from "@clerk/nextjs";
//  const params = useParams();
 import  {useParams}  from "next/navigation";
const LikeShareComment = ({ blogId }) => {
   const params = useParams();

  const { user, isSignedIn } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
 const id = params.id;
 console.log(blogId);
 console.log(id);
  // Fetch comments (and likes if using real data)
  const fetchComments = async () => {
    try {
      const blog_Id=blogId;
 const res=await  axios.get(`/api/comments/${blogId}`, {
    params: {
    page: 1,
    limit: 10
  }
});

      setComments(res.data.comments || []);
    } catch (err) {
      console.error("Error loading comments:", err);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [blogId]);
const handleLike = async () => {
  try {
    if (isLiked) {
      await axios.delete(`/api/like/${blogId}`, { data: { userId: user.id } });
      setLikes((prev) => prev - 1);
    } else {
      await axios.post(`/api/like/${blogId}`, { userId: user.id });
      setLikes((prev) => prev + 1);
    }

    setIsLiked(!isLiked);
  } catch (err) {
    console.error("Like/unlike failed", err);
  }
};
useEffect(() => {
  const fetchLikeStatus = async () => {
    try {
      const res = await axios.get(`/api/like/${blogId}/status`, {
        params: { userId: user.id },
      });
      setIsLiked(res.data.isLiked);
    } catch (err) {
      console.error("Error fetching like status", err);
    }
  };

  if (user?.id && blogId) {
    fetchLikeStatus();
  }
}, [blogId, user]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isSignedIn) return;

    const commentData = {
      user: {
        userId: user.id,
        username: user.username || user.fullName || "Anonymous",
      },
      message: newComment,
      id
    };

    try {
      const res = await axios.post(
       `/api/comments/${blogId}`,
        commentData
      );

      setComments([res.data.comment, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };

  const handleDeleteComment = async (commentId) => {
    const confirmDelete = confirm("Delete this comment?");
    if (!confirmDelete) return;

    try {
      await axios.delete(
        `api/comments/${blogId}`,
        {
          headers: {
            "x-user-role": isAdmin ? "admin" : "user",
          },

        }
      );
      setComments(comments.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("Failed to delete comment", err);
      alert("Delete failed");
    }
  };

  return (
    <>
     
      <div className="flex gap-4 mb-6">
        <button
          onClick={handleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-full ${
            isLiked ? "bg-red-100 text-red-500" : "bg-gray-100"
          } hover:bg-gray-200`}
        >
          <FiHeart /> {likes}
        </button>

        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <FiShare2 /> Share
        </button>
      </div>

      {/* Comments Form */}
      {isSignedIn ? (
        <form onSubmit={handleCommentSubmit} className="mb-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            placeholder="Add a comment..."
          />
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Post Comment
          </button>
        </form>
      ) : (
        <p className="mb-4 text-gray-500">Login to comment.</p>
      )}

      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c._id}
            className="bg-gray-50 p-4 rounded-lg relative dark:bg-gray-800"
          >
            <div className="text-sm text-gray-500 mb-1">
              {new Date(c.createdAt).toLocaleString()} •{" "}
              <strong>{c.username}</strong>
            </div>
            <p className="text-gray-800 dark:text-gray-100">{c.message}</p>

            {(user?.id === c.userId || isAdmin) && (
              <button
                onClick={() => handleDeleteComment(c._id)}
                className="absolute top-2 right-2 text-xs text-red-500 hover:underline"
                title="Delete comment"
              >
                <FiTrash2 />
              </button>
            )}
          </div>
        ))}
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={typeof window !== "undefined" ? window.location.href : ""}
      />
    </>
  );
};

export default LikeShareComment;

