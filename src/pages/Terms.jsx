import React from 'react';

const Terms = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6 py-20 max-w-4xl">
         <h1 className="text-4xl font-bold mb-8">Terms & Conditions</h1>
         <div className="prose prose-invert prose-brand-cyan max-w-none text-gray-400 space-y-6">
            <p className="text-sm">Last updated: April 10, 2026</p>
            
            <h2 className="text-white text-2xl font-bold mt-8">1. Acceptance of Terms</h2>
            <p>By accessing and using Sivion EnterpriseTech Hub services, you accept and agree to be bound by the terms and provision of this agreement.</p>

            <h2 className="text-white text-2xl font-bold mt-8">2. Intellectual Property Rights</h2>
            <p>Under these Terms, Sivion and/or its licensors own all the intellectual property rights and materials contained in this Website and related technical artifacts.</p>

            <h2 className="text-white text-2xl font-bold mt-8">3. Restrictions</h2>
            <p>You are specifically restricted from all of the following:</p>
            <ul className="list-disc pl-6 space-y-2">
               <li>publishing any Website material in any other media without prior consent;</li>
               <li>selling, sublicensing and/or otherwise commercializing any Website material;</li>
               <li>using this Website in any way that is or may be damaging to this Website or our company;</li>
            </ul>
         </div>
      </div>
    </div>
  );
};

export default Terms;
