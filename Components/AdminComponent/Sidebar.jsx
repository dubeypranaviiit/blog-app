"use client"
import { assets } from '@/Assets/assets'
import React from 'react'
import Image from "next/image"
import { useState } from 'react'
import Link from 'next/link'
const Sidebar = () => {
    const [menu,setmenu] = useState("")
  return (
    <div className='flex flex-col bg-white'>
    
        <div className='w-28 sm:w-80 h-[100vh] relative py-12 border border-black'>
            <div className='w-[50%] sm:w-[80%] absolute right-0'>
            <Link href ="/admin/addProduct" className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000]'>
               <Image src={assets.add_icon} alt='Image' />
               <p>Add  Blogs</p>
            </Link>
            <Link  href ="/admin/blogList" className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] mt-4'>
               <Image src={assets.blog_icon} alt='Image' />
               <p>Blog List</p>
            </Link>
               <Link  href ="/admin/message" className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] mt-4 ' >
               <Image src={assets.Chat} alt='Image' className='w-5 h-5' />
               <p>Message</p>
            </Link>
            <Link href ="/admin/subscription"  className='flex items-center border border-black gap-3 font-medium px-3 py-2 bg-white shadow-[-5px_5px_0px_#000000] mt-4'>
               <Image src={assets.email_icon} alt='Image' />
               <p> Subscriptions</p>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default Sidebar
