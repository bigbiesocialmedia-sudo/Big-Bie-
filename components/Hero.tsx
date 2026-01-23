
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdmin } from '../context/AdminContext';

const Hero: React.FC = () => {
  const { homeSettings } = useAdmin();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (homeSettings.bannerImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % homeSettings.bannerImages.length);
    }, 5000); // Slide every 5 seconds

    return () => clearInterval(interval);
  }, [homeSettings.bannerImages]);

  return (
    <section className="relative w-full aspect-square lg:aspect-auto lg:h-screen overflow-hidden bg-[#F4C430]">
      {/* 
        STRICT COMPLIANCE: 
        - ONE image = the entire section.
        - No headings, buttons, or UI elements.
        - Full viewport width and height.
        - Cinematic zoom-out animation on load.
      */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2,
          ease: [0.33, 1, 0.68, 1] // Smooth cinematic ease-out
        }}
        className="w-full h-full"
      >
        <img
          src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=2400"
          alt="Prithvi Hero Banner"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
          loading="eager"
        />
      </motion.div>

      {/* 
        The background brand color is set on the section to ensure no flickering 
        during image load. All marketing text and branding are assumed to be 
        flattened within the banner image itself.
      */}
    </section>
  );
};

export default Hero;
