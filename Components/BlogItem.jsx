'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdCategory } from 'react-icons/md';
import { FiChevronRight } from 'react-icons/fi';

const fallbackImage =
  'https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64';

const BlogItem = ({ title, description, category, image, id }) => {
  const [imgSrc, setImgSrc] = useState(image || fallbackImage);

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] bg-white mx-4">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={imgSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          onError={() => setImgSrc(fallbackImage)}
        />
        <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/60 to-transparent w-full h-16" />
      </div>

      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <MdCategory className="text-blue-500" />
          <span className="text-sm text-gray-600">{category}</span>
        </div>
        <h2 className="font-bold text-xl mb-2 text-gray-800 line-clamp-2">{title}</h2>

        <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        <Link
          href={`/blog/${id}`}
          className="flex items-center text-blue-500 hover:text-blue-700 transition-colors duration-200 font-medium"
          aria-label={`Read more about ${title}`}
        >
          Read More
          <FiChevronRight className="ml-1" />
        </Link>
      </div>
    </div>
  );
};

export default BlogItem;
