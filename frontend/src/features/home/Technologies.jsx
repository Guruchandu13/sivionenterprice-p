import React from 'react';
import { motion } from 'framer-motion';

const techs = [
  "React", "Framer Motion", "Tailwind CSS", "Node.js", "Java", "Spring Boot", 
  "AWS", "Docker", "Kubernetes", "PostgreSQL", "MongoDB", "GraphQL"
];

const Technologies = () => {
  return (
    <section className="py-20 bg-brand-dark relative z-10 border-t border-white/5 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
         <h2 className="text-2xl md:text-3xl font-bold text-gray-400">Powered by Industry-Leading Technologies</h2>
      </div>

      <div className="relative flex w-full overflow-hidden">
        {/* Gradients to fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-brand-dark to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-brand-dark to-transparent z-10"></div>

        {/* Scrolling Track */}
        <motion.div 
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 30 }}
        >
          {/* We duplicate the array to allow infinite seamless scroll */}
          {[...techs, ...techs].map((tech, idx) => (
            <div 
              key={idx} 
              className="inline-flex items-center justify-center px-8 py-4 mx-4 glass rounded-full min-w-[200px]"
            >
              <span className="text-xl font-semibold text-gray-400">{tech}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
