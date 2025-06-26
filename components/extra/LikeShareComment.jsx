"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FiHeart,
  FiShare2,
  FiTrash2,
} from "react-icons/fi";
import ShareModal from "./ShareModal";
import { useUser } from "@clerk/nextjs";
import { useParams } from "next/navigation";

const LikeShareComment = ({ blogId }) => {
  const params = useParams();
  const id = params.id;

  const { user, isSignedIn } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

useEffect(() => {
  const fetchLikeData = async () => {
    try {
      const requests = [axios.get(`/api/like/${blogId}`)];
      if (user?.id) {
        requests.push(
          axios.get(`/api/like/${blogId}/status`, {
            params: { userId: user.id },
          })
        );
      }

      const [countRes, statusRes] = await Promise.all(requests);
      setLikes(countRes.data.count || 0);
      console.log(likes);
      if (statusRes) {
        setIsLiked(statusRes.data.isLiked);
      }
    } catch (err) {
      console.error("Error fetching like data", err);
    }
  };

  if (blogId) fetchLikeData(); 
}, [blogId, user?.id]); 

 
  const fetchComments = async (reset = false) => {
    try {
      const res = await axios.get(`/api/comments/${blogId}`, {
        params: { page: reset ? 1 : page, limit: 5 },
      });

      const newComments = res.data.comments || [];

      if (reset) {
        setComments(newComments);
        setPage(2); // next page
      } else {
        setComments((prev) => [...prev, ...newComments]);
        setPage((prev) => prev + 1);
      }

      if (newComments.length < 5) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error loading comments:", err);
    }
  };

  useEffect(() => {
    if (blogId) {
      setPage(1);
      setHasMore(true);
      fetchComments(true);
    }
  }, [blogId]);


  const handleLike = async () => {
  if (!isSignedIn) return;
  setIsLiked(!isLiked);
  setLikes(prev => isLiked ? prev - 1 : prev + 1);

  try {
    if (isLiked) {
      await axios.delete(`/api/like/${blogId}`, {
        data: { userId: user.id },
      });
    } else {
      await axios.post(`/api/like/${blogId}`, {
        userId: user.id,
      });
    }
  } catch (err) {
    
    console.error("Like/unlike failed", err);
    setIsLiked(isLiked);
    setLikes(prev => isLiked ? prev + 1 : prev - 1);
  }
};
const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !isSignedIn) return;

    const commentData = {
      user: {
        userId: user.id,
        username: user.username || user.fullName || "Anonymous",
      },
      message: newComment,
      id,
    };

    try {
      const res = await axios.post(`/api/comments/${blogId}`, commentData);
      setComments([res.data.comment, ...comments]);
      setNewComment("");
    } catch (err) {
      console.error("Failed to post comment", err);
    }
  };
const handleDeleteComment = async (commentId) => {
  try {
    await axios.delete(`/api/comments/${blogId}`, {
      headers: {
        "x-user-role": isAdmin ? "admin" : "user",
        "x-user-id": user.id, 
      },
      data: { commentId }, 
    });
    setComments((prev) => prev.filter((c) => c._id !== commentId));
  } catch (err) {
    console.error("❌ Failed to delete comment:", err);
    alert("Failed to delete the comment. Please try again.");
  }
};
  return (
    <>
   
      <div className="flex gap-4 mb-6">
        { isSignedIn ? (
          <button onClick={handleLike}>
                          {isLiked ? "❤️ Liked" : "🤍 Like"} ({likes})
             </button>
       
        ):''
      }

        <button
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200"
        >
          <FiShare2 /> Share
        </button>
      </div>

    
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

      
      {hasMore && comments.length > 0 && (
        <div className="text-center mt-4">
          <button
            onClick={() => fetchComments()}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Load More Comments
          </button>
        </div>
      )}

      
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={typeof window !== "undefined" ? window.location.href : ""}
      />
    </>
  );
};

export default LikeShareComment;
