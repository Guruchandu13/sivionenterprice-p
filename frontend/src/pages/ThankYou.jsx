import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

const ThankYou = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-dark flex flex-col items-center justify-center border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto glass p-10 md:p-16 rounded-3xl text-center relative overflow-hidden"
        >
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
          
          <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6 relative z-10" />
          
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">
            Request <span className="text-gradient">Received</span>
          </h1>
          
          <p className="text-lg text-gray-400 mb-10 leading-relaxed relative z-10">
            Thank you for reaching out to Sivion EnterpriseTech Hub. One of our technical architects has received your inquiry and will contact you within 24 hours to discuss your project.
          </p>
          
          <div className="relative z-10">
             <Link 
               to="/"
               className="inline-flex items-center justify-center bg-brand-cyan text-white font-bold px-8 py-4 rounded-full hover:bg-brand-dark transition-colors shadow-[0_0_20px_rgba(0,212,255,0.2)]"
             >
               Return to Homepage
             </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ThankYou;
