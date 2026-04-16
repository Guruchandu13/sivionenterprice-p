import React from 'react';
import IndustrySolutionsFeature from '../features/home/IndustrySolutions';

const Solutions = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6 py-12 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Solutions & Industries</h1>
        <p className="text-xl text-gray-400">Tailored technical architectures for specialized sectors.</p>
      </div>
      <IndustrySolutionsFeature />
    </div>
  );
};

export default Solutions;
