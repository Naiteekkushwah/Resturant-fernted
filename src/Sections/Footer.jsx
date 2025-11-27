import React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {Link} from 'react-scroll'
gsap.registerPlugin(ScrollTrigger);
const Footer = () => {
  useGSAP(() => {
    // ScrollTrigger animation for footer sections
    gsap.from(".footer-section", {
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      toggleActions: "play none none reverse"
    });
  }, []);

  return (
    <footer className="text-gray-700 body-font bg-white font-serif shadow-lg">
      <div className="container px-5 py-16 mx-auto flex flex-wrap md:text-left text-center order-first">
        {/* About Section */}
      <div className="footer-section lg:w-1/4 md:w-1/2 w-full px-4">
  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-sm mb-3">
    🍕 Restaurant
  </h2>
  <p className="text-gray-600 text-sm mb-3">
    Welcome to <span className="font-bold">SpiceHub 🍴</span> — serving authentic
    flavors with love and passion. Taste the tradition!
  </p>
  <p className="text-gray-600 text-sm mb-3">
    🌟 Established in 2010, we bring together the finest ingredients and
    traditional recipes to create unforgettable dining experiences.
  </p>
  <p className="text-gray-600 text-sm mb-3">
    🥘 Our specialties include North Indian curries, South Indian delicacies,
    and fusion dishes crafted by expert chefs.
  </p>
  <p className="text-gray-600 text-sm mb-3">
    🍷 Enjoy a cozy ambience perfect for family dinners, romantic evenings, or
    casual hangouts with friends.
  </p>
  <p className="text-gray-600 text-sm">
    ❤️ Customer satisfaction is our priority — every dish is made fresh and
    served with care.
  </p>
</div>


        {/* Menu Section */}
       <div className="footer-section lg:w-1/4 md:w-1/2 w-full px-4">
  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-sm mb-3">
    MENU
  </h2>
  <nav className="list-none mb-10 space-y-2">
    <li className="hover:text-yellow-400 cursor-pointer">Starters</li>
    <li className="hover:text-yellow-400 cursor-pointer">Main Course</li>
    <li className="hover:text-yellow-400 cursor-pointer">Desserts</li>
    <li className="hover:text-yellow-400 cursor-pointer">Drinks</li>
    <li className="hover:text-yellow-400 cursor-pointer">Specials</li>
    <li className="hover:text-yellow-400 cursor-pointer">Chef’s Choice</li>
    <li className="hover:text-yellow-400 cursor-pointer">Vegetarian</li>
    <li className="hover:text-yellow-400 cursor-pointer">Non‑Veg Delights</li>
    <li className="hover:text-yellow-400 cursor-pointer">Seafood</li>
    <li className="hover:text-yellow-400 cursor-pointer">Breakfast</li>
    <li className="hover:text-yellow-400 cursor-pointer">Lunch</li>
    <li className="hover:text-yellow-400 cursor-pointer">Dinner</li>
  </nav>
</div>


        {/* Contact Section */}
    <div className="footer-section lg:w-1/4 md:w-1/2 w-full px-4">
  <h2 className="title-font font-semibold text-gray-900 tracking-widest text-sm mb-3">
    CONTACT
  </h2>
  <div className="text-gray-600 text-sm space-y-2">
    <p className="font-medium text-gray-900">📞 +91-XXXXXXXXXX</p>
    <p>✉️ contact@spicehub.com</p>
    <p>📍 123 Food Street</p>
    <p>🕒 Mon – Sun: 10:00 AM – 11:00 PM</p>
  </div>
</div>


        {/* Social Section */}
        <div className="footer-section lg:w-1/4 md:w-1/2 w-full px-4">
          <h2 className="title-font font-semibold text-gray-900 tracking-widest text-sm mb-3">
            FOLLOW US
          </h2>
          <div className="flex space-x-4 flex-col text-gray-600">
            <a  className="hover:text-yellow-400">Facebook</a>
            <a  className="hover:text-yellow-400">Instagram</a>
            <a  className="hover:text-yellow-400">Twitter</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100">
        <div className="container px-5 py-6 mx-auto flex items-center sm:flex-row flex-col justify-between">
          <p className="text-sm text-gray-500">
            © 2025 SpiceHub — All Rights Reserved
          </p>

          {/* Animated Scroll-to-top Button */}
          <Link
        to="Home"    smooth={true}
              duration={2000}
              offset={-80}
            className="mt-4 sm:mt-0 bg-yellow-400 text-white px-4 py-2 rounded-full font-bold hover:bg-yellow-500 transform hover:scale-110 transition duration-300"
          >
            ⬆ Back to Top
          </Link>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
