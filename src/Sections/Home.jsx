import React,{useState,useEffect} from "react";
import Navbar from "../Components/Navbar.jsx";
import {Link} from 'react-scroll';
import {useNavigate} from 'react-router-dom';
import {useGSAP} from '@gsap/react'
import {gsap} from 'gsap'
import { useLocation } from "react-router-dom";
import Massage from '../Components/Massage';
const Home = () => {
 const [showMsg, setShowMsg] = useState(false);
 const { state } = useLocation();
 
  useEffect(() => {
    if (state) {
      setShowMsg(true);
        window.history.replaceState({}, document.title);
    }
  }, [state]);
  useGSAP(()=>{
    gsap.from('#titel',{
      y:-20,
      opacity:0,
      delay:2,
      duration:1,
    })
      gsap.from('#samititel',{
      y:-30,
      opacity:0,
      delay:3,
      duration:1,
    })
    gsap.from('#button1',{
      y:-40,
      opacity:0,
      delay:4,
      duration:0.8,
    })
      gsap.from('#button2',{
      y:-40,
      opacity:0,
      delay:4,
      duration:0.8,
    })
  })
  const navigetor = useNavigate()
  return (
    <div className="bg-black w-screen h-screen relative overflow-hidden">
       <Massage show={showMsg} message="Successfully Logged In! 👋 Welcome back to SpiceHub." />
      {/* Navbar fixed */}
      <div className="fixed top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      {/* Background image */}
     <div className="w-screen h-screen relative">
  {/* Background Video */}
  <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute w-full h-full object-cover"
  >
    <source src="https://www.pexels.com/download/video/3195650/" type="video/mp4" />
  </video>

  {/* Overlay */}
  <div className="absolute inset-0 bg-transparent bg-opacity-50 flex flex-col justify-center items-center text-center px-4">
  {/* Heading */}
  <h1 id="titel" className="text-white text-5xl font-bold mb-4">
    Welcome to Spice & Flavor
  </h1>

  {/* Subheading */}
  <p id="samititel" className="text-white text-lg mb-6 max-w-xl">
    Experience the finest dining with authentic flavors, cozy ambiance, and world-class service.
  </p>

  {/* Buttons */}
  <div className="flex space-x-6">
  {/* View Menu Button */}
  <button  className="bg-gradient-to-r from-orange-500 to-yellow-600 
                     text-white font-bold px-4 py-2 rounded-xl 
                     shadow-lg transform transition duration-300 
                     hover:scale-105 hover:shadow-2xl hover:from-yellow-400 hover:to-orange-500">
 <Link to="Menu"  id="button1"  smooth={true}
              duration={600}
              offset={-80}>
       🍽️ View Menu
       </Link>    
  </button>

  {/* Book a Table Button */}
  <button  className="bg-gradient-to-r from-yellow-400 to-green-500 
                     text-black font-bold px-4 py-2 rounded-xl 
                     shadow-lg transform transition duration-300 
                     hover:scale-105 hover:shadow-2xl hover:from-green-500 hover:to-yellow-400">
                      <Link id="button2" onClick={()=>{navigetor('/Tablebooking')}}    smooth={true}
              duration={600}
              offset={-80}>
       🥂 Book a Table
       </Link>    
   
  </button>
</div>

</div>

</div>

    </div>
  );
};
export default Home;
