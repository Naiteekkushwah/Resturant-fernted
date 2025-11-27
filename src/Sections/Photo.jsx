import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
const images = [
  { src: "https://images.unsplash.com/photo-1593504049359-74330189a345?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGl6emF8ZW58MHx8MHx8fDA%3D", alt: "Signature Pizza" },
  { src: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YnVyZ2VyfGVufDB8fDB8fHww", alt: "Gourmet Burger" },
  { src: "https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBhc3RhfGVufDB8fDB8fHww", alt: "Pasta Alfredo" },
  { src: "https://images.unsplash.com/photo-1517244683847-7456b63c5969?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D", alt: "Sushi Platter" },
  { src: "https://images.unsplash.com/photo-1694849789325-914b71ab4075?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZG9zYXxlbnwwfHwwfHx8MA%3D%3D", alt: "Dessert Trio" },
  { src: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5kaWFuJTIwZm9vZHxlbnwwfHwwfHx8MA%3D%3D", alt: "Indian Thali" },
];
export default function PhotoSection() {
  const sectionRef = useRef(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".card", {
        opacity: 0,
        y: 50,
        rotateX: -10,
        rotateY: 6,
        scale: 0.95,
        ease: "power3.out",
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".grid-wrap",
          start: "top 85%",
          end: "bottom 30%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const midX = rect.width / 2;
    const midY = rect.height / 2;
    const rotateY = ((x - midX) / midX) * 10;
    const rotateX = -((y - midY) / midY) * 10;

    card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
  };
  const handleMouseLeave = (e) => {
    const card = e.currentTarget;
    card.style.transform = `perspective(900px) rotateX(0deg) rotateY(0deg) scale(1)`;
  };
  return (
    <section ref={sectionRef} className="relative py-16 bg-white text-black">
       <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute -top-20 -left-16 w-64 h-64 rounded-full blur-3xl bg-yellow-700" />
        <div className="absolute top-48 -right-20 w-72 h-72 rounded-full blur-3xl bg-amber-600" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full blur-3xl bg-emerald-500" />
      </div>
      <div className="container mx-auto px-4">
        <h2 className="section-title text-3xl md:text-4xl font-extrabold text-center mb-3">
          Our Food Gallery
        </h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">
          Explore our chef’s favorites—crafted to look as good as they taste.
        </p>

        {/* Responsive Grid */}
        <div className="grid-wrap grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {images.map((img, i) => (
            <div
              key={i}
              className="card group relative rounded-xl overflow-hidden bg-gray-100 shadow-lg transition-transform duration-200"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="relative aspect-[4/3]">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="p-4 md:p-5">
                <h3 className="text-lg md:text-xl font-bold">{img.alt}</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Delicious and freshly prepared.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
