import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const Quote = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/thank-you');
    }, 1500);
  };

  return (
    <div className="pt-24 min-h-screen bg-[#040C09]">
      <div className="container mx-auto px-4 md:px-6 py-16 md:py-20 max-w-3xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Request a <span className="text-brand-cyan">Quote</span></h1>
          <p className="text-gray-400">Provide details about your enterprise needs and we will prepare a technical proposal.</p>
        </div>

        <div className="glass p-8 md:p-12 rounded-3xl">
           <form onSubmit={handleSubmit} className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                   <label className="block text-sm text-gray-400 mb-2">First Name</label>
                   <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none" required />
                </div>
                <div>
                   <label className="block text-sm text-gray-400 mb-2">Last Name</label>
                   <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none" required />
                </div>
             </div>
             
             <div>
                <label className="block text-sm text-gray-400 mb-2">Company Name</label>
                <input type="text" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none" required />
             </div>

             <div>
                <label className="block text-sm text-gray-400 mb-2">Project Budget</label>
                <select className="w-full bg-[#111822] border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none appearance-none">
                   <option>$50k - $100k</option>
                   <option>$100k - $500k</option>
                   <option>$500k+</option>
                </select>
             </div>

             <div>
                <label className="block text-sm text-gray-400 mb-2">Technical Requirements Overview</label>
                <textarea rows="5" className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none resize-none" required></textarea>
             </div>

             <button type="submit" disabled={isSubmitting} className="w-full bg-brand-cyan text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition-colors flex justify-center items-center">
                {isSubmitting ? <Loader2 className="animate-spin w-6 h-6" /> : "Get Free Proposal"}
             </button>
           </form>
        </div>
      </div>
    </div>
  );
};

export default Quote;
