import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Loader2 } from 'lucide-react';

const ConsultationForm = ({ serviceName }) => {
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
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
         <label className="block text-sm text-gray-400 mb-1">Name</label>
         <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none" />
      </div>
      <div>
         <label className="block text-sm text-gray-400 mb-1">Company</label>
         <input type="text" required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none" />
      </div>
      <div>
         <label className="block text-sm text-gray-400 mb-1">Preferred Date</label>
         <div className="relative">
           <input type="date" required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none appearance-none" style={{ colorScheme: 'dark' }} />
           <Calendar className="absolute right-3 top-3.5 w-5 h-5 text-gray-400 pointer-events-none" />
         </div>
      </div>
      
      <button type="submit" disabled={isSubmitting} className="w-full bg-brand-cyan text-white font-bold py-3 mt-4 rounded-xl hover:bg-brand-dark transition-colors flex justify-center items-center">
         {isSubmitting ? <Loader2 className="animate-spin w-5 h-5" /> : 'Book Consultation'}
      </button>
    </form>
  );
};

export default ConsultationForm;
