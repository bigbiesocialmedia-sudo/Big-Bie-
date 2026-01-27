import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CATEGORIES } from '../constants';
import { ArrowRight } from 'lucide-react';

const CategoryGrid: React.FC = () => {
  // Helpers to get specific categories by index
  // Assuming order: 0: Bras, 1: Kids, 2: Panties, 3: Slips
  // We want: 
  // Left Large: Bras (0)
  // Middle Top: Furniture/Essentials -> Panties (2)
  // Middle Bottom: Fashion/Accessories -> Slips (3)
  // Right Large: Grocery/Food -> Kids (1)

  const bras = CATEGORIES[0];
  const kids = CATEGORIES[1];
  const panties = CATEGORIES[2];
  const slips = CATEGORIES[3];

  return (
    <section className="w-full bg-[#FAFAFA] py-16 lg:py-24">
      <div className="container mx-auto px-6 max-w-[1200px]">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#1A1A1A]">Explore Trending Collections</h2>
          <Link to="/collections/bras" className="hidden lg:flex items-center text-sm font-bold text-gray-500 hover:text-blue-600 transition-colors">
            View all <ArrowRight size={16} className="ml-1" />
          </Link>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-auto lg:h-[500px]">

          {/* COL 1: Bras (Glassmorphism Style) */}
          <Link to={bras.href} className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 lg:col-span-1 h-full min-h-[400px]">
            {/* Full Background Image */}
            <motion.img
              src={bras.image}
              alt={bras.title}
              className={`absolute inset-0 w-full h-full object-cover ${bras.objectPosition || 'object-top'} group-hover:scale-110 transition-transform duration-700`}
            />

            {/* Dark Gradient Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

            {/* Content Container */}
            <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end h-full">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                  Collection
                </span>
                <h3 className="text-4xl font-bold text-white mb-2 leading-none tracking-tight">{bras.title}</h3>
                <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  Discover everyday comfort
                </p>
              </div>

              {/* Glass Button */}
              <button className="w-full bg-white/20 backdrop-blur-lg border border-white/40 text-white text-sm font-bold py-3.5 rounded-2xl hover:bg-white hover:text-black transition-all duration-300 shadow-xl flex items-center justify-center group-hover:gap-2">
                <span>Explore Now</span>
                <ArrowRight size={16} className="w-0 group-hover:w-4 transition-all duration-300" />
              </button>
            </div>
          </Link>

          {/* COL 2: Stacked (Panties & Slips) - Kept clean & white */}
          <div className="lg:col-span-2 grid grid-rows-2 gap-6 h-full">

            {/* Top: Panties */}
            <Link to={panties.href} className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex items-center justify-between p-6">
              <div className="flex flex-col justify-center h-full max-w-[50%] z-10">
                <h3 className="text-2xl font-bold text-gray-900">Essential<br />{panties.title}</h3>
                <button className="mt-4 bg-[#3b82f6] text-white text-xs font-bold px-6 py-2 rounded-full w-max hover:bg-blue-700 transition-colors">
                  Explore product →
                </button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-center overflow-hidden">
                <motion.img src={panties.image} alt={panties.title} className={`h-full w-full object-cover ${panties.objectPosition || 'object-center'} group-hover:scale-105 transition-transform duration-500`} />
              </div>
            </Link>

            {/* Bottom: Slips */}
            <Link to={slips.href} className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 bg-white flex items-center justify-between p-6">
              <div className="flex flex-col justify-center h-full max-w-[50%] z-10">
                <h3 className="text-2xl font-bold text-gray-900">Cozy<br />{slips.title}</h3>
                <button className="mt-4 bg-[#3b82f6] text-white text-xs font-bold px-6 py-2 rounded-full w-max hover:bg-blue-700 transition-colors">
                  Explore product →
                </button>
              </div>
              <div className="absolute right-0 top-0 h-full w-1/2 flex items-center justify-center overflow-hidden">
                <motion.img src={slips.image} alt={slips.title} className={`h-full w-full object-cover ${slips.objectPosition || 'object-center'} group-hover:scale-105 transition-transform duration-500`} />
              </div>
            </Link>

          </div>

          {/* COL 3: Kids (Glassmorphism Style) */}
          <Link to={kids.href} className="group relative rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 lg:col-span-1 h-full min-h-[400px]">
            {/* Full Background Image */}
            <motion.img
              src={kids.image}
              alt={kids.title}
              className={`absolute inset-0 w-full h-full object-cover ${kids.objectPosition || 'object-center'} group-hover:scale-110 transition-transform duration-700`}
            />

            {/* Dark Gradient Overlay for Contrast (Same as Bras) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500"></div>

            {/* Content Container (Same as Bras) */}
            <div className="absolute bottom-0 inset-x-0 p-6 z-10 flex flex-col justify-end h-full">
              <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                {/* Pill Tag */}
                <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-3">
                  New Arrival
                </span>
                <h3 className="text-4xl font-bold text-white mb-2 leading-none tracking-tight">Kids Collection</h3>
                <p className="text-gray-300 text-sm mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                  Soft & Playful
                </p>
              </div>

              {/* Glass Button (Exact match to Bras) */}
              <button className="w-full bg-white/20 backdrop-blur-lg border border-white/40 text-white text-sm font-bold py-3.5 rounded-2xl hover:bg-white hover:text-black transition-all duration-300 shadow-xl flex items-center justify-center group-hover:gap-2">
                <span>Explore Now</span>
                <ArrowRight size={16} className="w-0 group-hover:w-4 transition-all duration-300" />
              </button>
            </div>
          </Link>

        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
