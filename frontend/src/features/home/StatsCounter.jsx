import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "150+", label: "Enterprise Customers" },
  { value: "$2B+", label: "Client Revenue Generated" },
  { value: "99.99%", label: "System Uptime Average" },
  { value: "50+", label: "Awards & Recognitions" }
];

const StatsCounter = () => {
  return (
    <section className="py-20 relative z-10 border-y border-white/10 overflow-hidden">
      {/* Background Graphic */}
      <div className="absolute inset-0 bg-brand-cyan/5 -z-10"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center px-4"
            >
              <h3 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 mb-2">
                {stat.value}
              </h3>
              <p className="text-brand-cyan font-medium text-sm md:text-base uppercase tracking-wider">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
