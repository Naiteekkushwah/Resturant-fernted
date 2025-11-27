import React, { useRef,useState,useEffect } from "react";
import { gsap } from "gsap";
import {useGSAP} from '@gsap/react'
import { FiArrowLeft } from "react-icons/fi"; 
import axios from 'axios'
import Massage from '../Components/Massage';
import {useNavigate} from 'react-router-dom';
export default function Login() {
  const formRef = useRef(null);
  const [Email, setEmail] = useState('')
  const [password, setpassword] = useState('')
 const [showMsg, setShowMsg] = useState(false);
  const msgRef = useRef(null);
 const [showerror, seterror] = useState(false);
 const [errormassage, seterrormassage] = useState('')
 console.log(errormassage);
 
 const navigetor = useNavigate()
  useGSAP(() => {
    gsap.from(formRef.current, { y: -30, opacity: 0, duration: 0.6 });
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
   }
  try {
    const response = await axios.post('http://localhost:4000/api/login', data);
  
    if (response.status === 200) {
      localStorage.setItem('token',response.data.token)
      console.log('Product added successfully:', response.data);
      navigetor('/' ,{state:'successfully loggned',replace: true})
    } 
  } catch (error) {
    console.error('Error:', error);
  seterrormassage(
  error.response?.data?.errors?.[0]?.msg   // अगर errors array है तो msg ले लो
  || error.response?.data                  // वरना पूरा data दिखा दो
  || error.message                         // fallback: axios का default message
  || "Something went wrong"                // final fallback
);

  }
  seterror(true)
  
    }
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    setShowMsg(true);
  }
}, []);
  return (
    <div className="h-screen fixed z-100 w-full bg-gray-900 text-white flex items-center justify-center p-6">
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
       <Massage show={showMsg} message="Successfully Signed Up! 🎉 Your account has been created. Start exploring now." />
       <div 
         ref={msgRef}
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 
                   bg-red-500 text-white px-6 py-3 rounded-lg 
                   shadow-lg text-lg font-semibold opacity-0 z-50"
      >
        {errormassage}
      </div>
      <div ref={formRef} className="bg-gray-800 z-200 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-4 text-center">Login</h2>
        <form onSubmit={(e)=>submintheandler(e)} className="space-y-4">
          <input
          value={Email}
          onChange={(e)=>setEmail(e.target.value)}
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-700 focus:ring-2 focus:ring-red-400 outline-none transition"
          />
          <input
          value={password}
          onChange={(e)=>setpassword(e.target.value)}
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-700 focus:ring-2 focus:ring-red-400 outline-none transition"
          />
          <button onClick={()=>{seterror(false),seterrormassage('')}} className="w-full py-3 bg-red-500 rounded-lg font-bold hover:bg-red-600 transition">
            Login
          </button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account? <a href="/signup" className="text-red-400">Sign up</a>
        </p>
      </div>
    </div>
  );
}
