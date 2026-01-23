
import React from 'react';
import { motion } from 'framer-motion';

const StorySection: React.FC = () => {
  return (
    <section className="relative w-full h-[450px] overflow-hidden">
      {/* Full-width Background Image */}
      <motion.div
        initial={{ scale: 1.05, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1920"
          alt="Manufacturing Process"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
      </motion.div>

      {/* Compact Text Overlay */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="bg-white p-8 lg:p-10 max-w-md shadow-xl"
          >
            <h2 className="text-3xl font-bold text-[#1A1A1A] mb-4 uppercase tracking-wide">
              Indian Made
            </h2>
            <p className="text-base text-gray-700 leading-relaxed mb-4">
              High-quality durable inner wear for women with a fun sense of style, looking for versatility.
              We're committed to deliver premium quality innerwear and loungewear at an affordable price,
              coupled with a multitude of colour options.
            </p>
            <button className="text-sm border-b-2 border-black font-bold uppercase tracking-wide hover:text-[#F4C430] hover:border-[#F4C430] transition-all">
              Read Our Story
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
