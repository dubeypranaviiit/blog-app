'use client';
import React, { useEffect, useState } from 'react';
import BlogItem from '@/components/BlogItem';
import { useBlogStore } from '@/store/useBlogStore';

const BlogPage = () => {
  const { blogs, fetchBlogs } = useBlogStore();
  const [menu, setMenu] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortFilter, setSortFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  
  const filteredBlogs = blogs
    .filter((blog) => (menu === 'All' ? true : blog.category === menu))
    .filter((blog) =>
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortFilter === 'Latest') {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      if (sortFilter === 'Most Liked') {
        return (b.likesCount || 0) - (a.likesCount || 0);
      }
      return 0;
    });

  const indexOfLast = currentPage * blogsPerPage;
  const indexOfFirst = indexOfLast - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [menu, searchQuery, sortFilter]);

  return (
    <div className="w-full mx-auto px-4 py-10 text-black bg-white">
      <h1 className="text-4xl font-bold text-center mb-10">
        Curated Just for You
      </h1>

    
      <div className="w-full flex flex-wrap justify-center gap-4 mb-6">
        {['All', 'technology', 'Startup', 'lifestyle', 'other'].map((cat) => (
          <button
            key={cat}
            onClick={() => setMenu(cat)}
            className={`py-1 px-4 rounded border transition ${
              menu === cat ? 'bg-black text-white' : 'bg-white text-black'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <input
          type="text"
          placeholder="Search blog..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded-md w-72"
        />
        <select
          value={sortFilter}
          onChange={(e) => setSortFilter(e.target.value)}
          className="border px-4 py-2 rounded-md"
        >
          <option value="All">Sort: None</option>
          <option value="Latest">Sort: Latest</option>
          <option value="Most Liked">Sort: Most Liked</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-center gap-6 xl:mx-20">
        {currentBlogs.length > 0 ? (
          currentBlogs.map((item) => (
            <BlogItem
              key={item._id}
              id={item._id}
              image={item.image}
              title={item.title}
              description={item.description}
              category={item.category}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No blogs found.</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>

          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === idx + 1 ? 'bg-black text-white' : ''
              }`}
            >
              {idx + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default BlogPage;

