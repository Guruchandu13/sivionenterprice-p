import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CTABanner = () => {
  return (
    <section className="py-24 relative z-10 mx-4 md:mx-6 my-10 overflow-hidden">
      {/* Background with glassmorphism */}
      <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         viewport={{ once: true, margin: "-100px" }}
         className="container mx-auto max-w-5xl bg-gradient-to-br from-brand-cyan/20 via-brand-dark to-brand-dark rounded-[2.5rem] p-12 md:p-20 border border-brand-cyan/20 relative overflow-hidden text-center shadow-[0_0_50px_rgba(0,212,255,0.1)]"
      >
        {/* Animated Glow Elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/30 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight relative z-10">
          Transform Your Tech Strategy <span className="text-gradient">Today.</span>
        </h2>
        
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed relative z-10">
          Stop delaying your digital transformation. Partner with the elite engineering team that delivers speed, scale, and uncompromising quality.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
          <Link
            to="/quote"
            className="w-full sm:w-auto px-8 py-4 bg-brand-dark text-white rounded-full font-bold text-lg hover:bg-gray-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] flex items-center justify-center gap-2 group"
          >
            Get a Technical Proposal <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all flex items-center justify-center"
          >
            Contact Us
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default CTABanner;
