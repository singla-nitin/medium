import { ChangeEvent, useState } from "react";
import Quotes from "../components/Quotes";
import { Link,  useNavigate } from "react-router-dom";
import { SignupInput } from "@100xdevs/medium-common";
import axios from "axios";



export const Auth=({type}:{type:"signup"|"signin"}) =>{
    const navigate=useNavigate()
  
  const[postInputs,setPostInputs]=useState<SignupInput>({
    username:"",
    password:"",
    name:"",
  })

 async function sendRequest(){
    try {
        const response=await axios.post(`https://backend.nitinsingla703.workers.dev/api/v1/user/${type==="signup"?"signup": "signin"}`,postInputs);
        const jwt=response.data.jwt;
        localStorage.setItem("token",jwt);
        navigate("/blogs")
        
    } catch (error) {
        console.error("An error occurred:", error);
    }
  } 
  

  return (
    <div className="grid grid-cols-2">
      <div className=" flex  flex-col justify-center bg-slate-100 h-screen">
        <div className=" text-center text-4xl text font-bold "> {type==="signup" ? "Create an account":"Login"}</div>
        <div className=" text-center text-xs text font-semibold "> {type==="signup" ? "Already have an account?":"doesnot have an account"}
        <Link to={type === "signup" ? "/signin" : "/signup"} className="underline pl-2">
            {type === "signup" ? "Login" : "Signup"}
          </Link>
        </div>
        <div className="pl-10 pr-10 " > 
        {type === "signup" && (
            <Inputbox
              label="Username"
              placeholder="iman04"
              onchange={(e) => {
                setPostInputs({
                  ...postInputs,
                  name: e.target.value,
                });
              }}
            />
          )}
          <Inputbox label="Email" placeholder="iman@gmail.com" onchange={(e) => { 
            setPostInputs({
              ...postInputs,
              username:e.target.value,
            })
          }}></Inputbox>
          <Inputbox label="Password" type="password" placeholder="1234" onchange={(e) => {
            setPostInputs({
              ...postInputs,
              password:e.target.value,
            })
           }}></Inputbox>
          
        </div>
         <div className="flex justify-center pt-5 ">
         <button onClick={sendRequest} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">{type==="signup" ? "signup":"signin"}</button>
         </div>
    </div>
      <Quotes />
    </div>
  )
}




/////////////////////////////////////////////////////////////////////////
interface inputsTypes {
  label: string,
  placeholder: string,
  onchange: (e: ChangeEvent<HTMLInputElement>) => void,
  type?:string,

}
function Inputbox({ label, placeholder, onchange,type }: inputsTypes) {
  return <div>
    <div>
      <label className="block mb-2 text-m font-medium text-gray-900 pt-5">{label}</label>
      <input onChange={onchange} type={type||"text"} id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
    </div>

  </div>

}

