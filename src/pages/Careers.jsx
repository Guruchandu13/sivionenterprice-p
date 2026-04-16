import React from 'react';
import { Briefcase, MapPin } from 'lucide-react';
import CareerForm from '../components/forms/CareerForm';

const jobs = [
  { title: "Senior Java Engineer", type: "Full-Time", location: "Remote / NY" },
  { title: "Cloud Solutions Architect", type: "Full-Time", location: "Remote" },
  { title: "Lead Frontend Developer (React)", type: "Full-Time", location: "Remote / SF" }
];

const Careers = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6 py-20 max-w-5xl">
        <div className="text-center mb-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Join <span className="text-gradient">Sivion</span></h1>
          <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">
            We are always looking for elite engineering talent. If you have a passion for elegant code and scalable architecture, we want to hear from you.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-2xl font-bold border-b border-white/10 pb-4">Open Positions</h2>
            {jobs.map((job, i) => (
              <div key={i} className="glass p-6 rounded-2xl hover:border-brand-cyan/50 transition-colors">
                  <h3 className="text-xl font-bold text-white mb-2">{job.title}</h3>
                  <div className="flex gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {job.type}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {job.location}</span>
                  </div>
              </div>
            ))}
          </div>

          <div className="lg:w-1/2">
             <div className="glass p-8 rounded-3xl sticky top-32">
                <h2 className="text-2xl font-bold mb-6 text-white">Application Profile</h2>
                <CareerForm />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
