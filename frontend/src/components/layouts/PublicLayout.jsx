import React from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';

const PublicLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-brand-dark text-white">
      <Navbar />
      <main className="flex-grow min-h-[70vh]">
        <Outlet />
      </main>
      <Footer />

      {/* Sticky Floating CTA Buttons */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4">
        {/* Call Now Button */}
        <motion.a
          href="tel:+1234567890"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-brand-cyan shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all group relative"
          aria-label="Call Now"
          title="Call Now"
        >
          <div className="absolute inset-0 rounded-full bg-brand-cyan animate-ping opacity-20"></div>
          <Phone className="w-6 h-6 text-[#020617] relative z-10" />
        </motion.a>
        
        {/* WhatsApp Button */}
        <motion.a
          href="https://wa.me/1234567890"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-[0_0_30px_rgba(37,211,102,0.3)] transition-all group relative"
          aria-label="Contact on WhatsApp"
          title="WhatsApp Us"
        >
           <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></div>
           <svg className="h-8 w-8 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
             <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.992-.001-3.951-.499-5.688-1.447l-6.305 1.651zm6.59-4.814c1.57.93 3.353 1.42 5.175 1.421h.005c5.334 0 9.678-4.343 9.68-9.68 0-2.586-1.008-5.019-2.841-6.852-1.832-1.833-4.265-2.842-6.853-2.842-5.334 0-9.677 4.343-9.68 9.68-.001 1.84.482 3.633 1.398 5.217l-.916 3.344 3.431-.898zm11.233-6.273c-.3-.149-1.772-.875-2.046-.975-.274-.1-.474-.15-.674.15s-.774.975-.949 1.175-.35.225-.65.075c-.3-.15-1.263-.465-2.403-1.485-.888-.793-1.484-1.773-1.659-2.073-.175-.3-.018-.463.131-.61.135-.133.3-.35.45-.525.15-.175.2-.3.3-.5s.05-.375-.025-.525-.674-1.625-.924-2.225c-.244-.582-.493-.503-.674-.512-.174-.008-.375-.01-.576-.01s-.525.075-.8.375c-.275.3-.1.15-1.05 1.1s-1.475 2.25-1.475 4.534c0 2.283 1.65 4.5 1.875 4.8.225.3 3.25 4.962 7.872 6.953 1.1.473 1.96.756 2.628.97 1.104.35 2.109.3 2.903.181.884-.131 2.723-1.112 3.102-2.137.379-1.025.379-1.9 0-2.137-.113-.238-.413-.388-.713-.538z" />
           </svg>
        </motion.a>
      </div>
    </div>
  );
};

export default PublicLayout;
