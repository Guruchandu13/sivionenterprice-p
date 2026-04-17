import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useNavigate } from 'react-router-dom';
import { UploadCloud, Loader2 } from 'lucide-react';
import api from '../../lib/api';

const CareerForm = ({ jobId }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    phone: '', 
    experience: '', 
    skills: '', 
    resume: null 
  });
  const [recaptchaToken, setRecaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, resume: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!jobId) {
      setError('Please select a position to apply for.');
      return;
    }
    
    setIsSubmitting(true);
    setError('');

    const data = new FormData();
    data.append('jobId', jobId);
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phone', formData.phone);
    data.append('experience', formData.experience);
    data.append('skills', formData.skills);
    if (formData.resume) {
      data.append('resume', formData.resume);
    }
    data.append('recaptchaToken', recaptchaToken || '');

    try {
      const response = await api.post('/applications', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        navigate('/thank-you');
      }
    } catch (err) {
      console.error("Application submission error:", err);
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
           <label className="block text-sm text-gray-400 mb-2 font-medium">Full Name</label>
           <input 
            type="text" 
            name="fullName" 
            value={formData.fullName}
            onChange={handleChange} 
            required 
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none transition-all" 
            placeholder="John Doe" 
          />
        </div>
        <div>
           <label className="block text-sm text-gray-400 mb-2 font-medium">Work Email</label>
           <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange} 
            required 
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none transition-all" 
            placeholder="john@example.com" 
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
           <label className="block text-sm text-gray-400 mb-2 font-medium">Phone Number</label>
           <input 
            type="tel" 
            name="phone" 
            value={formData.phone}
            onChange={handleChange} 
            required 
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none transition-all" 
            placeholder="+1 234 567 890" 
          />
        </div>
        <div>
           <label className="block text-sm text-gray-400 mb-2 font-medium">Experience (Years)</label>
           <input 
            type="text" 
            name="experience" 
            value={formData.experience}
            onChange={handleChange} 
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none transition-all" 
            placeholder="e.g. 5+ years" 
          />
        </div>
      </div>

      <div>
         <label className="block text-sm text-gray-400 mb-2 font-medium">Key Skills (Comma separated)</label>
         <input 
          type="text" 
          name="skills" 
          value={formData.skills}
          onChange={handleChange} 
          className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-white focus:border-brand-cyan outline-none transition-all" 
          placeholder="Java, Spring Boot, React, AWS" 
        />
      </div>

      <div>
         <label className="block text-sm text-gray-400 mb-2 font-medium">Upload Resume (PDF/DOCX)</label>
         <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-brand-cyan transition-colors bg-white/5 cursor-pointer relative group">
            <input 
              type="file" 
              name="resume" 
              required 
              accept=".pdf,.doc,.docx" 
              onChange={handleFileChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            />
            <UploadCloud className="w-8 h-8 text-brand-cyan mx-auto mb-2 transition-transform group-hover:scale-110" />
            <span className="text-gray-400 text-sm font-medium">
              {formData.resume ? formData.resume.name : "Drag & drop or browse resume"}
            </span>
         </div>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mt-6">
          {error}
        </div>
      )}

      <div className="py-2 transform scale-90 origin-left">
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
          theme="dark"
          onChange={(token) => setRecaptchaToken(token)}
          onExpired={() => setRecaptchaToken(null)}
        />
      </div>

      {!jobId && !error && (
        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm">
          Please select a position from the list to enable application.
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting || !jobId} 
        className="w-full bg-brand-cyan text-[#040D09] font-black py-4 rounded-xl hover:bg-white transition-all shadow-[0_0_40px_rgba(34,211,238,0.3)] hover:shadow-2xl flex justify-center items-center gap-2 disabled:opacity-70 disabled:grayscale transition-all"
      >
         {isSubmitting ? (
           <span className="flex items-center gap-2">
             <Loader2 className="animate-spin w-5 h-5"/> 
             UPLOADING PROFILE...
           </span>
         ) : 'Apply Now'}
      </button>
    </form>
  );
};

export default CareerForm;
