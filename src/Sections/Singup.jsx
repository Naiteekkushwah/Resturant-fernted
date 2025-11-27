import React, { useRef ,useState} from "react";
import { gsap } from "gsap";
import {useGSAP} from '@gsap/react'
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Massage from '../Components/Massage';
import { FiArrowLeft } from "react-icons/fi"; 
export default function Singup() {
  const formRef = useRef(null);
  const [name, setname] = useState('')
  const [Email, setEmail] = useState('')
  const [password, setpassword] = useState('')
  const [Cpassword, setCpassword] = useState('')
const [showMsg, setShowMsg] = useState(false);
   const msgRef = useRef(null);
const [showerror, seterror] = useState(false);
const [errormassage, seterrormassage] = useState('')

 const navigetor = useNavigate()
  useGSAP(() => {
    gsap.from(formRef.current, { y: 30, opacity: 0, duration: 0.6 });
  }, []);
 useGSAP(() => {
      if (showerror) {
        // Animate in
        gsap.to(msgRef.current, {
          y: 100,
          opacity: 1,
          duration: 1,
          ease: "bounce.out",
        });
  
        // Animate out after 3s
        gsap.to(msgRef.current, {
          y: -100,
          opacity: 0,
          duration: 1,
          delay: 3,
          ease: "power2.in",
        });
      }
    }, [showerror]);
  const submintheandler = async(e) => {
 e.preventDefault();

 const data = {
  email:Email,
  password:password,
  fullname:name,
  Cpassword:Cpassword,
 }
try {
  const response = await axios.post(`${import.meta.env.BACKEND_UIL}/api/register`, data);

  if (response.status === 200) {
      localStorage.setItem('token',response.data.token)
    console.log('Product added successfully:', response.data);
      setShowMsg(true)
      navigetor('/login' ,{ state: ' successfully Accounte create ' });
      setCpassword('')
      setEmail('')
      setname('')
      setpassword('')
  } else {
    console.error('Error adding product:', response.statusText);

  }
} catch (error) {
  console.error('Error:', error);
   seterrormassage(error.response.data.errors[0].msg)
  }
  seterror(true)
   
  }

  return (
    <div className="min-h-screen fixed w-[100vw] z-500 bg-gray-900 text-white flex items-center justify-center p-6">
       <div className="flex justify-center mt-6">
                   <button
                     onClick={() => navigetor("/")}
                     className="bg-yellow-400 text-white px-6 py-2 absolute
                      rounded-full shadow-md top-5 left-5
                      hover:bg-blue-600 transition duration-300 font-semibold flex items-center gap-2"
                   >
                  <FiArrowLeft className="text-white text-lg" />
                     <span>Home</span>
                   </button>
                 </div>
        <Massage show={showMsg} message="Successfully Logged In 🍽️" />
          <div
        ref={msgRef}
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 
                   bg-red-500 text-white px-6 py-3 rounded-lg 
                   shadow-lg text-lg font-semibold opacity-0 z-50"
      >
        {errormassage}
      </div>
      <div ref={formRef} className="bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Sign Up</h2>
        <form onSubmit={(e)=>{submintheandler(e)}} className="space-y-4">
          <input
          value={name}
          onChange={(e)=> setname(e.target.value)}
            type="text"
            required
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-gray-700 focus:ring-2 focus:ring-red-400 outline-none transition"
          />
          <input
          value={Email}
          onChange={(e)=> setEmail(e.target.value)}
            type="email"
            required
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-700 focus:ring-2 focus:ring-red-400 outline-none transition"
          />
          <input
          value={password}
          onChange={(e)=> setpassword(e.target.value)}
            type="password"
            required
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-700 focus:ring-2 focus:ring-red-400 outline-none transition"
          />
          <input
          value={Cpassword}
          onChange={(e)=> setCpassword(e.target.value)}
            type="password"
            required
            placeholder="Confirm Password"
            className="w-full p-3 rounded-lg bg-gray-700 focus:ring-2 focus:ring-red-400 outline-none transition"
          />
          <button onClick={()=>seterror(false)} className="w-full py-3 bg-red-500 rounded-lg font-bold hover:bg-red-600 transition">
            Sign Up
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Already have an account? <a href="/login" className="text-red-400">Login</a>
        </p>
      </div>
    </div>
  );
}
