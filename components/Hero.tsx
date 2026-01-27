import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

const Hero: React.FC = () => {
  const { homeSettings } = useAdmin();
  // Strictly use admin settings. Fallback only to empty array if undefined.
  const heroImages = homeSettings.heroImages || [];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (heroImages.length <= 1) return; // No need to cycle if 0 or 1 image
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroImages.length]);

  return (
    <section className="w-full bg-[#FAFAFA] pt-24 pb-12 lg:pt-40 lg:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6 max-w-[1200px]">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">

          {/* RIGHT IMAGE SLIDER (Mobile: First, Desktop: Last) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-1/2 relative order-1 lg:order-2"
          >
            <div className="aspect-[4/5] lg:aspect-[4/5] w-full max-w-md mx-auto lg:max-w-none rounded-[32px] lg:rounded-[40px] overflow-hidden shadow-2xl relative bg-[#f0f0f0]">
              <AnimatePresence>
                <motion.img
                  key={currentImageIndex}
                  src={heroImages[currentImageIndex]}
                  alt="Hero Model"
                  className="absolute inset-0 w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: "easeInOut" }}
                />
              </AnimatePresence>

              {/* Decorative Elements */}
              <div className="absolute top-6 right-0 lg:top-10 bg-white/80 backdrop-blur-sm p-3 lg:p-4 rounded-l-2xl shadow-lg border border-white/50 z-10">
                <div className="flex items-center gap-2 lg:gap-3">
                  <span className="w-2 h-2 lg:w-3 lg:h-3 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-xs lg:text-sm font-bold text-gray-800">New Collection Live</span>
                </div>
              </div>

              {/* Slide Indicators */}
              <div className="absolute bottom-4 lg:bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {heroImages.map((_, idx) => (
                  <div
                    key={idx}
                    className={`h-1.5 lg:h-2 rounded-full transition-all duration-300 ${idx === currentImageIndex ? 'w-6 lg:w-8 bg-white' : 'w-1.5 lg:w-2 bg-white/50'}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* LEFT CONTENT (Mobile: Second, Desktop: First) */}
          <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 z-10 order-2 lg:order-1 text-center lg:text-left">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl lg:text-7xl font-bold text-[#1A1A1A] leading-[1.1]"
            >
              Your <span className="text-[#3b82f6]">One-Stop</span><br />
              Shop for <span className="relative inline-block">
                Everything
                <svg className="absolute w-full h-2 lg:h-3 -bottom-1 left-0 text-[#F4C430]" fill="currentColor" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0 10 Q 50 20 100 10 L 100 15 Q 50 25 0 15 Z" />
                </svg>
              </span><br />
              You Need!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-500 text-base lg:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Experience unmatched comfort and style with our latest innerwear collection.
              Friendly customer service, and secure transactions guaranteed!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="grid grid-cols-2 gap-3 lg:flex lg:gap-4 w-full"
            >
              <div className="bg-[#F4C430] p-4 lg:p-6 rounded-2xl shadow-lg transform lg:rotate-[-3deg] hover:rotate-0 transition-transform duration-300 flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-black mb-1">New Arrival</h3>
                  <p className="text-xs lg:text-sm font-medium mb-3 lg:mb-4">Best prices!</p>
                </div>
                <Link to="/collections/bras" className="block w-full bg-white text-black py-2 rounded-full text-center text-xs lg:text-sm font-bold shadow-sm hover:shadow-md transition-shadow">
                  Shop Now
                </Link>
              </div>

              <div className="bg-white border border-gray-100 p-4 lg:p-6 rounded-2xl shadow-xl transform lg:rotate-[3deg] hover:rotate-0 transition-transform duration-300 flex flex-col justify-between h-full">
                <div>
                  <div className="mb-2 bg-blue-100 text-blue-600 text-[10px] lg:text-xs font-bold px-2 py-0.5 lg:py-1 rounded inline-block">Best Offers</div>
                  <h3 className="text-lg lg:text-xl font-bold text-[#3b82f6] mb-3">Dealership</h3>
                </div>
                <Link to="/about/deals" className="block w-full bg-[#3b82f6] text-white py-2 rounded-full text-center text-xs lg:text-sm font-bold shadow-blue-200 shadow-lg hover:bg-blue-700 transition-colors">
                  Apply Now
                </Link>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
