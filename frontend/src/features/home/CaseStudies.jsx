import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const caseStudies = [
  {
    title: "Global FinTech Platform Re-architecture",
    client: "Nexus Banking Corp",
    metrics: ["400% Faster Query Times", "Zero Downtime Deployments"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  },
  {
    title: "AI-Powered Healthcare Diagnostics SaaS",
    client: "MediGen Solutions",
    metrics: ["HIPAA Compliant", "Processed 1M+ Records Daily"],
    image: "https://images.unsplash.com/photo-1576091160550-2173ff9e5eb2?auto=format&fit=crop&q=80&w=800",
  }
];

const CaseStudies = () => {
  return (
    <section className="py-24 bg-brand-dark relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured <span className="text-brand-cyan">Case Studies</span></h2>
            <p className="text-gray-400 text-lg">See how we've helped industry leaders scale their operations and dominate their markets.</p>
          </div>
          <Link to="/case-studies" className="shrink-0 flex items-center gap-2 text-white hover:text-brand-cyan font-medium transition-colors border border-white/20 px-6 py-3 rounded-full hover:border-brand-cyan">
            View Case Studies <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.2 }}
              className="group relative overflow-hidden rounded-2xl glass cursor-pointer"
            >
              <div className="aspect-[16/9] w-full overflow-hidden">
                <img 
                  src={study.image} 
                  alt={study.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/50 to-transparent pointer-events-none"></div>
              
              <div className="absolute bottom-0 left-0 w-full p-8">
                 <p className="text-brand-cyan font-semibold text-sm mb-2">{study.client}</p>
                 <h3 className="text-2xl font-bold text-white mb-4 l">{study.title}</h3>
                 <div className="flex flex-wrap gap-3">
                   {study.metrics.map((metric, mIdx) => (
                     <span key={mIdx} className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium text-gray-400">
                       {metric}
                     </span>
                   ))}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;
