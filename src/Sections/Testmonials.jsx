import React from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const Testmonials = () => {
  useGSAP(() => {
    // Animate cards on scroll
    gsap.from(".testimonial-card", {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testimonial-section",
        start: "top 50%",
          toggleActions: "play none none reverse",
      },
    });

    // Animate title
    gsap.from(".testimonial-title", {
      y: -80,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".testimonial-title",
        start: "top 90%",
      },
    });
  }, []);
  return (
    <section className="testimonial-section from-indigo-50 via-white to-indigo-50 py-24">
      <div className="container mx-auto px-5">
        <h1
          className="testimonial-title text-center text-5xl font-extrabold mb-16 text-yellow-500"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          What People Are Saying
        </h1>
        <div className="flex flex-wrap -m-4 justify-center">
          {/* Card 1 */}
          <div className="testimonial-card lg:w-1/3 md:w-1/2 p-4">
            <div className="h-full bg-white rounded-xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-1 p-8 text-center">
              <img
                alt="testimonial"
                className="w-24 h-24 mb-6 object-cover object-center rounded-full border-4 border-indigo-200 mx-auto"
                src="https://dummyimage.com/300x300/ffb6c1/000000&text=Sushi"
              />
              <p
                className="leading-relaxed italic text-gray-700"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                “The sushi tastes fresh and authentic. Every bite feels like a
                trip to Tokyo.”
              </p>
              <span className="inline-block h-1 w-10 rounded bg-yellow-500 mt-6 mb-4"></span>
              <h2 className="text-gray-900 font-semibold tracking-wider text-lg">
                Sarah Johnson
              </h2>
              <p className="text-gray-500">Food Blogger</p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="testimonial-card lg:w-1/3 md:w-1/2 p-4">
            <div className="h-full bg-white rounded-xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:-rotate-1 p-8 text-center">
              <img
                alt="testimonial"
                className="w-24 h-24 mb-6 object-cover object-center rounded-full border-4 border-indigo-200 mx-auto"
                src="https://dummyimage.com/300x300/87ceeb/000000&text=Ramen"
              />
              <p
                className="leading-relaxed italic text-gray-700"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                “The ramen is rich, flavorful, and comforting. The best I’ve had
                outside Japan.”
              </p>
              <span className="inline-block h-1 w-10 rounded bg-yellow-500 mt-6 mb-4"></span>
              <h2 className="text-gray-900 font-semibold tracking-wider text-lg">
                David Lee
              </h2>
              <p className="text-gray-500">Software Engineer</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="testimonial-card lg:w-1/3 md:w-1/2 p-4">
            <div className="h-full bg-white rounded-xl shadow-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl hover:rotate-2 p-8 text-center">
              <img
                alt="testimonial"
                className="w-24 h-24 mb-6 object-cover object-center rounded-full border-4 border-indigo-200 mx-auto"
                src="https://dummyimage.com/300x300/f0e68c/000000&text=Bento"
              />
              <p
                className="leading-relaxed italic text-gray-700"
                style={{ fontFamily: "'Roboto Slab', serif" }}
              >
                “The bento boxes are creative and delicious. Perfect for family
                dinners.”
              </p>
               <span className="inline-block h-1 w-10 rounded bg-yellow-500 mt-6 mb-4"></span>
              <h2 className="text-gray-900 font-semibold tracking-wider text-lg">
                Emily Carter
              </h2>
              <p className="text-gray-500">Teacher</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Testmonials;

