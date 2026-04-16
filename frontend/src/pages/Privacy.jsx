import React from 'react';

const Privacy = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6 py-20 max-w-4xl">
         <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
         <div className="prose prose-invert prose-brand-cyan max-w-none text-gray-400 space-y-6">
            <p className="text-sm">Last updated: April 10, 2026</p>
            
            <h2 className="text-white text-2xl font-bold mt-8">1. Introduction</h2>
            <p>Welcome to Sivion EnterpriseTech Hub. We respect your privacy and are committed to protecting your personal data...</p>

            <h2 className="text-white text-2xl font-bold mt-8">2. Data We Collect</h2>
            <p>We may collect, use, store and transfer different kinds of personal data about you including:</p>
            <ul className="list-disc pl-6 space-y-2">
               <li>Identity Data: First name, last name, username.</li>
               <li>Contact Data: Email address, telephone numbers.</li>
               <li>Technical Data: IP address, browser type, operating system.</li>
            </ul>

            <h2 className="text-white text-2xl font-bold mt-8">3. How We Use Your Data</h2>
            <p>We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances: Where we need to perform the contract we are about to enter into or have entered into with you.</p>
         </div>
      </div>
    </div>
  );
};

export default Privacy;
