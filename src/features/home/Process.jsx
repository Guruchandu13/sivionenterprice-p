import React from 'react';
import { motion } from 'framer-motion';
import { Search, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: <Search className="w-6 h-6 text-white" />,
    title: "1. Discovery & Strategy",
    description: "Deep dive into your business objectives, technical constraints, and market landscape."
  },
  {
    icon: <PenTool className="w-6 h-6 text-white" />,
    title: "2. Architecture & Design",
    description: "Crafting scalable system architectures and premium, intuitive user interfaces."
  },
  {
    icon: <Code2 className="w-6 h-6 text-white" />,
    title: "3. Engineering",
    description: "Agile development sprints with robust CI/CD, testing, and clean code practices."
  },
  {
    icon: <Rocket className="w-6 h-6 text-white" />,
    title: "4. Deployment & Scale",
    description: "Seamless rollout, performance monitoring, and continuous scaling support."
  }
];

const Process = () => {
  return (
    <section className="py-16 md:py-24 bg-[#040C09] relative z-10 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How We Work</h2>
          <p className="text-gray-400 text-lg">A battle-tested methodology designed to mitigate risk and guarantee delivery.</p>
        </div>

        <div className="relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-cyan/20 to-transparent -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 relative z-10">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                className="relative"
              >
                <div className="glass p-8 rounded-2xl h-full flex flex-col items-center text-center hover:shadow-[0_0_20px_rgba(0,212,255,0.1)] transition-shadow">
                   <div className="w-12 h-12 rounded-full bg-brand-cyan flex items-center justify-center mb-6 shadow-lg shadow-brand-cyan/30 absolute -top-6">
                     {step.icon}
                   </div>
                   <h3 className="text-xl font-bold text-white mb-4 mt-4">{step.title}</h3>
                   <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Process;
