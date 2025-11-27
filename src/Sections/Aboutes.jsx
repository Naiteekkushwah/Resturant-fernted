import React, { useRef } from 'react'
import gsap from 'gsap'
import {useGSAP} from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
const Aboutes = () => {
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const imageRef = useRef(null)
 const foodRef = useRef([])
  useGSAP(() => {
    // Title animation
    gsap.from(titleRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: titleRef.current,
        start: 'top 80%',
      },
    })

    // Subtitle animation
    gsap.from(subtitleRef.current, {
      y: -80,
      opacity: 0,
      duration: 1,
      delay: 0.3,
      scrollTrigger: {
        trigger: subtitleRef.current,
        start: 'top 85%',
      },
    })

    // Image slide-in from right
    gsap.from(imageRef.current, {
      x: 200,
      opacity: 0,
      duration: 1,
      scrollTrigger: {
        trigger: imageRef.current,
        start: 'top 90%',
      },
    }),
     foodRef.current.forEach((el, i) => {
      gsap.from(el, {
        scale: 0,
        opacity: 0,
        y: 50,
        duration: 0.8,
        delay: i * 0.2,
        scrollTrigger: {
          trigger: el,
          start: 'top 95%',
        },
      })
    })
  }, [])

  // Hover effect
  const handleMouseEnter = () => {
    gsap.to(imageRef.current, {
      scale: 1.05,   // हल्का सा zoom/stretch
      y: 10,         // थोड़ा सा drag जैसा effect
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    gsap.to(imageRef.current, {
      scale: 1,
      x: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }

  return (
    <div className='h-screen flex flex-col md:flex-row justify-between items-center bg-gray-200 overflow-hidden'>
      {/* Text Section */}
      <div className='p-12 md:w-1/2'>
        <h2 ref={titleRef} className='text-4xl font-bold mb-4'>About Us</h2>
        <p ref={subtitleRef} className='text-lg text-gray-700'>
          We are a restaurant dedicated to providing the best dining experience with authentic flavors and modern ambiance.
        </p>
      </div>

      {/* Image Section */}
      <div className='flex-1 relative'>
        <img
          ref={imageRef}
          src='upscalemedia-transformed-(1).jpeg'
          alt='About Us'
          className='w-full h-full object-cover rounded-lg shadow-lg cursor-pointer'
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
       
    </div>
  )
}
export default Aboutes
