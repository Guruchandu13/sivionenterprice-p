import React from 'react';
import Hero from '../features/home/Hero';
import CompanyIntroduction from '../features/home/CompanyIntroduction';
import ServicesOverview from '../features/home/ServicesOverview';
import WhyChooseUs from '../features/home/WhyChooseUs';
import Technologies from '../features/home/Technologies';
import IndustrySolutions from '../features/home/IndustrySolutions';
import Process from '../features/home/Process';
import CaseStudies from '../features/home/CaseStudies';
import Testimonials from '../features/home/Testimonials';
import StatsCounter from '../features/home/StatsCounter';
import FAQ from '../features/home/FAQ';
import CTABanner from '../features/home/CTABanner';
import LeadForm from '../features/home/LeadForm';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <CompanyIntroduction />
      <ServicesOverview />
      <WhyChooseUs />
      <Technologies />
      <IndustrySolutions />
      <Process />
      <CaseStudies />
      <Testimonials />
      <StatsCounter />
      <FAQ />
      <CTABanner />
      <LeadForm />
    </div>
  );
};

export default Home;
