"use client"
import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import Link from "next/link";


const Header = () => {
  const [email,setEmail] = useState('');
  const [subscribed,SetSubscribed] = useState(false)
  const subscribedEmail = async()=>{
    const responce = await axios.get('/api/email');
    if(responce.data.success){
      toast.success(responce.data.message);
      setEmail(responce.data.email);
      SetSubscribed(true);
     }else{
      toast.error("Something went wrong while subscribing");
     }
  }
  const subscribeHandler = async(e)=>{
     e.preventDefault();
     const formData = new FormData();
    formData.append('email',email)
  try{
   const responce = await axios.post("/api/email",formData,{
    headers: {
      "Content-Type": "multipart/form-data", 
    },
  })
  if(responce.data.success){
   toast.success(responce.data.message);
   setEmail("")
  }else{
   toast.error(responce.data.message);
  }
  }catch(error){
    console.log(error);
  }
  }
  return (
    <div className="w-full ">
       
      <div className="text-center my-8 ">
<h2 className="text-3xl font-bold mb-4">Stories That Spark Curiosity</h2>
<p className="text-gray-600 mb-6 text-sm sm:text-base">
  Dive into thoughtful articles from passionate voices around the world. Tech, travel, wellness, and beyond — one scroll at a time.
  <Link href="/all-blog" className="text-blue-600 underline ml-1">Browse all blogs</Link>.
</p>


        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base"> 
        CurioBlog is a place where journeys turn into stories. From city adventures to serene escapes, every blog shares the beauty of exploration. Whether you're seeking inspiration or travel tips, Safarnama celebrates the joy of discovering the world, one step at a time.
        </p>
       
         <form  onSubmit={subscribeHandler} className=" flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 border border-black shadow-[-7px_7px_0px_#000000] ">
            <input type="email"
            onChange={(e)=>setEmail(e.target.value)}
            value={email}
            placeholder="Enter your email"
            className="pl-4 outline-none" 
            name=""
             id="email" />
            <button type="submit" className=" border-l border-black px-4 py-4 sm:px-8 bg-gray-600 text-white active:bg-green-600 active:text-white">Subscribe</button>
        </form> 
      </div>

    </div>
  )
}

export default Header