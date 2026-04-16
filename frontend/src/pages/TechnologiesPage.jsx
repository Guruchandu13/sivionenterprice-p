import React from 'react';
import Technologies from '../features/home/Technologies';

const TechnologiesPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Our Technology Stack</h1>
        <p className="text-xl text-gray-400 mb-12">We use modern, battle-tested tools to build reliable enterprise software.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20">
           {["Frontend", "Backend", "Cloud Ops", "Data & AI"].map((category, i) => (
             <div key={i} className="glass p-6 rounded-xl border border-white/10 text-center">
               <h3 className="font-bold text-brand-cyan mb-2">{category}</h3>
               <p className="text-xs text-gray-400">Enterprise grade tools</p>
             </div>
           ))}
        </div>
      </div>
      <Technologies />
    </div>
  );
};

export default TechnologiesPage;
