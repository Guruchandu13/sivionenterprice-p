import React from 'react';
import { motion } from 'framer-motion';
import { 
  Atom, 
  Wind, 
  Terminal, 
  Coffee, 
  Leaf, 
  Cloud, 
  Boxes, 
  Database, 
  Zap, 
  Share2, 
  Box,
  Framer
} from 'lucide-react';

const techItems = [
  { name: "React", icon: Atom, hoverColor: "group-hover:text-blue-400" },
  { name: "Framer Motion", icon: Framer, hoverColor: "group-hover:text-pink-500" },
  { name: "Tailwind CSS", icon: Wind, hoverColor: "group-hover:text-cyan-400" },
  { name: "Node.js", icon: Terminal, hoverColor: "group-hover:text-emerald-500" },
  { name: "Java", icon: Coffee, hoverColor: "group-hover:text-orange-500" },
  { name: "Spring Boot", icon: Leaf, hoverColor: "group-hover:text-green-500" },
  { name: "AWS", icon: Cloud, hoverColor: "group-hover:text-amber-500" },
  { name: "Docker", icon: Box, hoverColor: "group-hover:text-blue-500" },
  { name: "Kubernetes", icon: Boxes, hoverColor: "group-hover:text-blue-600" },
  { name: "PostgreSQL", icon: Database, hoverColor: "group-hover:text-indigo-400" },
  { name: "MongoDB", icon: Zap, hoverColor: "group-hover:text-green-400" },
  { name: "GraphQL", icon: Share2, hoverColor: "group-hover:text-pink-400" }
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
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
        >
          {/* We duplicate the array to allow infinite seamless scroll */}
          {[...techItems, ...techItems].map((tech, idx) => (
            <motion.div 
              key={idx} 
              whileHover={{ scale: 1.05, y: -5 }}
              className="inline-flex items-center gap-4 px-8 py-4 mx-4 glass rounded-2xl min-w-[220px] cursor-pointer group transition-all duration-300 hover:border-white/20 hover:bg-white/5"
            >
              <tech.icon className={`w-6 h-6 text-gray-400 transition-colors duration-300 ${tech.hoverColor} group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]`} />
              <span className="text-lg font-semibold text-gray-400 transition-colors duration-300 group-hover:text-white">{tech.name}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Technologies;
