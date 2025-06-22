// // "use client"
// // import { assets, blog_data } from '@/Assets/assets';
// // import React, { useEffect, useState } from 'react'
// // import Image from 'next/image';
// // import Link from 'next/link';
// // import Footer from '@/Components/Footer';
// // const page = ({params}) => {
// //     const unwrappedParams = React.use(params);
  
// //     const { id } = unwrappedParams;

// //     const [data,setData] = useState(null);
// //     const fetchBlogData = ()=>{
// //             for(let i=0;i<blog_data.length;i++){
// //                 if(Number(id)===blog_data[i].id){
// //                     setData(blog_data[i]);
// //                     console.log(blog_data[i]);
// //                     break;
// //                 }
// //             }
// //     }
// //     useEffect(()=>{
// //         fetchBlogData()
// //     },[])
// //   return (
// //      {  data ?<> <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
// //  <div className='flex justify-between items-center'>
// //   <Link href="/">
// //    <Image src ={assets.logo} width={180} alt="image" className='w-[130px] sm:w-auto' />
// //    </Link>
// //    <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>Get Started <Image src={assets.arrow}></Image></button>
// //  </div>
// //  <div className='text-center my-24'>
// //    <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
// //    <Image className='mx-auto mt-6 border border-white'  src={data.author_img} alt='nothing' width={60} height={60}></Image>
// //    <p className=' mt-1 pb-2 text-lg max-w-[750px] mx-auto'>{data.author}</p>
// //  </div>
// // </div>
// // <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
// //     <Image className='border-4 border-white ' src={data.image} width={1280} height={720} alt='image'></Image>
   
// //      {/* <div className="blog-content" dangerouslySetInnerHTML={{__html:data.description}}>

// //       </div> */}

    
// //        <div className='my-24'>
// //         <p className='text-black font-semibold my-4'>Share this article on social media</p>
// //         <div className='flex '>
// //           <Image src={assets.facebook_icon}  alt='Facebook icon' />
// //           <Image src={assets.twitter_icon}  alt='Twitter icon' />
// //           <Image src={assets.googleplus_icon}  alt='Google icon' />
// //         </div>
// //        </div>
// // </div>
// // <Footer />
// // </>
// // : <></>
// //   )
// // }
// // }

// // export default page
// "use client";
// import { assets } from "@/Assets/assets";
// import React, { useEffect, useState } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import Footer from "@/Components/Footer";
// import axios from "axios";

// const Page = () => {
//   const [blogs, setBlogs] = useState([]); 
//   const [loading, setLoading] = useState(true); 
//   const [error, setError] = useState(null); 


//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.get("/api/blog"); 
//       console.log("Fetched Blogs:", res.data); 
//       setBlogs(res.data.blogs); 
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching blogs:", error);
//       setError("Failed to load blogs.");
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchBlogs();
//   }, []);
//   return (
//     <>
//       <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
//         <div className="flex justify-between items-center">
//           <Link href="/">
//             <Image
//               src={assets.logo}
//               width={180}
//               height={50}
//               alt="Logo"
//               className="w-[130px] sm:w-auto"
//             />
//           </Link>
//           <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
//             Get Started <Image src={assets.arrow} alt="arrow" width={20} height={20} />
//           </button>
//         </div>

//         <div className="text-center my-10">
//           <h1 className="text-3xl sm:text-5xl font-bold">All Blogs</h1>
//         </div>

//         {/* Show loading message */}
//         {loading && <p className="text-center text-lg font-medium">Loading blogs...</p>}

//         {/* Show error message */}
//         {error && <p className="text-center text-red-500">{error}</p>}

//         {/* Display all blogs */}
//         {!loading && !error && (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {blogs.length > 0 ? (
//               blogs.map((blog) => (
//                 <div key={blog._id} className="bg-white p-4 rounded-lg shadow-lg">
//                   {blog.image && (
//                     <Image
//                       className="w-full h-48 object-cover rounded-md"
//                       src={blog.image}
//                       width={300}
//                       height={200}
//                       alt={blog.title}
//                       priority
//                     />
//                   )}
//                   <h2 className="text-xl font-semibold mt-4">{blog.title}</h2>
//                   <p className="text-gray-600 mt-2">
//                     {blog.description.length > 100
//                       ? `${blog.description.slice(0, 100)}...`
//                       : blog.description}
//                   </p>
//                   <Link href={`/blog/${blog._id}`}>
//                     <button className="mt-4 px-4 py-2 bg-black text-white rounded-md">
//                       Read More
//                     </button>
//                   </Link>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center col-span-3 text-gray-500">No blogs available.</p>
//             )}
//           </div>
//         )}
//       </div>

//     </>
//   );
// };

// export default Page;

// "use client";

// import { useEffect, useState } from "react";
// import { useParams, notFound } from "next/navigation";
// import axios from "axios";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import BlogDetail from "@/components/extra/BlogDetails";

// export default function BlogPage() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   const fetchBlog = async () => {
//     try {
//       const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/blog/${id}`);
//       setBlog(res.data.blog);
//     } catch (err) {
//       console.error("Failed to fetch blog:", err);
//       setError("Blog not found.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (id) fetchBlog();
//   }, [id]);

//   if (loading) {
//     return <div className="text-center py-10">Loading blog...</div>;
//   }

//   if (error || !blog) {
//     notFound(); 
//   }

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen bg-white dark:bg-gray-900">
//         <BlogDetail blog={blog} />
//       </main>
      
//     </>
//   );
// }
// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { assets } from "@/Assets/assets";
// import Footer from "@/components/Footer";
// import BlogDetail from "@/components/extra/BlogDetails";

// export default function BlogPage() {
//   const blog = {
//     _id: "1",
//     title: "Understanding Modern Web Development Practices",
//     image:
//       "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=2000&q=80",
//     description:
//       "In today's rapidly evolving digital landscape, web development practices continue to shape how we build and interact with online platforms.",
//     content: [
//       "Modern web development encompasses performance, accessibility, and UX.",
//       "Developers must stay updated with the latest tools and technologies.",
//       "Component-based architectures have revolutionized frontend development.",
//     ],
//     author: {
//       name: "Sarah Johnson",
//       image:
//         "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
//       bio: "Senior Web Developer | Tech Enthusiast",
//     },
//     metadata: {
//       readingTime: "5 min read",
//       category: "Web Development",
//       date: "March 15, 2024",
//     },
//   };

//   return (
//     <div>
//       <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
//         <div className="flex justify-between items-center">
//           <Link href="/">
//             <Image
//               src={assets.logo}
//               width={180}
//               height={50}
//               alt="Logo"
//               className="w-[160px] sm:w-auto"
//             />
//           </Link>
//           <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]">
//             Get Started
//             <Image src={assets.arrow} alt="arrow" width={20} height={20} />
//           </button>
//         </div>
//       </div>

//       <main className="min-h-screen bg-white dark:bg-gray-900">
//         <BlogDetail blog={blog} />
//       </main>

   
//     </div>
//   );
// }



"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogDetail from "@/components/extra/BlogDetails"; // ✅ rename match

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
        console.error("Failed to fetch blog:", err);
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
      {/* <Header /> */}
      <main className="min-h-screen bg-white dark:bg-gray-900">
        <BlogDetail blog={blog} />
      </main>
      {/* <Footer /> */}
    </>
  );
}
