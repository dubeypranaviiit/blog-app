import { assets } from '@/Assets/assets'
import React from 'react'
import Image from 'next/image'
import { Cross } from 'lucide-react'
const BlogTableItem = ({title,author,date,deleteBlog,mongoId,authorImg}) => {
  return (
    <tr className='bg-white border-b'>
        <td scope='row' className='items-center gap-3 hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
            <Image width={40} height={40}  src={authorImg?authorImg:assets.profile_icon} alt='author image' />
      
        </td>
        <td className='px-6 py-4 '>
        {author?author:"Anomounous"}
   </td>
   <td className='px-6 py-4 '>
     {title?title:"no title"}
   </td>
   <td className='px-6 py-4 '>
     {
     date
     }
   </td>
   <td  onClick={()=>deleteBlog(mongoId)} className='px-6 py-4 cursor-pointer'>
      <Cross />
   </td>
    </tr>
  )
}

export default BlogTableItem