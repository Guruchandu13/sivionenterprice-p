import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah Jenkins",
    role: "CTO, NexusTech",
    content: "Sivion didn't just build our platform; they re-engineered our entire technical strategy. Their expertise in modern cloud architectures dropping our server costs by 40%.",
    image: "https://i.pravatar.cc/150?u=1"
  },
  {
    name: "Michael Chang",
    role: "VP Engineering, HealthSync",
    content: "The level of engineering rigor Sivion brought to our Healthcare SaaS was unprecedented. From HIPAA compliance to micro-second latency, they delivered flawlessly.",
    image: "https://i.pravatar.cc/150?u=2"
  },
  {
    name: "Elena Rodriguez",
    role: "Founder, FinEdge",
    content: "Working with Sivion felt like having an elite internal engineering team. Their design is Apple-tier, and their code is bulletproof. Incredible partner.",
    image: "https://i.pravatar.cc/150?u=3"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 md:py-24 bg-[#040C09] relative z-10 overflow-hidden">
      {/* Decorative Blur */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Client <span className="text-gradient">Testimonials</span></h2>
          <p className="text-gray-400 text-lg">Don't just take our word for it. Hear from the technology leaders we partner with.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="glass p-8 rounded-2xl relative group"
            >
              <Quote className="absolute top-6 right-6 w-12 h-12 text-white/5 group-hover:text-brand-cyan/20 transition-colors" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-brand-cyan fill-brand-cyan" />
                ))}
              </div>
              
              <p className="text-gray-400 text-sm leading-relaxed mb-8 italic">"{test.content}"</p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img src={test.image} alt={test.name} className="w-12 h-12 rounded-full ring-2 ring-white/10" />
                <div>
                  <h4 className="text-white font-bold text-sm">{test.name}</h4>
                  <p className="text-gray-500 text-xs">{test.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
