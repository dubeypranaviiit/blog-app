"use client";

import BlogTableItem from '@/Components/AdminComponent/BlogTableItem';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blog');
      console.log("Fetched Blogs:", response.data); // Debugging log
      setBlogs(response.data.blogs);
      if (response.data.success) {
       
        // console.log('blogs length',blogs.length);
        toast.success("Successfully fetched data");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.log("Error fetching blogs:", error);
    }
  };
  const deleteBlogs = async(mongoId)=>{
    try{

      const responce = await axios.delete('/api/blog',{
     params:{
        id:mongoId
    }
     } )
     if(responce.data.success){
      toast.success(responce.data.message);
      fetchBlogs();
     }
    }catch(error){
      console.log(error);
    }
  }
  useEffect(() => {
    fetchBlogs();
    console.log(blogs, 'blogs');
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
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
                    deleteBlog={deleteBlogs}
                    // authorImg={authorImageSrc} // Ensure it's a URL
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
