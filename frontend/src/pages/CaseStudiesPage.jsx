import React from 'react';
import CaseStudies from '../features/home/CaseStudies';

const CaseStudiesPage = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Case Studies</h1>
        <p className="text-xl text-gray-400">Deep dives into our enterprise transformations.</p>
      </div>
      <CaseStudies />
    </div>
  );
};

export default CaseStudiesPage;
