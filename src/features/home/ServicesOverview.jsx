import React from 'react';
import { motion } from 'framer-motion';
import { Code, Layout, Cpu, PenTool, Braces, RefreshCw, Smartphone, Navigation, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <Code className="w-8 h-8 text-brand-cyan" />,
    title: "Java Full Stack Development",
    description: "Robust backends and performant frontends built on modern Java architectures for high-scale enterprise needs.",
    image: "/images/services/java.png"
  },
  {
    icon: <Layout className="w-8 h-8 text-brand-cyan" />,
    title: "Web Application Development",
    description: "Interactive, scalable web applications built with modern JavaScript frameworks and real-time data integration.",
    image: "/images/services/web_apps.png"
  },
  {
    icon: <Cpu className="w-8 h-8 text-brand-cyan" />,
    title: "Custom Software Solutions",
    description: "Bespoke software engineered from the ground up to solve your organization's unique business challenges.",
    image: "/images/services/custom_software.png"
  },
  {
    icon: <PenTool className="w-8 h-8 text-brand-cyan" />,
    title: "UI/UX Design Support",
    description: "Premium visual design and intuitive user flows that command engagement and reflect your brand's authority.",
    image: "/images/services/ui_ux.png"
  },
  {
    icon: <Braces className="w-8 h-8 text-brand-cyan" />,
    title: "API Integration Services",
    description: "Seamless connectivity across third-party tools, legacy systems, and external databases with absolute security.",
    image: "/images/services/api.png"
  },
  {
    icon: <RefreshCw className="w-8 h-8 text-brand-cyan" />,
    title: "Maintenance & Support",
    description: "24/7 proactive monitoring, rapid patches, and absolute system reliability for mission-critical infrastructure.",
    image: "/images/services/maintenance.png"
  },
  {
    icon: <Smartphone className="w-8 h-8 text-brand-cyan" />,
    title: "Responsive Website Development",
    description: "Mobile-first, conversion-optimized marketing and enterprise websites that perform across all devices.",
    image: "/images/services/ui_ux.png" // Reusing UI/UX for now due to quota
  },
  {
    icon: <Navigation className="w-8 h-8 text-brand-cyan" />,
    title: "Business Portal Development",
    description: "Secure intranet and customer portals designed to streamline operations and grant controlled data access.",
    image: "/images/services/web_apps.png" // Reusing Web Apps for now
  }
];

const ServicesOverview = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-24 md:py-40 bg-brand-dark relative z-10 overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-[50vw] h-[50vw] bg-brand-cyan/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-brand-cyan/10 border border-brand-cyan/20 text-brand-cyan text-xs font-bold uppercase tracking-widest"
          >
            Our Capabilities
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-black mb-8 text-white tracking-tighter">
            Enterprise <span className="text-gradient">Excellence.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed">
            We deliver end-to-end technology solutions that drive operational efficiency and digital transformation for ambitious global organizations.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="group relative flex flex-col h-full bg-[#0F172A]/40 backdrop-blur-xl rounded-[32px] border border-white/5 overflow-hidden hover:border-brand-cyan/50 transition-all duration-500 hover:shadow-[0_20px_50px_-15px_rgba(34,211,238,0.2)]"
            >
              {/* Image Header */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <motion.img 
                  src={service.image} 
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4 z-20 w-12 h-12 rounded-2xl bg-brand-dark/80 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:bg-brand-cyan/20 group-hover:border-brand-cyan transition-all">
                   <div className="scale-75 text-white">{service.icon}</div>
                </div>
              </div>

              {/* Content Buffer */}
              <div className="p-8 flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-brand-cyan transition-colors leading-tight">{service.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1 font-light">
                  {service.description}
                </p>
                <div className="mt-auto pt-6 border-t border-white/5">
                  <Link to="/services" className="inline-flex items-center gap-2 text-brand-cyan text-sm font-bold uppercase tracking-widest hover:text-white transition-colors group/link">
                    Explore Details 
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
              
              {/* Hover Glow Edge */}
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-brand-cyan scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
            </motion.div>
          ))}
        </motion.div>
        
      </div>
    </section>
  );
};

export default ServicesOverview;
