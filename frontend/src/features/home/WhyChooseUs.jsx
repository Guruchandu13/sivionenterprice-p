import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Trophy, Clock, Users } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-[#061224] relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left: Content */}
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Why Elite Companies <br className="hidden md:block"/> <span className="text-gradient">Trust Sivion.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We don't just write code; we build resilient business engines. Our commitment to technical excellence and premium design separates us from the rest.
            </p>
            
            <div className="space-y-6">
              {[
                { title: "Top 1% Engineering Talent", desc: "Our team consists of battle-tested senior engineers and architects." },
                { title: "Enterprise-Grade Security", desc: "Security is built into our CI/CD pipelines from day one, not as an afterthought." },
                { title: "Zero Technical Debt Focus", desc: "We adhere strictly to clean code principles and comprehensive testing." }
              ].map((item, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <CheckCircle2 className="w-6 h-6 text-brand-cyan shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-bold text-lg">{item.title}</h4>
                    <p className="text-gray-400 text-sm mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Stats/Grid */}
          <div className="lg:w-1/2 grid grid-cols-2 gap-6 w-full">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
              className="glass p-8 rounded-2xl text-center"
            >
              <Trophy className="w-10 h-10 text-brand-cyan mx-auto mb-4 opacity-80" />
              <h3 className="text-5xl font-black text-white mb-2">99%</h3>
              <p className="text-gray-400 font-medium text-sm">Project Success Rate</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              className="glass p-8 rounded-2xl text-center"
            >
              <Users className="w-10 h-10 text-brand-cyan mx-auto mb-4 opacity-80" />
              <h3 className="text-5xl font-black text-white mb-2">150+</h3>
              <p className="text-gray-400 font-medium text-sm">Enterprise Clients</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}
              className="glass p-8 rounded-2xl text-center"
            >
              <Clock className="w-10 h-10 text-brand-cyan mx-auto mb-4 opacity-80" />
              <h3 className="text-5xl font-black text-white mb-2">24/7</h3>
              <p className="text-gray-400 font-medium text-sm">Support & Monitoring</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.3 }}
              className="glass-accent p-8 rounded-2xl text-center flex flex-col justify-center items-center"
            >
               <p className="text-white text-lg font-bold leading-tight">Ready to scale faster?</p>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
