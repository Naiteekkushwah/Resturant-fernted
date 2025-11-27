import React, { useRef,useState } from "react";
import gsap from "gsap";
import { FiArrowLeft } from "react-icons/fi";
import { useGSAP } from "@gsap/react";
import {useNavigate} from 'react-router-dom';
import { FaUtensils, FaTag, FaImage,FaMoneyBillWave } from "react-icons/fa";
 
const Owner = () => {
const [message, setShowMsg] = useState(false);
const msgRef = useRef(null);
const navigetor = useNavigate()
const containerRef = useRef(null);
const formRef = useRef(null);
const btnRef = useRef(null);
const [productName, setProductName] = React.useState("");
const [productPrice, setProductPrice] = React.useState("");
const [productImage, setProductImage] = React.useState(null); // file object रखना है
const [productDiscount, setProductDiscount] = React.useState("");

const subminthendler = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append("name", productName);
  formData.append("price", productPrice);
  formData.append("discount", productDiscount);
  formData.append("image", productImage);
  
  // file डालना
setShowMsg(true)
setProductName('')
setProductDiscount('')
setProductPrice('')
}
useGSAP(()=>{
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
})
 
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
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-gray-700 to-black text-amber-50 flex flex-col justify-center items-center px-4"
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
       <div
      ref={msgRef}
      className=" absolute top-[-100px] left-1/2 -translate-x-1/2 
                 bg-green-500 text-white px-6 py-3 rounded-lg 
                 shadow-lg text-lg font-semibold opacity-0 z-50"
    >
     Only Naiteek has the authority to create products.
    </div>
      <h1 className="text-4xl font-bold mb-6 text-yellow-400 animate-pulse flex items-center gap-2">
        <FaUtensils /> Owner Section
      </h1>

      <form
        ref={formRef}
        onSubmit={subminthendler}
        className="bg-white text-black p-6 rounded-xl shadow-2xl w-full max-w-md space-y-4 transition-colors duration-500 hover:bg-yellow-50"
      >
        {/* Product Name */}
        <div className="flex items-center space-x-3">
          <FaTag className="text-red-500 text-xl" />
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            placeholder="Product Name"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
          />
        </div>

        {/* Product Price */}
        <div className="flex items-center space-x-3">
          <FaMoneyBillWave className="text-green-500 text-xl" />
          <input
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            type="text"
            placeholder="Product Price"
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        {/* Product Image */}
        <div className="flex items-center space-x-3">
          <FaImage className="text-blue-500 text-xl" />
          <input
            onChange={(e) => setProductImage(e.target.files[0])}
            type="file"
            name="image"
            required
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Product Discount */}
        <div className="flex items-center space-x-3">
          <FaTag className="text-purple-500 text-xl" />
          <input
            type="text"
            placeholder="Product Discount"
            value={productDiscount}
            onChange={(e) => setProductDiscount(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
          onClick={()=>{setShowMsg(false)}}
            ref={btnRef}
            type="submit"
            className="bg-yellow-400 text-black px-6 py-2 text-lg font-semibold rounded-full transition duration-300 hover:bg-red-500 hover:text-white"
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
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default Owner;
