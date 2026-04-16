import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Loader2 } from 'lucide-react';
import api from '../../lib/api';

const Footer = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!recaptchaToken) {
      alert("Please check the reCAPTCHA");
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await api.post('/subscribers', { email, recaptchaToken });
      if (response.data.success) {
        alert("Subscribed successfully!");
        setEmail('');
        setRecaptchaToken(null);
        recaptchaRef.current.reset();
      }
    } catch (error) {
      alert(error.response?.data?.message || "Subscription failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className="bg-[#040C09] pt-16 md:pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-3xl font-bold tracking-tighter text-white">
                Sivion<span className="text-brand-cyan">.</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium enterprise technology solutions. We specialize in robust, scalable architectures and premium web experiences for forward-thinking companies.
            </p>
            <div className="flex gap-4">
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-cyan hover:text-white transition-all"><Linkedin className="w-5 h-5" /></a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-cyan hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-cyan hover:text-white transition-all"><Github className="w-5 h-5" /></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li><Link to="/about" className="text-gray-400 hover:text-brand-cyan text-sm transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-gray-400 hover:text-brand-cyan text-sm transition-colors">Our Services</Link></li>
              <li><Link to="/case-studies" className="text-gray-400 hover:text-brand-cyan text-sm transition-colors">Case Studies</Link></li>
              <li><Link to="/careers" className="text-gray-400 hover:text-brand-cyan text-sm transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4 mb-8">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-brand-cyan shrink-0" />
                <span className="text-gray-400 text-sm">Level 25, Innovation Tower, Tech District, 10001</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-brand-cyan shrink-0" />
                <a href="tel:+1234567890" className="text-gray-400 hover:text-white text-sm transition-colors">+1 (234) 567-890</a>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-brand-cyan shrink-0" />
                <a href="mailto:hello@sivion.tech" className="text-gray-400 hover:text-white text-sm transition-colors">hello@sivion.tech</a>
              </li>
            </ul>
            
            {/* Google Maps Embed */}
            <div className="w-full h-32 rounded-xl overflow-hidden grayscale invert brightness-90 contrast-125 opacity-40 hover:opacity-80 transition-opacity border border-white/10">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.252808218!2d-74.11976373946229!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2sin!4v1689234521234!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter for the latest tech insights.</p>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-3 w-full lg:max-w-xs">
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                className="w-full bg-white/10 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-cyan transition-all outline-none"
              />
              <div className="py-2 transform scale-[0.8] origin-left">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  theme="dark"
                  onChange={(token) => setRecaptchaToken(token)}
                  onExpired={() => setRecaptchaToken(null)}
                />
              </div>
              <button disabled={isSubmitting} className="w-full bg-brand-cyan text-[#040C09] py-3 rounded-xl font-black text-sm hover:bg-white transition-all flex items-center justify-center shadow-[0_4px_20px_rgba(34,211,238,0.2)]">
                {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Subscribe Now"}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} Sivion EnterpriseTech Hub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
