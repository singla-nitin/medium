import { useState } from 'react';
import Appbar from '../components/Appbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Publish() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const navigate=useNavigate()

    const post=async ()=>{
        const res=await axios.post("https://backend.nitinsingla703.workers.dev/api/v1/blog",{
            title:title,
            content:content,
            
        },
        {
        headers:{
            Authorization: localStorage.getItem("token")
        }
        }

       
    )
    navigate(`/blog/${res.data.id}`)

    }
    
    return (
        <div>
            <div>
                <Appbar />
            </div>
            <div className='flex justify-center mt-4'>
                <div className='max-w-screen-md w-full'>

                    <input
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-4 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Title"
                        onChange={(e)=>{
                            setTitle(e.target.value)
                        }}


                    />

                    <textarea
                        className="min-h-[15rem] bg-gray-50 border border-gray-300 text-sm text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-300 dark:border-gray-600 dark:placeholder-black dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Content"
                        required
                        onChange={(e)=>{
                            setContent(e.target.value)
                        }}
                    />
                    <button
                        type="button"
                        className=" mr-7 mt-7 focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-xs px-4 py-2 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                        onClick={()=>{
                            post()
                        }}
                    
                    >
                        Publish
                    </button>
                </div>
            </div>

            <div className="flex justify-center items-center max-w-screen-md w-full h-full flex-col"></div>
        </div>
    );
}

