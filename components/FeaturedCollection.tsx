import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAdmin } from '../context/AdminContext';
import ProductCard from './ProductCard';

const FeaturedCollection: React.FC = () => {
  const { products, homeSettings } = useAdmin();

  // Filter products based on saved IDs in homeSettings
  const featuredProducts = products.filter(p => homeSettings.featuredProductIds.includes(p.id));
  // Fallback if no products match (e.g., deleted), show first 4
  const displayProducts = featuredProducts.length > 0 ? featuredProducts : products.slice(0, 4);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className="py-24 bg-white border-t border-gray-50">
      <div className="container mx-auto px-6 max-w-[1200px]">

        {/* HEADER */}
        <div className="text-center mb-16 space-y-4">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold tracking-[0.4em] text-[#F4C430] uppercase block"
          >
            BRAND NEW
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-bold text-[#1A1A1A] tracking-tight"
          >
            Shop our newest bras
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed"
          >
            Our bras will make you feel beautiful inside out the moment you wear it.
            Designed for everyday elegance and unmatched durability.
          </motion.p>
        </div>

        {/* COLLECTION GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {displayProducts.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} minimal={true} />
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-16"
        >
          <Link to="/collections/bras" className="w-full sm:w-auto">
            <button className="w-full bg-[#F4C430] text-black px-12 py-4 font-bold uppercase tracking-widest text-sm hover:bg-black hover:text-[#F4C430] transition-all duration-300 shadow-md">
              Shop Bras
            </button>
          </Link>
          <Link to="/" className="w-full sm:w-auto">
            <button className="w-full bg-transparent border-2 border-[#F4C430] text-black px-12 py-4 font-bold uppercase tracking-widest text-sm hover:bg-[#F4C430] transition-all duration-300">
              Shop All
            </button>
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default FeaturedCollection;
