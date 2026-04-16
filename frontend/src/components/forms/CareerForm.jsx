import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Loader2 } from 'lucide-react';

const CareerForm = ({ role }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', linkedin: '', file: null });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API upload
    setTimeout(() => {
      setIsSubmitting(false);
      navigate('/thank-you');
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
           <label className="block text-sm text-gray-400 mb-2">Full Name</label>
           <input type="text" name="name" onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none" placeholder="Jane Doe" />
        </div>
        <div>
           <label className="block text-sm text-gray-400 mb-2">Email Address</label>
           <input type="email" name="email" onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none" placeholder="jane@example.com" />
        </div>
      </div>
      
      <div>
         <label className="block text-sm text-gray-400 mb-2">LinkedIn Profile (Optional)</label>
         <input type="url" name="linkedin" onChange={handleChange} className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none" placeholder="https://linkedin.com/in/janedoe" />
      </div>

      <div>
         <label className="block text-sm text-gray-400 mb-2">Upload Resume (PDF/DOCX)</label>
         <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-brand-cyan transition-colors bg-white/5 cursor-pointer relative">
            <input type="file" name="resume" required accept=".pdf,.doc,.docx" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
            <UploadCloud className="w-8 h-8 text-brand-cyan mx-auto mb-2" />
            <span className="text-gray-400 text-sm">
              {formData.file ? formData.file.name : "Drag & drop or browse"}
            </span>
         </div>
      </div>

      <button type="submit" disabled={isSubmitting} className="w-full bg-brand-cyan text-white font-bold py-4 rounded-xl hover:bg-brand-dark transition-colors flex justify-center items-center gap-2">
         {isSubmitting ? <><Loader2 className="animate-spin w-5 h-5"/> Uploading...</> : 'Apply Now'}
      </button>
    </form>
  );
};

export default CareerForm;
