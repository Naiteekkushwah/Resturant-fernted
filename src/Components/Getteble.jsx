import React, { useEffect, useState,useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiArrowLeft } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom";
gsap.registerPlugin(ScrollTrigger);
const Getteble = () => {
    const Navigetor = useNavigate();
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);
const [message, setShowMsg] = useState(false);
   const msgRef = useRef(null);

  async function fetchData() {
    try {
      const response = await axios.get(`${import.meta.env.BACKEND_UIL}/api/bookst`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setTables(response.data.reservations.tablbook);
        console.log(response.data.reservations);
         setShowMsg(true)
      }
    } catch (error) {
      console.error("Error fetching tables:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useGSAP(() => {
    if (tables.length > 0) {
      gsap.from(".table-card", {
        scrollTrigger: {
          trigger: ".table-card",
          start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
      });
    }
  }, [loading]);
useGSAP(() => {
      if (message) {
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
    }, [message]);
  return (
    <div className="min-h-screen bg-gradient-to-r w-full fixed z-1000 from-orange-50 via-white to-orange-100 py-12 px-6">
         <div className="flex justify-center mt-6">
             <button
               onClick={() => Navigetor("/")}
               className="bg-yellow-400 text-white px-6 py-2 absolute
                rounded-full shadow-md top-5 left-5
                hover:bg-blue-600 transition duration-300 font-semibold flex items-center gap-2"
             >
            <FiArrowLeft className="text-white text-lg" />
               <span>Home</span>
             </button>
           </div> <div
      ref={msgRef}
      className=" absolute top-[-100px] left-1/2 -translate-x-1/2 
                 bg-green-500 text-white px-6 py-3 rounded-lg 
                 shadow-lg text-lg font-semibold opacity-0 z-50"
    >
      Successfully Booked! 🪑 Your table reservation is confirmed. We look forward to serving you.
    </div>
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">
        🍽️ Booked Tables
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading tables...</p>
      ) : tables.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            No Tables Booked Yet
          </h2>
          <p className="text-gray-500">
            Looks like no one has reserved a table. Be the first to book and
            enjoy a delightful dining experience!
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {tables.map((table, index) => (
            <div
              key={index}
              className="table-card bg-white shadow-lg rounded-lg p-6 transform transition duration-300 hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                Table #{table.tableNumber}
              </h3>
              <p className="text-gray-600 mb-1">
                👤 Reserved By: <span className="font-medium">{table.name}</span>
              </p>
              <p className="text-gray-600 mb-1">
                📅 Date: <span className="font-medium">{table.date}</span>
              </p>
              <p className="text-gray-600 mb-1">
                ⏰ Time: <span className="font-medium">{table.time}</span>
              </p>
              <p className="text-gray-600">
                🪑  guests: <span className="font-medium">{table.guests}</span>
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Getteble;
