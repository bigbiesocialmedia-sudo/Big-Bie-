
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
    <section className="py-24 relative overflow-hidden bg-gray-50">
      {/* Background with parallax-like feel */}
      <div className="absolute inset-0 z-0 opacity-5">
        <img
          src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=2000"
          alt="Pattern Background"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block"
          >
            <span className="text-[#F4C430] font-bold tracking-[0.2em] uppercase text-sm mb-4 block">Our Promise</span>
            <h2 className="text-4xl lg:text-5xl font-black text-[#1A1A1A] mb-6">
              Why Choose Big Bie?
            </h2>
            <div className="w-24 h-1.5 bg-[#F4C430] mx-auto rounded-full"></div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-10 rounded-3xl shadow-lg border border-gray-100 hover:border-[#F4C430]/30 hover:shadow-2xl transition-all duration-500 group"
            >
              <div className="mb-8 relative">
                <div className="absolute -inset-2 bg-[#F4C430]/20 rounded-2xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-black text-white p-4 rounded-2xl w-fit group-hover:bg-[#F4C430] group-hover:text-black transition-colors duration-300">
                  {React.cloneElement(feature.icon as React.ReactElement, { className: "group-hover:text-white" })}
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-4 text-[#1A1A1A] group-hover:text-[#F4C430] transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-gray-500 leading-relaxed text-sm font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
