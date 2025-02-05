"use client"
import { assets, blog_data } from '@/Assets/assets';
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/Components/Footer';
const page = ({params}) => {
    const unwrappedParams = React.use(params);
  
    const { id } = unwrappedParams;

    const [data,setData] = useState(null);
    const fetchBlogData = ()=>{
            for(let i=0;i<blog_data.length;i++){
                if(Number(id)===blog_data[i].id){
                    setData(blog_data[i]);
                    console.log(blog_data[i]);
                    break;
                }
            }
    }
    useEffect(()=>{
        fetchBlogData()
    },[data])
  return (
       data ?<> <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
 <div className='flex justify-between items-center'>
  <Link href="/">
   <Image src ={assets.logo} width={180} alt="image" className='w-[130px] sm:w-auto' />
   </Link>
   <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-black shadow-[-7px_7px_0px_#000000]'>Get Started <Image src={assets.arrow}></Image></button>
 </div>
 <div className='text-center my-24'>
   <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
   <Image className='mx-auto mt-6 border border-white'  src={data.author_img} alt='nothing' width={60} height={60}></Image>
   <p className=' mt-1 pb-2 text-lg max-w-[750px] mx-auto'>{data.author}</p>
 </div>
</div>
<div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
    <Image className='border-4 border-white ' src={data.image} width={1280} height={720} alt='image'></Image>
    <h1 className='my-8 text-[26px] font-semibold'>
    Introduction
    </h1>
    <p className=''>
        {data.description}
    </p>
    <h3 className='my-5 text-[18px] font-semibold'>Step 1: Self-Refelection and Goal setting</h3>
    <p className='my-3'>Before you can manage your lifestyle , you must have a clear understanding of what you want to achieve. Start by reflecting on your values,aspirations,and long-term goals.</p>
    <p className='my-3'>Before you can manage your lifestyle , you must have a clear understanding of what you want to achieve. Start by reflecting on your values,aspirations,and long-term goals.</p>

    <h3 className='my-5 text-[18px] font-semibold'>Step 2: Self-Refelection and Goal setting</h3>
    <p className='my-3'>Before you can manage your lifestyle , you must have a clear understanding of what you want to achieve. Start by reflecting on your values,aspirations,and long-term goals.</p>
    <p className='my-3'>Before you can manage your lifestyle , you must have a clear understanding of what you want to achieve. Start by reflecting on your values,aspirations,and long-term goals.</p>

    <h3 className='my-5 text-[18px] font-semibold'>Step 3: Self-Refelection and Goal setting</h3>
    <p className='my-3'>Before you can manage your lifestyle , you must have a clear understanding of what you want to achieve. Start by reflecting on your values,aspirations,and long-term goals.</p>
    <p className='my-3'>Before you can manage your lifestyle , you must have a clear understanding of what you want to achieve. Start by reflecting on your values,aspirations,and long-term goals.</p>

    <h3 className='my-5 text-[18px] font-semibold'>Conclusion :</h3>
    <p className='my-3'>Managing your lifestyle is a journey that requires commitment and self-awarness. By following this step-by-step guide </p>
    
       <div className='my-24'>
        <p className='text-black font-semibold my-4'>Share this article on social media</p>
        <div className='flex '>
          <Image src={assets.facebook_icon}  alt='Facebook icon' />
          <Image src={assets.twitter_icon}  alt='Twitter icon' />
          <Image src={assets.googleplus_icon}  alt='Google icon' />
        </div>
       </div>
</div>
<Footer />
</>
: <></>
  )
}

export default page