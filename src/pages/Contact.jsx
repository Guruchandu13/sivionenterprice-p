import React from 'react';
import LeadForm from '../features/home/LeadForm';

const Contact = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Our engineering teams are ready to architect your next big move. Reach out to our global headquarters.</p>
        </div>
        
        {/* Google Maps Embed Placeholder */}
        <div className="w-full h-96 glass rounded-3xl overflow-hidden mb-16 border border-white/10 relative">
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15281561.463567624!2d73.7250245393691!3d20.750301298393563!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635ff06b92b791%3A0xd78c4fa1854213a6!2sIndia!5e0!3m2!1sen!2sus!4v1714502394747!5m2!1sen!2sus" 
            width="100%" 
            height="100%" 
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }} 
            allowFullScreen="" 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Sivion headquarters map"
          ></iframe>
        </div>
        
      </div>
      <LeadForm />
    </div>
  );
};

export default Contact;
