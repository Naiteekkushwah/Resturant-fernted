import React, { useRef } from "react";
import gsap from "gsap";
import {useGSAP} from '@gsap/react';
const Laoding = ({ onComplete }) => {
  const loaderRef = useRef(null);
  const textRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    // Loader spin animation (reload जैसा effect)
    gsap.to(loaderRef.current, {
      rotation: 360,
      repeat: -1,
      duration: 1,
      ease: "linear"
    });

    // Text zoom-in + fade-in
    gsap.fromTo(
      textRef.current,
      { scale: 0.8, opacity: 0 },
      { scale: 1.2, opacity: 1, duration: 1.5, ease: "power3.out", delay: 0.5 }
    );

    // जब 3 सेकंड पूरे हों → Loader fade-out और App दिखे
    const timer = setTimeout(() => {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power2.inOut",
        onComplete: onComplete // callback से App दिखेगा
      });
    }, 5000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div ref={containerRef} className="loading-container">
      <div ref={loaderRef} className="loader"></div>
      <h1 ref={textRef}>🍴 Welcome to Spice Restaurant</h1>
    </div>
  );
};

export default Laoding;
