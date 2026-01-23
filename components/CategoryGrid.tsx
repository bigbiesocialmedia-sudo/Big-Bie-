
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../constants';

const CategoryGrid: React.FC = () => {
  return (
    <section className="w-full bg-white py-8 lg:py-12">
      {/* 
        COMPACT SECTION CONTAINER:
        - Tight layout matching reference image.
        - Minimal padding for compact view.
        - Everything visible in one scroll.
      */}
      <div className="container mx-auto px-4 max-w-[1100px]">

        {/* 
          TIGHT GRID LAYOUT:
          - 2 columns on desktop/tablet.
          - NO GAPS between tiles for seamless look.
          - Fade in naturally on scroll.
        */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 md:grid-cols-2 gap-0"
        >
          {CATEGORIES.slice(0, 4).map((cat) => (
            <Link
              key={cat.title}
              to={cat.href}
              className="relative group block overflow-hidden aspect-[16/9] w-full bg-gray-100"
            >
              {/* 
                IMAGE DESIGN:
                - Fits tile perfectly with object-cover.
                - Subtle zoom-in hover effect.
              */}
              <motion.img
                src={cat.image}
                alt={cat.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />

              {/* 
                HOVER OVERLAY:
                - Very subtle dark overlay on hover only.
                - Enhanced visibility for text interaction
              */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 ease-in-out"></div>

              {/* 
                TEXT OVERLAY:
                - Bottom-left position.
                - White, bold, clean sans-serif.
                - Subtle shadow for readability.
              */}
              <div className="absolute bottom-4 left-4 lg:bottom-6 lg:left-6 z-10">
                <h3 className="text-2xl lg:text-3xl font-bold text-white uppercase tracking-tight drop-shadow-lg select-none">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryGrid;
