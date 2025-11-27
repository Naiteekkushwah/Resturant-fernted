import React, { useRef,useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useNavigate} from "react-router-dom"; 
import { FiArrowLeft } from "react-icons/fi"; 

const Order = () => {
  const navigater = useNavigate()
  const { state } = useLocation();
  const product = state?.item;
  const msgRef = useRef(null);
  const containerRef = useRef(null);
  const cardRef = useRef(null);
  const btnRef = useRef(null);
const [showerror, seterror] = useState(false);
 const [errormassage, seterrormassage] = useState('')
 console.log(errormassage);
  async function handleOrder(product) {
    try {
      const res = await axios.post(
        "http://localhost:4000/api/orders",
        { productId: product._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (res.status === 201) {
        console.log("Order placed successfully:", res.data);
navigater('/getO')
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
        console.error("Error placing order:", res.statusText);
      }
    } catch (err) {
      console.error("Error placing order:", err);
         seterror(true)
    seterrormassage(err.response.data.message)
    }
  }
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
  useGSAP(() => {
    // Page fade-in animation
    gsap.from(containerRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.out",
    });

    // Card pop-up animation
    gsap.from(cardRef.current, {
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
      className="min-h-screen w-full fixed z-600 bg-gradient-to-br from-black via-stone-800 to-gray-900 text-amber-50 flex flex-col items-center justify-center px-4"
    >
       <div 
         ref={msgRef}
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 
                   bg-red-500 text-white px-6 py-3 rounded-lg 
                   shadow-lg text-lg z-60 font-semibold opacity-0 "
      >
        {errormassage}
      </div>
        <div className="flex justify-center mt-6">
            <button
              onClick={() => navigater("/")}
              className="bg-yellow-400 text-white px-6 py-2 absolute
               rounded-full shadow-md top-5 left-5
               hover:bg-blue-600 transition duration-300 font-semibold flex items-center gap-2"
            >
           <FiArrowLeft className="text-white text-lg" />
              <span>Home</span>
            </button>
          </div>
      <h1 className="text-4xl font-bold mb-6 animate-pulse">🍽️ Order Page</h1>

      <div
        ref={cardRef}
        className="bg-white text-black p-6 rounded-xl shadow-2xl max-w-md w-full cursor-pointer"
        onMouseEnter={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1.05,
            duration: 0.3,
            ease: "power2.out",
          });
        }}
        onMouseLeave={(e) => {
          gsap.to(e.currentTarget, {
            scale: 1,
            duration: 0.3,
            ease: "power2.in",
          });
        }}
      >
        <h1 className="text-3xl font-bold mb-4 text-center">Order Details</h1>
        <h2 className="text-2xl font-semibold mb-2">{product?.name}</h2>
        <p className="text-gray-700 mb-1">Price: ₹{product?.price}</p>
        <p className="text-gray-700 mb-1">Discount: ₹{product?.discount}</p>

        <div className="flex justify-center">
          <button
         
            ref={btnRef}
            onClick={() =>{ handleOrder(product),seterror(false)}}
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
            className="bg-yellow-400 text-black px-6 py-2 text-lg font-semibold rounded-full transition duration-300"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};
export default Order;
