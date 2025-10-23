"use client";
import { assets } from '@/Assets/assets';

import BlogTableItem from '@/components/AdminComponent/BlogTableItem';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
const Page = () => {
  const [blogs, setBlogs] = useState([]);
  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      console.log("Fetched Blogs:", response.data); 
      setBlogs(response.data.blogs);
      toast.success("Successfully fetched data");
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  };
  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete('/api/blog', {
        params: { id: mongoId },
      });
        toast.success(response.data.message);
        const updatedBlogs = await fetchBlogs();
        console.log("Updated Blogs:", updatedBlogs);
  
    } catch (error) {
      console.log("Error deleting blog:", error);
      toast.error("An error occurred while deleting the blog.");
    }
  };
  
  useEffect(() => {
    fetchBlogs();
    console.log(blogs, 'blogs');
   
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 min-h-screen bg-white">
      <h1>All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm text-gray-700 text-left uppercase bg-gray-50">
            <tr>
             <th scope="col" className="hidden sm:block px-6 py-3">Author Image</th>
              <th scope="col" className=" px-6 py-3">Author Name</th>
              <th scope="col" className="px-6 py-3">Blog Title</th>
              <th scope="col" className="px-6 py-3">Date</th>
              <th scope="col" className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {blogs.length > 0 ? (
              blogs.map((item, index) => {

                return (
                  <BlogTableItem
                    key={index}
                    mongoId={item._id}
                    title={item.title}
                    author={item.author}
                    deleteBlog={deleteBlog}
                    authorImg={assets.facebook_icon} // Ensure it's a URL
                    date={new Date(item.createdAt).toLocaleDateString()}
                  />
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No blogs found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Page;
