"use client"
import { assets } from '@/Assets/assets'
import React, { useState,useEffect } from 'react'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useUser } from '@clerk/nextjs'
const page = () => {
    const { user } = useUser();
  if (!user) return null;
    const [image,setImage]= useState(null);
    const [data,setData] = useState({
      title:"",
      description:"",
      category:"Startup",
      author:"",
      authorImg:""
    })
     useEffect(() => {
    if (user) {
      setData(prev => ({
        ...prev,
        author: user.fullName || user.username || "Anonymous",
        authorImg: user.imageUrl || "/profile_img.png"
      }));
    }
  }, [user]);
    const onChangeHandler =(e)=>{
      const name = e.target.name;
      const value = e.target.value;
      setData(data=>({...data,[name]:value}))
    }
    const onSubmitHandler = async (e)=>{
       e.preventDefault();
      const formData = new FormData();
      formData.append('title',data.title);
      formData.append('description',data.description);
      formData.append('category',data.category);
      formData.append('author',data.author);
      formData.append('image',data.authorImg);
      formData.append("image", image);
      const responce = await axios.post('/api/blog',formData);
      console.log(responce);
      if(responce.data.success){
        toast.success(responce.data.message);
        console.log(responce);
      }else{
        toast.error("Error")
      }
    }
  return (
 <>
 <form  onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 ml:pl-16' >
  <p className='text-xl'>Upload thumbnail</p>
  <label htmlFor="image">
    <Image src={image?URL.createObjectURL(image)  : assets.upload_area}  alt="upload"  width={140} height={70} className="mt-4"/>
  </label>
  <input onChange={(e)=>setImage(e.target.files[0])}  type="file" id ="image" hidden required/>
  <p className='text-xl mt-4'>Blog title</p>
<input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border ' type="text" placeholder='Title'  required/>
<p className='text-xl mt-4'>Blog Description</p>
<textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border ' type="text" placeholder='Blog Description'  required/>
<p className='text-xl mt-4'>Blog Category</p>
<select name="category" onChange={onChangeHandler} value={data.category} className='w-full sm:w-[500px] mt-4 px-4 py-3 border'>
    <option value="Startup"> Startup</option>
    <option value="technology">Technology</option>
    <option value="lifestyle">LifeStyle</option>
     <option value="other">Other</option>
</select>

<br />
<button type='submit' className='mt-8 w-40 h-12 bg-black text-white'>Add</button>

 </form> 
 </>
  )
}

export default page