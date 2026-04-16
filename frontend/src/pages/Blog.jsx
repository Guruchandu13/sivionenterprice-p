import React from 'react';
import { motion } from 'framer-motion';

const posts = [
  { title: "The Future of Kubernetes in 2026", category: "DevOps", date: "April 10, 2026" },
  { title: "React vs Vue for Enterprise Apps", category: "Frontend", date: "April 05, 2026" },
  { title: "Zero Trust Architecture Explained", category: "Security", date: "March 28, 2026" },
];

const Blog = () => {
  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6 py-20 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Insights <span className="text-brand-cyan">&</span> Engineering</h1>
          <p className="text-xl text-gray-400">Deep technical dives and industry perspectives from our core team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {posts.map((post, i) => (
             <article key={i} className="glass rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform cursor-pointer group">
                <div className="h-48 bg-white/5 w-full relative overflow-hidden">
                   <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <div className="p-8">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-brand-cyan text-xs font-bold uppercase tracking-wider">{post.category}</span>
                      <span className="text-gray-500 text-xs">{post.date}</span>
                   </div>
                   <h2 className="text-xl font-bold text-white mb-4 line-clamp-2">{post.title}</h2>
                   <p className="text-sm text-brand-cyan font-semibold group-hover:underline">Read More &rarr;</p>
                </div>
             </article>
           ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
