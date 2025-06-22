// import React from 'react'
// import Image from 'next/image'
// import { assets, blog_data} from '@/Assets/assets'
// import Link from 'next/link'
// const BlogItem = ({title,description,category,image,id}) => {
//   return (
//     <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000] mx-5'>
//         <Link href={`/blog/${id}`}>
//         <Image src={image} alt='no image' width={400} height={400}  className='border-b border-black' /></Link>
     
//       <p className='ml-5 mt-5 inline-block bg-black text-white text-sm'>{category}</p>
//       <div className='p-5'>
//          <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>
//          <p className='mb-3 text-sm  tracking-tight text-gray-700 ' dangerouslySetInnerHTML={{__html:data.description.slice(0,120)}}>{description}</p>
         
//     <Link  href={`/blog/${id}`} className='inline-flex items-center py-2 font-semibold text-center'>
//         Read more <Image  className="ml-2"  src={assets.arrow} alt='icon arrow' width={12} />
//     </Link>
//       </div>
//     </div>
//   )
// }

// export default BlogItem
// import React from 'react'
// import Image from 'next/image'
// import { assets } from '@/Assets/assets'
// import Link from 'next/link'

// const BlogItem = ({ title, description, category, image, id }) => {
//   return (
//     <div className='max-w-[330px] sm:max-w-[300px] bg-white border border-black hover:shadow-[-7px_7px_0px_#000000] mx-5'>
//       <Link href={`/blog/${id}`}>
//         <Image
//           src={image}
//           alt='no image'
//           width={400}
//           height={400}
//           className='border-b border-black'
//         />
//       </Link>

//       <p className='ml-5 mt-5 inline-block bg-black text-white text-sm'>{category}</p>

//       <div className='p-5'>
//         <h5 className='mb-2 text-lg font-medium tracking-tight text-gray-900'>{title}</h5>

      
//         <p
//           className='mb-3 text-sm tracking-tight text-gray-700'
//           dangerouslySetInnerHTML={{ __html: description.slice(0, 120) }}
//         />

//         <Link href={`/blog/${id}`} className='inline-flex items-center py-2 font-semibold text-center'>
//           Read more <Image className="ml-2" src={assets.arrow} alt='icon arrow' width={12} />
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default BlogItem
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdCategory } from 'react-icons/md';
import { FiChevronRight } from 'react-icons/fi';

const BlogItem = ({ title, description, category, image, id }) => {
  const handleImageError = (e) => {
    e.target.src = "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64";
  };

  return (
    <div className="max-w-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] bg-white mx-4">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Image
          src={image}
          alt={title}
        
          className="object-cover transition-transform duration-300 hover:scale-105"
          onError={handleImageError}
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

