"use client"
import React, { useState,useEffect } from 'react'
import axios from 'axios'
import SubscriptionItem from '../../../components/AdminComponent/SubscriptionItem'
import { toast } from 'react-toastify'
const page = () => {
      const [emails,setEmails]=useState([])
  const fetchEmail = async()=>{
    try{
 const  response = await  axios.get("/api/email");
       setEmails(response.data.emailId)
       console.log("Fetched Emails:", response.data.emailId);
    }catch(error){
       console.log(error);
    }
  }
  const deleteEmail = async (mongoId) => {
    try {
      const response = await axios.delete('/api/email', {
        params: { id: mongoId },
      });
      if(response.data.success){
        toast.success(response.data.message);
        fetchEmail();
      }
     

    } catch (error) {
      console.log("Error deleting blog:", error);
     
    }
  };
   useEffect(() => {
    fetchEmail();
    }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-white'>
    <h1>All Subscription</h1>
    <div className='relative max-w-[600px]  h-[80vh] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide'>
              <table className='w-full text-sm text-gray-500'>
                <thead className='text-xs text-left text-gray-700 uppercase bg-gray-50'>
                       <tr >
                        <th scope='col' className='px-6 py-3'>Email Subscription</th>
                        <th scope='col' className='hidden sm:block px-6 py-3'>Date</th>
                        <th scope='col' className='px-6 py-3'>Action</th>
                       
                       </tr>
                       </thead>
                       <tbody >
                        {
                          emails.map((item,index)=>{
                         return   <SubscriptionItem key={index} mongoId={item._id} email={item.email} date={new Date(item.createdAt).toLocaleDateString()} deleteEmail={deleteEmail} />
                          })
                      
                        }
                        </tbody>
              </table>
    </div>
    </div>
  )
}

export default page