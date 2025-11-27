import React, { useState, useRef } from "react";
import axios from "axios";
import { useGSAP } from "@gsap/react";
import { FiArrowLeft } from "react-icons/fi"; 
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
const Cart = () => {
  const Navigetor = useNavigate();
  const [product, setProduct] = useState([]);
  const containerRef = useRef(null);

  async function cartProduct() {
    try {
      const response = await axios.get("http://localhost:4000/api/cartproduct", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setProduct(response.data.products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  useGSAP(() => {
    cartProduct();

    // Page load animation
    gsap.from(containerRef.current, {
      opacity: 0,
      y: 50,
      duration: 1,
      ease: "power3.out",
    });
  }, []);

  const Handle = (item) => {
    Navigetor("/order", { state: { item } });
  };

  return (
<div
  ref={containerRef}
  className="min-h-screen fixed top-0 left-0 w-full overflow-hidden
             bg-gradient-to-r from-orange-50 via-white to-orange-100 
             text-gray-800 flex flex-col items-center py-10 px-4 
             z-[1000]"
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
   <h1 className="text-3xl font-bold mb-8">🛒 Your Cart</h1>
  {product.length === 0 ? (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Your cart is empty
      </h2>
      <p className="text-gray-500">
        Looks like you haven’t added anything yet. Start exploring our menu!
      </p>
    </div>
  ) : (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 
                 w-full max-w-6xl h-[70vh] overflow-y-scroll 
                 scrollbar-hide"
    >
      {product.map((item, i) => (
        <div
          key={i}
          className="flex flex-col p-5 space-y-2 bg-white rounded-lg shadow-md 
                     transform hover:scale-105 transition duration-300"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover rounded-md"
          />
          <h3 className="text-xl font-semibold text-gray-900">{item.name}</h3>
          <p className="text-gray-700 font-medium">Price: ₹{item.price}</p>
          <p className="text-gray-700 font-medium">Discount: ₹{item.discount}</p>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => Handle(item)}
              className="bg-yellow-400 text-black px-4 py-2 text-sm font-semibold 
                         rounded-full hover:bg-yellow-500 transition duration-300"
            >
              Order Now
            </button>
          </div>
        </div>
      ))}
    </div>
  )}
</div>


  );
};
export default Cart;
