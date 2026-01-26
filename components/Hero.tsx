
import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full aspect-square lg:aspect-auto lg:h-screen overflow-hidden bg-black">
      {/* 
        IMAGE BACKGROUND:
        - Full viewport width and height.
        - Static background image.
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
          src="/Products/Home Collection/HomeBanner.png"
          alt="Hero Banner"
          className="w-full h-full object-cover object-center pointer-events-none select-none"
        />
      </motion.div>

      {/* 
        The background color is set to black to ensure no flickering 
        during image load.
      */}
    </section>
  );
};

export default Hero;
