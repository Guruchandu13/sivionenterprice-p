import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import api from '../lib/api';
import { Loader2 } from 'lucide-react';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await api.get('/blogs');
        if (response.data.success) {
          setPosts(response.data.data);
        }
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Unable to load insights at this time.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-brand-dark">
      <div className="container mx-auto px-4 md:px-6 py-20 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">Insights <span className="text-brand-cyan">&</span> Engineering</h1>
          <p className="text-xl text-gray-400">Deep technical dives and industry perspectives from our core team.</p>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-12 h-12 text-brand-cyan animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-red-400">
            {error}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post, i) => (
              <motion.article 
                key={post._id || i} 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-[#0F172A]/40 backdrop-blur-xl rounded-2xl overflow-hidden hover:-translate-y-2 transition-transform cursor-pointer group border border-white/5"
              >
                <div className="h-48 bg-white/5 w-full relative overflow-hidden">
                   {post.coverImage ? (
                     <img src={post.coverImage} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                   ) : (
                     <div className="absolute inset-0 bg-gradient-to-tr from-brand-cyan/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   )}
                </div>
                <div className="p-8">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-brand-cyan text-xs font-bold uppercase tracking-wider">{post.category || 'Engineering'}</span>
                      <span className="text-gray-500 text-xs">{new Date(post.createdAt).toLocaleDateString()}</span>
                   </div>
                   <h2 className="text-xl font-bold text-white mb-4 line-clamp-2">{post.title}</h2>
                   <p className="text-sm text-brand-cyan font-semibold group-hover:underline">Read More &rarr;</p>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;
