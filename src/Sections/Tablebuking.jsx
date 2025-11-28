import React, { useState, useRef } from "react";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { FaCalendarAlt, FaClock, FaUserFriends } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom";
const TableBooking = () => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const navigetor = useNavigate()

  const containerRef = useRef(null);
  const formRef = useRef(null);
  const btnRef = useRef(null);

  const submitevant = async (e) => {
    e.preventDefault();
    const bookingData = { date, time, guests };
     const API_URL = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.post(
        `${API_URL}/tablbooking`,
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 201) {
        console.log("Table booked successfully:", response.data);
   navigetor('/gett')
        // Success animation on button
        gsap.fromTo(
          btnRef.current,
          { scale: 1, backgroundColor: "#facc15" },
          {
            scale: 1.2,
            backgroundColor: "#22c55e",
            duration: 0.5,
            yoyo: true,
            repeat: 1,
            ease: "bounce.out",
          }
        );
      } else {
        console.error("Error booking table:", response.statusText);
      }
    } catch (error) {
      console.error("Error booking table:", error);
    }
  };

  useGSAP(() => {
    // Page fade-in
    gsap.from(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Form pop-up
    gsap.from(formRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      ease: "elastic.out(1, 0.5)",
    });
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-gradient-to-br from-yellow-100 via-red-100 to-pink-200 flex flex-col items-center justify-center px-4"
    >
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
      <h1 className="text-4xl font-bold mb-6 text-red-600 animate-pulse">
        🍽️ Book Your Table
      </h1>

      <form
        ref={formRef}
        className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md space-y-4 transition-colors duration-500 hover:bg-yellow-50"
        onSubmit={submitevant}
      >
        {/* Date */}
        <div className="flex items-center space-x-3">
          <FaCalendarAlt className="text-red-500 text-xl" />
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            id="date"
            name="date"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Time */}
        <div className="flex items-center space-x-3">
          <FaClock className="text-red-500 text-xl" />
          <input
            value={time}
            onChange={(e) => setTime(e.target.value)}
            type="time"
            id="time"
            name="time"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Guests */}
        <div className="flex items-center space-x-3">
          <FaUserFriends className="text-red-500 text-xl" />
          <input
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            type="number"
            id="guests"
            name="guests"
            min="1"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Number of Guests"
          />
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <button
            ref={btnRef}
            type="submit"
            className="bg-red-500 text-white px-6 py-2 text-lg font-semibold rounded-full transition duration-300 hover:bg-yellow-400 hover:text-black"
            onMouseEnter={() => {
              gsap.to(btnRef.current, {
                scale: 1.1,
                duration: 0.2,
                ease: "power2.out",
              });
            }}
            onMouseLeave={() => {
              gsap.to(btnRef.current, {
                scale: 1,
                duration: 0.2,
                ease: "power2.in",
              });
            }}
          >
            Book Table
          </button>
        </div>
      </form>
    </div>
  );
};
export default TableBooking;
