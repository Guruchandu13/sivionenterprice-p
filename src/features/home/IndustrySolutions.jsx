import React from 'react';
import { motion } from 'framer-motion';
import { Building2, HeartPulse, ShieldCheck, ShoppingCart, Cpu, Factory } from 'lucide-react';

const industries = [
  { name: "FinTech & Banking", icon: <ShieldCheck className="w-8 h-8 text-white" />, color: "bg-blue-500" },
  { name: "Healthcare & Biotech", icon: <HeartPulse className="w-8 h-8 text-white" />, color: "bg-green-500" },
  { name: "E-Commerce & Retail", icon: <ShoppingCart className="w-8 h-8 text-white" />, color: "bg-purple-500" },
  { name: "Manufacturing", icon: <Factory className="w-8 h-8 text-white" />, color: "bg-orange-500" },
  { name: "Public Sector", icon: <Building2 className="w-8 h-8 text-white" />, color: "bg-cyan-500" },
  { name: "AI & DeepTech", icon: <Cpu className="w-8 h-8 text-white" />, color: "bg-indigo-500" }
];

const IndustrySolutions = () => {
  return (
    <section className="py-16 md:py-24 relative z-10 bg-brand-dark border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 text-center">
        
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Solutions by <span className="text-gradient">Industry</span></h2>
          <p className="text-gray-400 text-lg">We understand that each sector has unique challenges. Our tailored solutions are engineered to meet strict compliance, security, and performance standards.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map((ind, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass p-6 rounded-2xl flex flex-col items-center justify-center gap-4 hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:-translate-y-2 transition-all cursor-pointer group"
            >
               <div className={`w-14 h-14 rounded-full ${ind.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  {ind.icon}
               </div>
               <h4 className="text-white font-medium text-sm text-center">{ind.name}</h4>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default IndustrySolutions;
