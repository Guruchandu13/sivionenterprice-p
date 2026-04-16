import React, { useState, useEffect } from 'react';
import { Briefcase, MapPin, Loader2, ArrowRight } from 'lucide-react';
import CareerForm from '../components/forms/CareerForm';
import api from '../lib/api';
import { motion, AnimatePresence } from 'framer-motion';

const Careers = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await api.get('/jobs');
        if (response.data.success) {
          setJobs(response.data.data);
          if (response.data.data.length > 0) {
            setSelectedJob(response.data.data[0]);
          }
        }
      } catch (err) {
        console.error("Failed to fetch jobs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6 py-20 max-w-6xl">
        <div className="text-center mb-20 text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Join <span className="text-brand-cyan">Sivion</span></h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            We are always looking for elite engineering talent. If you have a passion for elegant code and scalable architecture, we want to hear from you.
          </p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-brand-cyan animate-spin" />
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/2 space-y-6">
              <h2 className="text-2xl font-bold border-b border-white/10 pb-4 text-white">Open Positions</h2>
              <div className="grid gap-4">
                {jobs.length > 0 ? jobs.map((job) => (
                  <motion.div 
                    key={job._id} 
                    onClick={() => setSelectedJob(job)}
                    className={`p-6 rounded-2xl cursor-pointer transition-all border ${
                      selectedJob?._id === job._id 
                      ? 'bg-brand-cyan/10 border-brand-cyan ring-1 ring-brand-cyan' 
                      : 'bg-[#0F172A]/40 border-white/5 hover:border-white/20'
                    }`}
                  >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold text-white">{job.title}</h3>
                        {selectedJob?._id === job._id && <ArrowRight className="text-brand-cyan w-5 h-5" />}
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><Briefcase className="w-4 h-4 text-brand-cyan/60" /> {job.type}</span>
                        <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-brand-cyan/60" /> {job.location}</span>
                        <span className="px-2 py-0.5 rounded-md bg-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-500">{job.department}</span>
                      </div>
                  </motion.div>
                )) : (
                  <div className="p-10 text-center glass rounded-2xl">
                    <p className="text-gray-500">No active openings at the moment. Feel free to submit a general inquiry.</p>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-1/2">
               <div className="bg-[#0F172A]/60 backdrop-blur-2xl p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl sticky top-32">
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-2 text-white">
                      {selectedJob ? `Apply for ${selectedJob.title}` : 'General Application'}
                    </h2>
                    <p className="text-sm text-slate-400">
                      Complete your profile to initiate our technical screening process.
                    </p>
                  </div>
                  <CareerForm jobId={selectedJob?._id} />
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Careers;
