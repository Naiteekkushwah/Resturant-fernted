import { useRef, useState } from "react";
import { gsap, } from "gsap";
import { useGSAP } from "@gsap/react";
import { FaSearch, FaBars, FaTimes, FaShoppingCart } from "react-icons/fa";
import { FaUtensils } from "react-icons/fa"; 
import { Link } from "react-scroll";
import {useNavigate} from 'react-router-dom';
export default function Navbar() {
  const navRef = useRef(null);
  const searchBoxRef = useRef(null);
  const menuRef = useRef(null);
  const overlayRef = useRef(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
const navigetor = useNavigate()
  


  // Initial animations
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

    tl.from("#Nav", { y: -100, opacity: 0, duration: 0.8 });
    tl.from(".logo", { opacity: 0, scale: 0.5, duration: 0.5 }, "-=0.4");
    tl.from(".nav-link", { opacity: 0, y: -20, stagger: 0.2, duration: 0.6 }, "-=0.3");
    tl.from(".button", { opacity: 0, scale: 0.8, stagger: 0.2, duration: 0.6 }, "-=0.3");
  }, []);

  // Search animation
  useGSAP(() => {
    if (searchOpen) {
      gsap.to(searchBoxRef.current, {
        width: "180px",
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(searchBoxRef.current, {
        width: "0px",
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, [searchOpen]);

  // Mobile menu animation + overlay blur
  useGSAP(() => {
    if (menuOpen) {
      gsap.to(menuRef.current, {
        x: 0,
        opacity: 1,
        duration: 0.6,
        ease: "expo.out"
      });
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(menuRef.current, {
        x: "100%",
        opacity: 0,
        duration: 0.6,
        ease: "expo.in"
      });
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.5,
        ease: "power2.in"
      });
    }
  }, [menuOpen]);

  // Scroll effect
  useGSAP(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = ["Home", "About", "Menu", "Contact"];

  return (
    <>
      <nav
        id="Nav"
        ref={navRef}
        className={`w-full flex items-center justify-between px-4 fixed z-1500 top-0 left-0 transition-all duration-500 ${
          scrolled ? "bg-black shadow-lg h-14" : "bg-[rgba(0,0,0,0.4)] h-20"
        } text-white`}
      >
        {/* Logo */}
        <div className="logo text-2xl font-extrabold tracking-wider">🍕 Restaurant</div>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex space-x-6 items-center justify-between">
          {menuItems.map((item, i) => (
            <Link
              key={i}
              to={item}
                smooth={true}
              duration={600}
              offset={-80}
              className="nav-link relative px-3 py-2 font-semibold hover:text-yellow-400 after:content-[''] after:block after:h-[2px] after:bg-yellow-400 after:w-0 hover:after:w-full after:transition-all after:duration-300"
            >
              {item}
            </Link>
          ))}
           <div className="relative group nav-link">
            <button className="nav-link relative px-3 py-2 font-semibold hover:text-yellow-400 after:content-[''] after:block after:h-[2px] after:bg-yellow-400 after:w-0 hover:after:w-full after:transition-all after:duration-300">
              Pages
            </button>
            <div className="absolute left-0 mt-2 w-40 bg-gray-800 rounded shadow-lg opacity-0 group-hover:opacity-100 group-hover:translate-y-1 transform transition-all duration-300 z-50">
              <ul className="flex flex-col text-white">
                 <li>
                  <Link
                    onClick={()=>{navigetor('/gett')}}
                    smooth={true}
                    duration={600}
                    offset={-80}
                    className="block px-4 py-2 hover:bg-yellow-400 transition duration-200"
                  >
                   getTabls
                  </Link>
                </li>
                <li>
                  <Link
                      onClick={()=>{navigetor('/getO')}}
                    smooth={true}
                    duration={600}
                    offset={-80}
                    className="block px-4 py-2 hover:bg-yellow-400 transition duration-200"
                  >
                    getOders
                  </Link>
                    <Link
                      onClick={()=>{navigetor('/owner')}}
                    smooth={true}
                    duration={600}
                    offset={-80}
                    className="block px-4 py-2 hover:bg-yellow-400 transition duration-200"
                  >
                  Owner
                  </Link>
                </li>
                <li>
                  <Link
                    to="Test"
                    smooth={true}
                    duration={600}
                    offset={-80}
                    className="block px-4 py-2 hover:bg-yellow-400 transition duration-200"
                  >
                    Testimonials
                  </Link>
                </li>
                <li>
                  <Link
                    to="Footer"
                    smooth={true}
                    duration={600}
                    offset={-80}
                    className="block px-4 py-2 hover:bg-yellow-400 transition duration-200"
                  >
                    Footer
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </ul>
 
        {/* Right Section */}
        <div className="flex items-center space-x-3 relative">
          {/* Search */}
       <Link to="Menu"    smooth={true}
              duration={600}
              offset={-80}>
         <FaSearch
                         className="cursor-pointer text-lg hover:text-yellow-400 transition z-20"
                         onClick={() => setSearchOpen(!searchOpen)}
                       />
       </Link>
              
                       
           
            
          {/* Cart */}
          <Link to="/cart" onClick={()=>{navigetor('/cart')}}>
            <FaShoppingCart className="cursor-pointer text-lg hover:text-yellow-400 transition z-20" />
          </Link>

          {/* Login Button */}
          <button onClick={()=>{navigetor('/login')}} className="button hidden sm:inline-flex items-center bg-yellow-400 border-0 py-1 px-3 focus:outline-none hover:bg-yellow-500 rounded text-base">
            Login
          </button>

          {/* Signup Button */}
          <button onClick={()=>{navigetor('/signup')}} className="button hidden sm:inline-flex items-center bg-yellow-400 border-0 py-2 px-4 focus:outline-none hover:bg-yellow-300 rounded text-base">
          Signup
          </button>

          {/* Mobile Menu Icon */}
          {menuOpen ? (
            <FaTimes
              className="lg:hidden text-2xl text-white z-30 cursor-pointer"
              onClick={() => setMenuOpen(false)}
            />
          ) : (
            <FaBars
              className="lg:hidden text-2xl  cursor-pointer"
              onClick={() => setMenuOpen(true)}
            />
          )}
        </div>
      </nav>

      {/* Overlay Blur */}
      <div
        ref={overlayRef}
        className="fixed inset-0 bg-opacity-50 backdrop-blur-sm opacity-0 pointer-events-none transition-all duration-500"
      ></div>

      {/* Mobile Menu Drawer */}
      <div
        ref={menuRef}
        className="fixed top-0 right-0 h-full w-2/3 backdrop-blur-xl text-gray-800 flex flex-col items-center justify-center space-y-6 transform translate-x-full opacity-0 lg:hidden z-20"
      >
        {menuItems.map((item, i) => (
          <Link
            key={i}
            to={item}
            className="text-xl font-bold hover:text-yellow-400  mix-blend-darken transition"
            onClick={() => setMenuOpen(false)}
          >
            {item}
          </Link>
        ))}
                  <Link
                    onClick={()=>{navigetor('/gett')}}
                    smooth={true}
                    duration={600}
                    offset={-80}
                    className="block px-4 py-2 text-xl font-bold transition duration-200"
                  >
                   getTabls
                  </Link>
                
                  <Link
                      onClick={()=>{navigetor('/getO')}}
                    smooth={true}
                    duration={600}
                    offset={-80}
                    className="block px-4 py-2 text-xl font-bold transition duration-200"
                  >
                    getOders
                  </Link>
               
                  <Link
                    to="Test"
                    smooth={true}
                    duration={600}
                    offset={-80}
                    className="block px-4 py-2 text-xl font-bold transition duration-200"
                  >
                    Testimonials
                  </Link>
               
                  <Link
                    to="Footer"
                    smooth={true}
                    duration={600}
                    offset={-80}
                    className="block px-4 py-2 text-xl font-bold transition duration-200"
                  >
                    Footer
                  </Link>
          
         <button onClick={()=>{navigetor('/login'),setMenuOpen(false)}} className="button sm:inline-flex items-center bg-yellow-400 border-0 py-1 px-3 focus:outline-none hover:bg-yellow-500 rounded text-base">
            Login
          </button>

          {/* Signup Button */}
          <button onClick={()=>{navigetor('/signup'),setMenuOpen(false)}} className="button sm:inline-flex items-center bg-yellow-400 border-0 py-2 px-4 focus:outline-none hover:bg-yellow-300 rounded text-base">
          Signup
          </button>

      </div>
    </>
  );
}

