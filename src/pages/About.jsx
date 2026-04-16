import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center py-20"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">About <span className="text-brand-cyan">Sivion</span></h1>
          <p className="text-xl text-gray-400 leading-relaxed bg-white/5 p-8 rounded-2xl glass mb-8">
            We are a premium enterprise technology hub focused on delivering scalable, secure, and hyper-premium software solutions. 
            Our team consists of elite architects and developers who bridge the gap between business objectives and technical reality.
          </p>
          <button className="bg-brand-cyan text-white px-8 py-4 rounded-full font-bold hover:bg-brand-dark transition-all shadow-[0_0_20px_rgba(0,212,255,0.2)]">
            Download Company Profile
          </button>
        </motion.div>
        
        <div className="py-12 border-t border-white/5">
           <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {["Excellence in Engineering", "Absolute Transparency", "Zero Technical Debt"].map((value, i) => (
                <div key={i} className="glass p-8 rounded-2xl text-center">
                  <h3 className="text-xl font-bold text-white mb-4">{value}</h3>
                  <p className="text-gray-400 text-sm">We uphold the highest standards in every single line of code and architectural decision we make.</p>
                </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default About;
