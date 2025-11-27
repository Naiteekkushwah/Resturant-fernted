import {useEffect, useRef,useState} from "react";
import { gsap } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useGSAP } from '@gsap/react'
import axios from "axios";
import {useNavigate} from 'react-router-dom';
gsap.registerPlugin(ScrollTrigger);
export default function Manu() {
  const navigate=useNavigate();
const [message, setShowMsg] = useState(false);
  const itemsRef = useRef([]);
const [showerror, seterror] = useState(false);
 const [errormassage, seterrormassage] = useState('')
 console.log(errormassage);
 
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [suggestions, setSuggestions] = useState([]);
   const msgRef = useRef(null);
  
  useGSAP(() => {
    // Stagger animation for menu items
    gsap.fromTo(
      itemsRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
         scrollTrigger: {
        trigger: itemsRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse"
      }
      },

     
    );
    
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
async function fetchData() {
  try {
    const response = await axios.get(`${import.meta.env.BACKEND_UIL}/api/productfind`,{
       headers:{
      Authorization:`Bearer ${localStorage.getItem('token')}`
    }
    });
    if (response.status === 200) {
      setData(response.data.products);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

useEffect(() => {
  fetchData();
}, []);

const Handle = (item) => {
  console.log("Ordering item:", item);
  navigate('/order', { state: { item } });
}

const ADDtocarte = async(item) =>{
  try {

     const res = await axios.post(`${import.meta.env.BACKEND_UIL}/api/ADDtocart`,
    
  { productId: item._id },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }
    
  ) 
   if (res.status === 200) {
      setShowMsg(true);
    }
  

  } catch (error) {
    seterror(true)
    seterrormassage(error.response.data.message)
  }
}
  // Search logic
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    if (value) {
      const filtered = data.filter((p) =>
        p.name.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (product) => {
    const newList = [product, ...data.filter((p) => p._id !== product._id)];
    setData(newList);
    setSuggestions([]);
    setSearch("");
    setTimeout(() => {
      gsap.from(`#product-${product._id}`, {
        y: -20,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        ease: "power3.out",
      });
    }, 100);
  };

  return (
  <section
  id="section"
  className="bg-gray-50 py-6 px-3 md:px-6 flex flex-col md:flex-row gap-6 relative"
>   <div
        ref={msgRef}
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 
                   bg-green-500 text-white px-6 py-3 rounded-lg 
                   shadow-lg text-lg font-semibold opacity-0 z-60"
      >
        Successfully Added! 🛍️ Item has been added to your cart.
      </div>
       <div 
         ref={msgRef}
        className="absolute top-[-100px] left-1/2 -translate-x-1/2 
                   bg-red-500 text-white px-6 py-3 rounded-lg 
                   shadow-lg text-lg z-60 font-semibold opacity-0 "
      >
        {errormassage}
      </div>
  {/* Left Sidebar */}
 

  {/* Right Product Section */}
  <div className="flex-1">
    {/* Search Bar fixed at top */}
    <div className="sticky top-0 bg-white z-50 p-3 shadow-md mb-4">
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search menu..."
        className="w-full border rounded px-4 py-2 shadow focus:outline-none"
      />
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border rounded shadow mt-1 z-500">
          {suggestions.map((s) => (
            <li
              key={s._id}
              onClick={() => handleSelect(s)}
              className="px-4 py-2 cursor-pointer hover:bg-yellow-100 transition"
            >
              {s.name}
            </li>
          ))}
        </ul>
      )}
    </div>

    {/* Product Grid */}
    <div
      id="right"
      className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 relative"
    >
      {data.map((item, i) => (
        <div
          key={i}
          ref={(el) => (itemsRef.current[i] = el)}
          className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition duration-300 relative z-10"
        >
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-40 object-cover"
          />
          <div className="flex flex-col p-4 space-y-2">
            <h3 className="text-base md:text-lg font-semibold">{item.name}</h3>
            <p className="text-gray-700 font-medium">₹{item.price}</p>
            <p className="text-gray-500 text-sm">Discount: ₹{item.discount}%</p>
            <div className="flex items-center space-x-3 justify-between w-full mt-2">
              <button
                onClick={() => Handle(item)}
                className="bg-yellow-400 text-black px-3 py-1 text-sm font-semibold rounded-full hover:bg-yellow-500 transition duration-300"
              >
                Order Now
              </button>
              <button
                onClick={() => {
                  ADDtocarte(item);
                  setShowMsg(false);
                  seterror(false)
                }}
                className="bg-gray-100 border border-amber-400 flex items-center justify-around text-black px-3 py-1 text-sm rounded-full hover:bg-gray-200 transition duration-300"
              >
                <span className="text-yellow-500">ADD</span>
                <span className="text-amber-400">+</span>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>


  );
}
