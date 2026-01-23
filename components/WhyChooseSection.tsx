
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Heart, Leaf, MapPin } from 'lucide-react';

const FEATURES = [
  {
    icon: <ShieldCheck size={40} className="text-[#F4C430]" />,
    title: "Premium Quality",
    description: "Finest fabrics sourced for ultimate durability and long-lasting comfort."
  },
  {
    icon: <Heart size={40} className="text-[#F4C430]" />,
    title: "Perfect Fit",
    description: "Designed specifically for the diverse range of Indian body types."
  },
  {
    icon: <Leaf size={40} className="text-[#F4C430]" />,
    title: "Skin Friendly",
    description: "Hypoallergenic materials that allow your skin to breathe all day long."
  },
  {
    icon: <MapPin size={40} className="text-[#F4C430]" />,
    title: "Proudly Indian",
    description: "Celebrating Indian heritage through modern craftsmanship and design."
  }
];

const WhyChooseSection: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold uppercase tracking-widest text-[#1A1A1A]"
          >
            Why Choose Prithvi?
          </motion.h2>
          <div className="w-20 h-1 bg-[#F4C430] mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {FEATURES.map((feature, idx) => (
            <motion.div 
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center p-8 hover:shadow-2xl transition-shadow duration-300 rounded-xl"
            >
              <div className="mb-6 bg-gray-50 p-6 rounded-full">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 uppercase tracking-wide">{feature.title}</h3>
              <p className="text-gray-500 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
