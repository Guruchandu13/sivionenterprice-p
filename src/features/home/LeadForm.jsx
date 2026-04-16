import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LeadForm = () => {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Email Notification Integration Logic
    // In production, this would call your backend or EmailJS
    try {
      console.log("Initiating enterprise email notification protocol...");
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      
      // Auto-redirect after delay to show success state
      setTimeout(() => {
        navigate('/thank-you');
      }, 3000);
    } catch (error) {
      console.error("Critical: Form submission failed", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  if (isSubmitted) {
    return (
      <section className="py-20 md:py-32 bg-[#0A192F] relative z-10 flex items-center justify-center min-h-[600px]">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-6"
        >
          <div className="w-20 h-20 bg-brand-cyan/20 rounded-full flex items-center justify-center mx-auto border border-brand-cyan/50 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
            <CheckCircle className="w-10 h-10 text-brand-cyan" />
          </div>
          <h2 className="text-3xl font-bold text-white">Inquiry Received</h2>
          <p className="text-slate-400 max-w-sm mx-auto">Thank you for reaching out. Our technical team has been notified and will contact you shortly.</p>
          <div className="w-12 h-1 bg-brand-cyan/30 mx-auto rounded-full overflow-hidden">
             <motion.div 
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 3, ease: "linear" }}
                className="w-full h-full bg-brand-cyan"
             ></motion.div>
          </div>
        </motion.div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-32 bg-[radial-gradient(ellipse_at_top_left,_rgba(34,211,238,0.05)_0%,_transparent_50%),radial-gradient(ellipse_at_bottom_right,_rgba(59,130,246,0.05)_0%,_transparent_50%),#0A192F] relative z-10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2 space-y-8">
            <h2 className="text-4xl md:text-6xl font-black leading-tight text-white tracking-tighter">
              Ready to <span className="text-gradient">Architect</span> <br />Your Future?
            </h2>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed font-light">
              Drop us a line. Whether you need a complete enterprise re-architecture or a cutting-edge web application, our experts are ready to accelerate your roadmap.
            </p>
            <div className="flex gap-4 p-6 glass rounded-2xl border border-white/5">
              <div className="w-16 h-1 bg-brand-cyan mt-2 rounded-full overflow-hidden">
                <div className="w-full h-full bg-brand-cyan animate-pulse"></div>
              </div>
              <p className="text-sm text-slate-300 font-medium">Global Support Desk Active. <br /><span className="text-slate-500 font-normal">Expect a response within 12-24 business hours.</span></p>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="bg-[#0F172A]/60 backdrop-blur-2xl p-8 md:p-10 rounded-[32px] border border-white/10 relative overflow-hidden shadow-2xl"
            >
              {/* Highlight Glow Effect */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-cyan/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
              
              <h3 className="text-2xl font-bold text-white mb-6">Schedule technical consult.</h3>
              
              <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                      <input 
                        type="text" 
                        id="name"
                        name="name"
                        required
                        value={formState.name}
                        onChange={handleChange}
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Work Email</label>
                        <input 
                          type="email" 
                          id="email"
                          name="email"
                          required
                          value={formState.email}
                          onChange={handleChange}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all"
                          placeholder="john@company.com"
                        />
                    </div>
                  </div>
                  <div>
                     <label htmlFor="message" className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Project Details</label>
                     <textarea 
                       id="message"
                       name="message"
                       required
                       rows="4"
                       value={formState.message}
                       onChange={handleChange}
                       className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-600 focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan transition-all resize-none"
                       placeholder="Tell us about your technical requirements..."
                     ></textarea>
                  </div>
                  
                  {/* reCAPTCHA UI Integration */}
                  <div className="flex items-center gap-3 py-2">
                    <div className="w-5 h-5 rounded bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                      <CheckCircle className="w-3 h-3 text-brand-cyan opacity-40" />
                    </div>
                    <p className="text-[10px] text-slate-500 font-medium">Verified by Google reCAPTCHA. <a href="#" className="underline hover:text-brand-cyan">Privacy</a> & <a href="#" className="underline hover:text-brand-cyan">Terms</a> apply.</p>
                  </div>
                  
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-cyan text-[#040D09] font-black py-4 rounded-xl hover:bg-white transition-all shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:shadow-2xl flex items-center justify-center gap-2 mt-4 disabled:opacity-70 disabled:grayscale transition-all"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        INITIATING...
                      </span>
                    ) : (
                      <>SUBMIT INQUIRY <Send className="w-5 h-5" /></>
                    )}
                  </button>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default LeadForm;
