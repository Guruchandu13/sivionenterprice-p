import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Loader2 } from 'lucide-react';

const InquiryForm = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/thank-you');
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="flex group w-full relative">
      <input 
        type="email" 
        placeholder="Enter your email to request info" 
        required
        className="w-full bg-white/5 border border-white/10 rounded-l-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan transition-colors"
      />
      <button 
        type="submit" 
        disabled={isSubmitting}
        className="bg-brand-cyan text-white px-6 py-3 rounded-r-lg font-bold text-sm hover:bg-brand-dark transition-colors flex items-center gap-2"
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Submit Inquiry"}
      </button>
    </form>
  );
};

export default InquiryForm;
