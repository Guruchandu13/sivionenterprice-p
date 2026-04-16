import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "What industries do you specialize in?",
    answer: "We have deep expertise across FinTech, Healthcare, E-Commerce, Logistics, and SaaS. However, our technical architecture skills are industry-agnostic, allowing us to build robust platforms for any complex domain."
  },
  {
    question: "Do you offer full-cycle development?",
    answer: "Yes. We handle everything from initial product discovery, UI/UX design, architecture, frontend/backend engineering, to DevOps, deployment, and ongoing maintenance."
  },
  {
    question: "What is your typical project timeline?",
    answer: "Timelines vary based on complexity. A standard MVP typically takes 3-4 months, while large-scale enterprise re-architectures can span 6-12 months. We use agile sprints to deliver usable software every 2 weeks."
  },
  {
    question: "How do you ensure security and compliance?",
    answer: "Security is baked into our SDLC. We employ continuous vulnerability scanning, code reviews, penetration testing, and ensure strict adherence to SOC2, GDPR, and HIPAA compliance where necessary."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-brand-dark relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-400">Everything you need to know about working with Sivion.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="glass border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/20"
            >
               <button 
                className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                onClick={() => toggleFaq(index)}
               >
                 <span className="text-lg font-semibold text-white">{faq.question}</span>
                 <ChevronDown className={`w-5 h-5 text-brand-cyan transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
               </button>
               
               <AnimatePresence>
                 {openIndex === index && (
                   <motion.div
                     initial={{ height: 0, opacity: 0 }}
                     animate={{ height: 'auto', opacity: 1 }}
                     exit={{ height: 0, opacity: 0 }}
                     transition={{ duration: 0.3 }}
                   >
                     <div className="px-6 pb-5 text-gray-400 leading-relaxed">
                       {faq.answer}
                     </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
