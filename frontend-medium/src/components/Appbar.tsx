import React from 'react'
import { Avatar } from './BlogCard'
import { Link } from 'react-router-dom'


export default function Appbar() {
  return (
    <div className='flex justify-between border-b px-10 py-4' >
      <Link to={"/blogs"}>
      <div className='font-semibold text-2xl'>
            Medium
        </div>
      </Link>        
        <div>
            <div>
            <Link to={"/publish"}>
  <button
    type="button"
    className=" mr-7 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-3 py-1.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
  >
    New
  </button>
</Link>

            <Avatar  size={40} name="iman" />
            </div>
        
        </div>
    </div>
  )
}
