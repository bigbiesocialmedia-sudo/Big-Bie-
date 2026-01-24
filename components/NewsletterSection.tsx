
import React from 'react';
import { motion } from 'framer-motion';

const NewsletterSection: React.FC = () => {
  return (
    <section className="bg-[#F4C430] py-20">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-black uppercase leading-tight mb-4">
              Join the Big Bie Family
            </h2>
            <p className="text-black/70 text-lg font-medium">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="YOUR EMAIL ADDRESS"
                className="flex-grow bg-white px-8 py-5 text-sm font-bold tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-black transition-all"
              />
              <button
                type="submit"
                className="bg-black text-white px-10 py-5 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
