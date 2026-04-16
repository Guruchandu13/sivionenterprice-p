import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import api from '../lib/api';

const Quote = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    serviceType: 'Web Development',
    budget: '$50k - $100k',
    projectDetails: '',
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    
    try {
      const response = await api.post('/quotes', {
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        serviceType: formData.serviceType,
        budget: formData.budget,
        projectDetails: formData.projectDetails,
        requestType: 'quote',
        recaptchaToken: recaptchaToken
      });
      
      if (response.data.success) {
        navigate('/thank-you');
      }
    } catch (err) {
      console.error("Quote submission error:", err);
      setError(err.response?.data?.message || 'Failed to submit quote request. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Request a <span className="text-brand-cyan">Quote</span></h1>
          <p className="text-gray-400">Provide details about your enterprise needs and we will prepare a technical proposal.</p>
        </div>

        <div className="bg-[#0F172A]/60 backdrop-blur-2xl p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
           <form onSubmit={handleSubmit} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm text-gray-400 mb-2">First Name</label>
                   <input 
                    name="firstName"
                    type="text" 
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none transition-all" 
                    required 
                  />
                </div>
                <div>
                   <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                   <input 
                    name="lastName"
                    type="text" 
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none transition-all" 
                    required 
                  />
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm text-gray-400 mb-2">Work Email</label>
                   <input 
                    name="email"
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none transition-all" 
                    required 
                  />
                </div>
                <div>
                   <label className="block text-sm text-gray-400 mb-2">Phone Number</label>
                   <input 
                    name="phone"
                    type="tel" 
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none transition-all" 
                  />
                </div>
             </div>
             
             <div>
                <label className="block text-sm text-gray-400 mb-2">Company Name</label>
                <input 
                  name="company"
                  type="text" 
                  value={formData.company}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none transition-all" 
                  required 
                />
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Service Type</label>
                  <select 
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full bg-[#111822] border border-white/10 rounded-xl p-4 text-white focus:border-brand-cyan outline-none appearance-none"
                  >
                    <option>Web Development</option>
                    <option>Mobile App Development</option>
                    <option>Cloud Infrastructure</option>
                    <option>AI & Machine Learning</option>
                    <option>Cybersecurity</option>
                    <option>Enterprise Software</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Project Budget</label>
                  <select 
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full bg-[#111822] border border-white/10 rounded-xl p-4 text-white focus:border-brand-cyan outline-none appearance-none"
                  >
                    <option>$10k - $50k</option>
                    <option>$50k - $100k</option>
                    <option>$100k - $500k</option>
                    <option>$500k+</option>
                  </select>
                </div>
             </div>

             <div>
                <label className="block text-sm text-gray-400 mb-2">Technical Requirements Overview</label>
                <textarea 
                  name="projectDetails"
                  rows="5" 
                  value={formData.projectDetails}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none resize-none transition-all" 
                  required
                ></textarea>
             </div>

             {error && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
             )}
             
             <div className="py-2">
                <ReCAPTCHA
                  ref={recaptchaRef}
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
                  theme="dark"
                  onChange={(token) => setRecaptchaToken(token)}
                  onExpired={() => setRecaptchaToken(null)}
                />
             </div>

             <button 
              type="submit" 
              disabled={isSubmitting} 
              className="w-full bg-brand-cyan text-[#040D09] font-black py-4 rounded-xl hover:bg-white transition-all shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:shadow-2xl flex justify-center items-center disabled:opacity-70 disabled:grayscale"
             >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-6 h-6 animate-spin" />
                    PREPARING PROPOSAL...
                  </span>
                ) : "Get Free Proposal"}
             </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Quote;
