import React from 'react'
import { CrossIcon } from 'lucide-react'
const SubscriptionItem = ({email,date,deleteEmail,mongoId}) => {
  return (
 <tr className='bg-white  border-b text-left '>
      <th scope='row' className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap'>
             {
                email ?email:'No Email found'
             }   
      </th>
      <td className='px-6 py-4 hidden sm:block'>
        {date?date:'12Jan,2025'}
        </td>
      <td onClick={()=>deleteEmail(mongoId)} className='px-6 py-4 cursor-pointer'>
        <CrossIcon />
      </td>
 </tr>


  )
}

export default SubscriptionItem