import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";
import Maps from "../Components/Maps"; // Your existing Maps component
gsap.registerPlugin(ScrollTrigger);
const Contect = () => {
  const pageRef = useRef(null);
  const mapWrapRef = useRef(null);
  const formRef = useRef(null);
  const featureListRef = useRef(null);
  const bgRef = useRef(null);

  useGSAP(() => {
    // Initial page load animation
    gsap.from(pageRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power3.out",
    });

    // Map container reveal
    gsap.from(mapWrapRef.current, {
      opacity: 0,
      x: -30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: mapWrapRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Form reveal
    gsap.from(formRef.current, {
      opacity: 0,
      x: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    // Feature items stagger
    const items = featureListRef.current?.querySelectorAll(".feature-item");
    if (items && items.length) {
      gsap.from(items, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featureListRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Background color change on scroll
    gsap.to(bgRef.current, {
      backgroundColor: "#fffaf0", // a warm restaurant-friendly off-white
      duration: 1,
      ease: "none",
      scrollTrigger: {
        trigger: bgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  // Hover subtle drag helper
  const handleHoverEnter = (e) => {
    const el = e.currentTarget;
    gsap.to(el, {
      scale: 1.02,
      boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
      duration: 0.25,
      ease: "power2.out",
    });
    el.addEventListener("mousemove", handleHoverMove);
  };

  const handleHoverLeave = (e) => {
    const el = e.currentTarget;
    el.removeEventListener("mousemove", handleHoverMove);
    gsap.to(el, {
      x: 0,
      y: 0,
      rotate: 0,
      scale: 1,
      boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
      duration: 0.25,
      ease: "power2.in",
    });
  };

  const handleHoverMove = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: relX * 0.03,
      y: relY * 0.03,
      rotate: relX * 0.005,
      duration: 0.2,
      ease: "power2.out",
    });
  };

  return (
    <section
      ref={bgRef}
      className="min-h-screen w-full bg-white"
    >
      <div
        ref={pageRef}
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20"
      >
        {/* Header */}
        <div className="mb-8 lg:mb-12 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900">
            🍴 Welcome to Our Restaurant
          </h1>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Experience fine dining with farm‑fresh ingredients, chef‑curated menus, and a warm ambience.
          </p>
        </div>

        {/* Top grid: Map + Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          {/* Map */}
          <div
            className="rounded-2xl overflow-hidden bg-white shadow-md p-2 sm:p-3"
          
          >
            <div className="h-[50vh] sm:h-[60vh] lg:h-[75vh] rounded-2xl overflow-hidden">
              <Maps />
            </div>
          </div>

          {/* Form */}
          <div
            ref={formRef}
            className="bg-white rounded-2xl shadow-md p-6 sm:p-8"
            onMouseEnter={handleHoverEnter}
            onMouseLeave={handleHoverLeave}
          >
            <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
              <FiSend className="text-indigo-500" /> Feedback
            </h2>
            <p className="mt-2 text-gray-600">
              Tell us how we can make your dining experience even better.
            </p>

            <form className="mt-6 space-y-5" action="https://formspree.io/f/mnnzywrv" method="post">
                <div>
                <label for='name' className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <input
                  type="name"
                   required
                    autoComplete='off'
                    id="name"
                    name="name"
                    className="w-full bg-white rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 transition-colors duration-200"
                    placeholder="enter full name"
                  />
                  <FiMail className="absolute right-3 top-2.5 text-gray-400" />
                </div>
              </div>
              <div>
                <label for="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <div className="mt-1 relative">
                  <input
                    type="email"
                    id="email"
                    required
                    name="email"
                    className="w-full bg-white rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-2 px-3 transition-colors duration-200"
                    placeholder="you@example.com"
                  />
                  <FiMail className="absolute right-3 top-2.5 text-gray-400" />
                </div>
              </div>

              <div>
                <label for="message" className="block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-white rounded-lg border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-2 px-3 resize-none transition-colors duration-200"
                  placeholder="Share your thoughts..."
                ></textarea>
              </div>

              <button
                className="inline-flex items-center justify-center gap-2 text-white bg-indigo-500 hover:bg-indigo-600 active:bg-indigo-700 border-0 py-2 px-6 rounded-lg text-base font-semibold transition-colors duration-200 shadow-sm"
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                <FiSend /> Send
              </button>

              <p className="text-xs text-gray-500 mt-3">
                We value your feedback. Thank you for helping us improve.
              </p>
            </form>

            {/* Contact shortcuts */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                className="feature-item flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                <FiPhone className="text-emerald-500 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">+91-XXXXXXXXXX</p>
                </div>
              </div>
              <div
                className="feature-item flex items-center gap-3 bg-white rounded-xl border border-gray-200 p-4 shadow-sm"
                onMouseEnter={handleHoverEnter}
                onMouseLeave={handleHoverLeave}
              >
                <FiMapPin className="text-rose-500 text-xl" />
                <div>
                  <p className="text-sm text-gray-500">Address</p>
                  <p className="font-medium text-gray-900">Indore, Madhya Pradesh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features / Highlights strip with ScrollTrigger */}
        <div
          ref={featureListRef}
          className="mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {[
            { title: "Farm-fresh Ingredients", color: "bg-emerald-50", border: "border-emerald-200" },
            { title: "Chef-curated Menus", color: "bg-indigo-50", border: "border-indigo-200" },
            { title: "Warm Ambience", color: "bg-rose-50", border: "border-rose-200" },
          ].map((card, idx) => (
            <div
              key={idx}
              className={`feature-item ${card.color} rounded-2xl border ${card.border} p-6 shadow-sm cursor-pointer`}
              onMouseEnter={handleHoverEnter}
              onMouseLeave={handleHoverLeave}
            >
              <h3 className="text-lg font-semibold text-gray-900">{card.title}</h3>
              <p className="mt-2 text-gray-600">
                Experience the best of taste, freshness, and hospitality.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Contect;
