import React, { useRef } from "react";
import {useGSAP} from '@gsap/react';
import gsap from "gsap";
const Massage = ({ show, message }) => {
  const msgRef = useRef(null);

  useGSAP(() => {
    if (show) {
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
  }, [show]);

  return (
    <div
      ref={msgRef}
      className=" absolute top-[-100px] left-1/2 -translate-x-1/2 
                 bg-green-500 text-white px-6 py-3 rounded-lg 
                 shadow-lg text-lg font-semibold opacity-0 z-50"
    >
      {message}
    </div>
  );
};
export default Massage;
