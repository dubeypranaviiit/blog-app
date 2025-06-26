'use client';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BlogItem from './BlogItem';

const BlogHome = () => {
  const [menu, setMenu] = useState("All");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('/api/blog');
      setBlogs(res.data.blogs);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  const filteredBlogs = blogs
    .filter(blog => menu === 'All' || blog.category === menu)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 9);

  return (
    <div>
      {/* <div className='flex justify-center gap-6 my-10'> */}
        {/* {['All', 'technology', 'Startup', 'lifestyle','other'].map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={`py-1 px-4 rounded-sm ${
              menu === cat ? 'bg-black text-white' : 'bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div> */}
      <div className='flex justify-center md:justify-center gap-4 my-6 overflow-x-auto px-4 scrollbar-hide'>
        {['All', 'technology', 'Startup', 'lifestyle', 'other'].map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={`py-2 px-4 text-sm whitespace-nowrap rounded-full transition ${
              menu === cat ? 'bg-black text-white' : 'bg-gray-200 text-gray-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
        {filteredBlogs.map((item, index) => (
          <BlogItem
            key={index}
            id={item._id || item.id}
            image={item.image}
            title={item.title}
            description={item.description}
            category={item.category}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogHome;
