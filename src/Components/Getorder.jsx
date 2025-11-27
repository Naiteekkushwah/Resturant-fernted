import React, { useState, useRef } from "react";
import axios from "axios";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { FiArrowLeft } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom";
const Getorder = () => {
    const Navigetor = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");
  const containerRef = useRef(null);
const [message, setShowMsg] = useState(false);
   const msgRef = useRef(null);
   const API_URL = import.meta.env.VITE_BACKEND_URL;
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/getorder`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setOrders(response.data.Orderr.Orderr);
        console.log(response.data.Orderr.Orderr);
        setShowMsg(true)
      }
    } catch (error) {
      setErrMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  useGSAP(() => {
    fetchData();
  }, []);
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
  // GSAP animation
  useGSAP(() => {
    if (orders.length > 0) {
      gsap.from(".order-card", {
        opacity: 0,
     x:40,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
      });
      gsap.to(containerRef.current, {
        backgroundColor: "#f0f9ff",
        duration: 2,
        yoyo: true,
        repeat: 1,
      });
    }
  }, [loading]);

  return (
    <div
      ref={containerRef}
      className="min-h-screen fixed z-1000 w-full bg-white p-6 transition-colors duration-500"
    >
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
          </div>
        <div
      ref={msgRef}
      className=" absolute top-[-100px] left-1/2 -translate-x-1/2 
                 bg-green-500 text-white px-6 py-3 rounded-lg 
                 shadow-lg text-lg font-semibold opacity-0 z-50"
    >
    
          Successfully Placed! 🛒 Your order is being prepared fresh.
    </div>
      <h1 className="text-3xl font-bold text-center mb-6">My Orders</h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : errMsg ? (
        <p className="text-center text-red-500">{errMsg}</p>
      ) : orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {orders.map((order,) => (
            <div
              key={order._id}
              className="order-card bg-white shadow-lg rounded-lg p-4 hover:scale-105 transform transition"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-semibold text-blue-600">
                  Status: {order.status}
                </span>
                <span className="text-xs text-gray-400">
                  #{String(order._id).slice(-6)}
                </span>
              </div>

              <div className="space-y-2">
                {orders.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center border-b pb-1"
                  >
                    <span className="text-gray-700 font-medium">
                      {item.name || "Item"}
                    </span>
                    <span className="text-green-600 font-semibold">
                      ₹{item.price}
                    </span>
                     <span className="text-green-600 font-semibold">
                      ₹ discounte{item.discount}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex justify-between items-center">
                <span className="font-bold text-gray-800">
                  Total: ₹{order.total_price}
                </span>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Getorder;
