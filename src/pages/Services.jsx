import React from 'react';
import { motion } from 'framer-motion';
import ServicesOverview from '../features/home/ServicesOverview';

const Services = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Services</h1>
          <p className="text-xl text-gray-400">Comprehensive technology solutions for modern enterprises.</p>
        </motion.div>
      </div>
      
      {/* Reusing Home feature for base services mapping, it already looks premium! */}
      <ServicesOverview />
    </div>
  );
};

export default Services;
