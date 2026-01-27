
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const StorySection: React.FC = () => {
  return (
    <section className="relative w-full h-[600px] lg:h-[700px] overflow-hidden group">
      {/* Full-width Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          src="https://videos.pexels.com/video-files/9092375/9092375-hd_1920_1080_30fps.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[2s]"
        />
        {/* Cinematic Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-2xl text-white"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[2px] w-12 bg-[#F4C430]"></div>
              <span className="uppercase tracking-[0.2em] text-sm font-semibold text-[#F4C430]">Legacy & Craft</span>
            </div>

            <h2 className="text-5xl lg:text-7xl font-black mb-8 leading-tight">
              Indian Made.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                World Class.
              </span>
            </h2>

            <p className="text-lg lg:text-xl text-gray-200 leading-relaxed mb-10 max-w-xl font-light">
              We are committed to the strength of Indian manufacturing, delivering durable, high-quality innerwear crafted for today’s woman—balancing everyday versatility with lasting comfort and refined style.
            </p>

            <Link to="/about/our-story">
              <button className="group relative overflow-hidden bg-white text-black px-10 py-4 font-bold uppercase tracking-widest text-sm transition-all hover:bg-[#F4C430] hover:text-black">
                <span className="relative z-10 flex items-center gap-2">
                  Discover Our Story
                  <motion.span
                    initial={{ x: 0 }}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    →
                  </motion.span>
                </span>
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default StorySection;
