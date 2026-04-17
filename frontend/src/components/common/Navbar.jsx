import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { cn } from '../../lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled ? 'bg-brand-dark/95 backdrop-blur-md py-4 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'
      )}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 relative z-50">
            <span className="text-2xl font-bold tracking-tighter text-white">
              Sivion<span className="text-brand-cyan">.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link to="/" className="text-sm font-medium text-white hover:text-brand-cyan transition-colors">
              Home
            </Link>
            <div className="group relative">
              <button className="flex items-center gap-1 text-sm font-medium text-white hover:text-brand-cyan transition-colors">
                Services <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />
              </button>
              {/* Mega Menu Dropdown */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[600px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-[60]">
                <div className="bg-[#0A192F]/95 backdrop-blur-2xl rounded-2xl p-8 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] grid grid-cols-2 gap-8 mt-2 border border-white/10 relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-brand-cyan to-transparent"></div>
                  <div>
                    <h3 className="text-brand-cyan text-xs font-bold uppercase tracking-wider mb-3">Enterprise Solutions</h3>
                    <ul className="space-y-1">
                      <li><Link to="/services" className="block text-sm text-slate-400 hover:text-brand-cyan hover:bg-white/5 rounded-lg p-2.5 transition-all">Java Full-Stack Development</Link></li>
                      <li><Link to="/services" className="block text-sm text-slate-400 hover:text-brand-cyan hover:bg-white/5 rounded-lg p-2.5 transition-all">Cloud Architecture</Link></li>
                      <li><Link to="/services" className="block text-sm text-slate-400 hover:text-brand-cyan hover:bg-white/5 rounded-lg p-2.5 transition-all">Legacy Modernization</Link></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-brand-cyan text-xs font-bold uppercase tracking-wider mb-4 border-l-2 border-brand-cyan pl-3">Web & App</h3>
                    <ul className="space-y-1">
                       <li><Link to="/services" className="block text-sm text-slate-400 hover:text-brand-cyan hover:bg-white/5 rounded-lg p-2.5 transition-all">Custom Web Apps</Link></li>
                       <li><Link to="/services" className="block text-sm text-slate-400 hover:text-brand-cyan hover:bg-white/5 rounded-lg p-2.5 transition-all">E-Commerce Solutions</Link></li>
                       <li><Link to="/services" className="block text-sm text-slate-400 hover:text-brand-cyan hover:bg-white/5 rounded-lg p-2.5 transition-all">UI/UX Design</Link></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/about" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              About Us
            </Link>
            <Link to="/case-studies" className="text-sm font-medium text-white/90 hover:text-white transition-colors">
              Case Studies
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
             <Link to="/contact" className="text-sm font-medium text-white hover:text-brand-cyan transition-colors">
              Talk to Our Experts
             </Link>
            <Link
              to="/quote"
              className="bg-brand-cyan text-white px-6 py-2.5 rounded-full font-semibold text-sm hover:bg-brand-dark transition-colors shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
            >
              Request a Quote
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden relative z-50 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 w-full h-screen bg-brand-dark/95 backdrop-blur-xl pt-24 px-6 lg:hidden"
          >
            <nav className="flex flex-col gap-6 text-center">
              <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white hover:text-brand-cyan">Home</Link>
              <Link to="/services" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white hover:text-brand-cyan">Services</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white hover:text-brand-cyan">About Us</Link>
              <Link to="/case-studies" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white hover:text-brand-cyan">Case Studies</Link>
              <div className="pt-8 flex flex-col gap-4">
                 <Link
                  to="/quote"
                  onClick={() => setMobileMenuOpen(false)}
                  className="bg-brand-cyan text-white py-4 rounded-full font-semibold text-lg"
                >
                  Request a Quote
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
