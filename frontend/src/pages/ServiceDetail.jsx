import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import ConsultationForm from '../components/forms/ConsultationForm';

const ServiceDetail = () => {
  const { id } = useParams();
  
  // Placeholder dynamic content based on URL param
  const serviceName = id ? id.replace(/-/g, ' ').toUpperCase() : "ENTERPRISE SOLUTION";

  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      {/* Hero Header */}
      <div className="bg-[#040C09] py-16 md:py-20 border-b border-white/5">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Link to="/services" className="text-brand-cyan text-sm font-medium hover:text-white transition-colors mb-4 inline-block">&larr; Back to Services</Link>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">{serviceName}</h1>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              We provide cutting-edge {serviceName.toLowerCase()} tailored to scale seamlessly and meet rigorous industry standards.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-20">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-2/3 space-y-12">
            <section>
              <h2 className="text-3xl font-bold mb-6">Overview</h2>
              <p className="text-gray-400 leading-relaxed text-lg">
                Our {serviceName.toLowerCase()} focuses on architecting resilient, high-performance systems. We leverage modern methodologies to ensure rapid deployment and robust security.
              </p>
            </section>
            
            <section>
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {["High Availability", "End-to-End Encryption", "Seamless Integration", "24/7 Monitoring", "Automated Backups", "Custom Analytics"].map((feat, i) => (
                   <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
                      <CheckCircle2 className="text-brand-cyan w-5 h-5 shrink-0" />
                      <span className="text-gray-400 font-medium">{feat}</span>
                   </div>
                ))}
              </div>
            </section>
          </div>
          
          <div className="lg:w-1/3">
             <div className="glass p-8 rounded-2xl sticky top-32">
               <h3 className="text-xl font-bold mb-6">Book Consultation</h3>
               <ConsultationForm serviceName={serviceName} />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
