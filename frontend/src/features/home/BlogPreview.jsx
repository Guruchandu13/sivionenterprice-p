import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import api from '../../lib/api';

const BlogPreview = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestBlogs = async () => {
      try {
        const response = await api.get('/blogs');
        if (response.data.success) {
          // Take only the latest 3 posts
          const latestThree = response.data.data.slice(0, 3);
          setPosts(latestThree);
        }
      } catch (err) {
        console.error("Failed to fetch blogs for preview:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestBlogs();
  }, []);

  if (loading) return null; // Hide section if loading to prevent jump, or show loader

  if (posts.length === 0) return null; // Don't show the section if no posts

  return (
    <section className="py-32 bg-brand-dark/50 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-brand-cyan text-sm font-black uppercase tracking-[0.3em] mb-4">Latest Insights</h2>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Engineering <span className="text-slate-500">Perspectives</span>
            </h3>
            <p className="text-slate-400 mt-6 text-lg leading-relaxed">
              Deep dives into scalable architecture, modern engineering practices, and technical innovation.
            </p>
          </div>
          <Link 
            to="/blog" 
            className="group flex items-center gap-2 text-white font-bold hover:text-brand-cyan transition-colors"
          >
            SEE ALL ARTICLES
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <motion.article 
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              <Link to="/blog">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-6 border border-white/10">
                   <div className="absolute inset-0 bg-brand-cyan/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                   {post.coverImage ? (
                     <img 
                        src={post.coverImage} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                   ) : (
                     <div className="w-full h-full bg-white/5 flex items-center justify-center">
                        <span className="text-brand-cyan/20 font-black text-6xl tracking-tighter uppercase">SIVION</span>
                     </div>
                   )}
                   <div className="absolute top-4 left-4 z-20">
                      <span className="px-4 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-bold text-brand-cyan uppercase tracking-widest">
                        {post.category || 'Engineering'}
                      </span>
                   </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
                    <Calendar className="w-4 h-4" />
                    {new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                  <h4 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-brand-cyan text-sm font-bold flex items-center gap-2">
                    READ ARTICLE <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
