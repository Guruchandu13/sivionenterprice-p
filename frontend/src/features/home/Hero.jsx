import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Terminal, Zap, Shield, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 100]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-start lg:items-center overflow-hidden bg-[#040D09] pt-32 pb-20 lg:pt-20">
      
      {/* --- CINEMATIC AMBIENCE --- */}
      <div className="absolute inset-0 z-0">
        {/* Atmospheric Mesh (Mixed Shades) */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(34,211,238,0.08)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,_rgba(59,130,246,0.08)_0%,_transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,_rgba(255,255,255,0.02)_0%,_transparent_40%)]"></div>
        
        {/* Kinetic Scanning Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#22D3EE05_1px,transparent_1px),linear-gradient(to_bottom,#22D3EE05_1px,transparent_1px)] bg-[size:60px_60px] opacity-60"></div>
        
        {/* High-Visibility Energy Orbs */}
        <motion.div 
          style={{ y: y1 }}
          className="absolute top-[5%] left-[10%] w-[50vw] h-[50vw] bg-cyan-400/10 rounded-full blur-[100px] mix-blend-screen animate-pulse"
        ></motion.div>
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[-15%] right-[5%] w-[60vw] h-[60vw] bg-blue-500/10 rounded-full blur-[140px] mix-blend-screen"
        ></motion.div>
      </div>

      {/* --- REAR TYPOGRAPHY (Depth) --- */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none z-0">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.03, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="text-[25vw] font-black text-white tracking-tighter"
        >
          SIVION
        </motion.h2>
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* LEFT CONTENT: KINETIC TYPOGRAPHY */}
          <div className="w-full lg:w-3/5 text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-brand-cyan/5 border border-brand-cyan/20 backdrop-blur-xl mb-8"
            >
              <Zap className="w-4 h-4 text-brand-cyan" />
              <span className="text-xs font-bold text-white uppercase tracking-[0.2em]">Next-Generation Architecture</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white"
            >
              Architecting <br />
              <span className="text-gradient">Potential.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 max-w-xl leading-relaxed font-light"
            >
              We don't just build software. We engineer high-velocity digital infrastructures for enterprises that define the future.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row items-center gap-6"
            >
              <Link to="/contact" className="w-full sm:w-auto px-10 py-5 bg-brand-cyan text-[#040D09] rounded-2xl font-black text-lg hover:bg-white transition-all shadow-[0_0_40px_rgba(163,230,53,0.3)] hover:shadow-2xl hover:-translate-y-1 flex items-center justify-center gap-3 group">
                Build With Us 
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link to="/services" className="w-full sm:w-auto px-10 py-5 bg-white/5 text-white rounded-2xl font-bold text-lg hover:bg-brand-cyan/10 transition-all border border-white/10 backdrop-blur-md flex items-center justify-center gap-3">
                 <Terminal className="w-6 h-6 text-brand-cyan" />
                 Explore Stack
              </Link>
            </motion.div>

            {/* TRUST INDICATORS */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="mt-16 flex items-center gap-8 grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
            >
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">500+</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Deployments</span>
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <div className="flex flex-col">
                <span className="text-3xl font-bold text-white">99.9%</span>
                <span className="text-[10px] uppercase tracking-widest text-gray-400">Uptime SLA</span>
              </div>
              <div className="h-10 w-px bg-white/10"></div>
              <Globe className="w-8 h-8 text-white" />
            </motion.div>
          </div>

          {/* RIGHT CONTENT: THE DIGITAL MONOLITH */}
          <div className="w-full lg:w-2/5 flex justify-center items-center order-1 lg:order-2">
            <motion.div 
              style={{ rotate }}
              className="relative w-64 h-64 md:w-96 md:h-96"
            >
              {/* Central Glowing Core */}
              <div className="absolute inset-0 bg-brand-cyan/20 rounded-full blur-[80px] animate-pulse"></div>
              
              {/* The Monolith SVG */}
              <motion.svg 
                viewBox="0 0 200 200" 
                className="w-full h-full drop-shadow-[0_0_50px_rgba(34,211,238,0.3)]"
                initial={{ rotateY: 0 }}
                animate={{ rotateY: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <defs>
                  <linearGradient id="monolithGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#22D3EE" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.2" />
                  </linearGradient>
                </defs>
                {/* Dynamic Floating Geometry */}
                <motion.path 
                  d="M100 20 L180 60 L180 140 L100 180 L20 140 L20 60 Z" 
                  fill="none" 
                  stroke="url(#monolithGrad)" 
                  strokeWidth="2"
                  initial={{ strokeDasharray: "400", strokeDashoffset: "400" }}
                  animate={{ strokeDashoffset: 0 }}
                  transition={{ duration: 2, delay: 0.5 }}
                />
                <motion.path 
                  d="M100 20 L100 180 M20 60 L180 60 M20 140 L180 140" 
                  stroke="rgba(34, 211, 238, 0.2)" 
                  strokeWidth="1"
                />
                {/* Concentric rings */}
                <circle cx="100" cy="100" r="40" stroke="#22D3EE" strokeWidth="0.5" fill="none" opacity="0.3" />
                <circle cx="100" cy="100" r="60" stroke="#22D3EE" strokeWidth="0.5" fill="none" opacity="0.2" />
              </motion.svg>

              {/* Data Floating Elements */}
              <motion.div 
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-10 -right-10 glass px-4 py-2 rounded-xl border border-brand-cyan/30 flex items-center gap-2"
              >
                <div className="w-2 h-2 rounded-full bg-brand-cyan animate-ping"></div>
                <span className="text-[10px] font-bold text-brand-cyan tracking-widest uppercase">Encryption Active</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-10 -left-10 glass px-4 py-2 rounded-xl border border-brand-cyan/30 flex items-center gap-2"
              >
                <Shield className="w-4 h-4 text-brand-cyan" />
                <span className="text-[10px] font-bold text-white tracking-widest uppercase">Protocol Secure</span>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;
