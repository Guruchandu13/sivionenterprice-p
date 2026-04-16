import React from 'react';
import { motion } from 'framer-motion';

const CompanyIntroduction = () => {
  return (
    <section className="py-16 md:py-24 bg-[#040C09] relative z-10 border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Empowering the Enterprise with <span className="text-brand-cyan">Precision Engineering.</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-brand-cyan to-transparent mb-8"></div>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl">
              Sivion EnterpriseTech Hub is a premier technology partner dedicated to building the systems entirely that drive the next generation of business. 
            </p>
            <p className="text-lg text-gray-400 mt-6 leading-relaxed max-w-2xl">
              From robust Java backends to immersive UI/UX capabilities, we exist to close the gap between your technical ambition and operational execution. We don't just write code; we design architectures that scale, secure, and dominate.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="lg:w-1/2 w-full relative"
          >
             <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden glass border border-white/10 relative group">
                <img 
                  src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=1000" 
                  alt="Sivion Team Architecture Planning" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-white/40 group-hover:bg-white/20 transition-all duration-700"></div>
                <div className="absolute bottom-6 left-6 right-6 glass p-6 rounded-2xl border border-white/10">
                   <p className="text-brand-cyan font-bold italic text-lg mb-1">"Excellence isn't an act, it's a habit."</p>
                   <p className="text-gray-400 text-sm">— Sivion Core Philosophy</p>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default CompanyIntroduction;
