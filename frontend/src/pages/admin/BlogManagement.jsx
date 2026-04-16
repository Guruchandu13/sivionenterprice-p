import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  Loader2,
  AlertCircle,
  CheckCircle2,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api';

const BlogManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    summary: '',
    content: '',
    category: 'Engineering',
    authorName: 'Admin',
    coverImage: '',
    isPublished: true
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/blogs');
      setBlogs(response.data.data);
    } catch (err) {
      showNotification('Failed to fetch blogs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        slug: blog.slug,
        summary: blog.summary || '',
        content: blog.content,
        category: blog.category,
        authorName: blog.authorName || 'Admin',
        coverImage: blog.coverImage || '',
        isPublished: blog.isPublished !== undefined ? blog.isPublished : true
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        slug: '',
        summary: '',
        content: '',
        category: 'Engineering',
        authorName: 'Admin',
        coverImage: '',
        isPublished: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingBlog) {
        await api.put(`/blogs/${editingBlog._id}`, formData);
        showNotification('Blog updated successfully');
      } else {
        await api.post('/blogs', formData);
        showNotification('Blog created successfully');
      }
      setIsModalOpen(false);
      fetchBlogs();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Action failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      try {
        await api.delete(`/blogs/${id}`);
        showNotification('Blog deleted successfully');
        fetchBlogs();
      } catch (err) {
        showNotification('Failed to delete blog', 'error');
      }
    }
  };

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    blog.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">INSIGHTS ENGINE</h1>
          <p className="text-slate-500 text-sm mt-1">Manage technical publications and industry thought leadership.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-brand-cyan text-[#040D09] font-black px-6 py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        >
          <Plus className="w-5 h-5" />
          CREATE PUBLICATION
        </button>
      </div>

      {/* Stats/Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-cyan transition-colors" />
          <input 
            type="text" 
            placeholder="Filter by title or technology category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0F172A]/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all"
          />
        </div>
        <div className="bg-[#0F172A]/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between px-8">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Total Active</span>
          <span className="text-2xl font-black text-white">{blogs.length}</span>
        </div>
      </div>

      {/* Blogs Table/Grid */}
      {loading && blogs.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-12 h-12 text-brand-cyan animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {filteredBlogs.map((blog, i) => (
              <motion.div 
                key={blog._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-[#0F172A]/40 border border-white/5 p-4 rounded-3xl flex flex-col md:flex-row items-center gap-6 hover:border-brand-cyan/20 transition-all"
              >
                <div className="w-full md:w-32 h-20 rounded-2xl bg-white/5 overflow-hidden flex-shrink-0 border border-white/5">
                  {blog.coverImage ? (
                    <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700">
                      <Edit2 className="w-8 h-8" />
                    </div>
                  )}
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
                    <span className="text-[10px] font-black text-brand-cyan uppercase tracking-tighter bg-brand-cyan/10 px-2 py-0.5 rounded">
                      {blog.category}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded ${
                      blog.isPublished ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {blog.isPublished ? 'published' : 'draft'}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors line-clamp-1">{blog.title}</h3>
                  <p className="text-xs text-slate-500">By {blog.authorName || 'Sivion Team'} • {new Date(blog.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleOpenModal(blog)}
                    className="p-3 rounded-xl bg-white/5 text-blue-400 hover:bg-blue-400 hover:text-white transition-all border border-blue-400/20"
                    title="Edit Publication"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(blog._id)}
                    className="p-3 rounded-xl bg-white/5 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                    title="Delete Publication"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <a 
                    href={`/blog/${blog.slug}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-white/5 text-slate-400 hover:bg-brand-cyan hover:text-[#040D09] transition-all border border-white/10"
                    title="View Production"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredBlogs.length === 0 && !loading && (
            <div className="p-20 text-center glass rounded-3xl border-dashed">
              <p className="text-slate-500 italic">No publications matched your search criteria.</p>
            </div>
          )}
        </div>
      )}

      {/* Editor Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-4xl bg-[#0A192F] border border-white/10 rounded-[40px] shadow-2xl overflow-hidden relative z-10 max-h-[90vh] flex flex-col"
            >
              {/* Modal Header */}
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tighter">
                    {editingBlog ? 'EDIT PUBLICATION' : 'NEW INSIGHT'}
                  </h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Stochastic Content Management</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-8 overflow-y-auto custom-scrollbar flex-grow">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Publication Title</label>
                       <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '')})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all"
                        placeholder="The evolution of distributed systems..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">URL Token (Slug)</label>
                      <input 
                        type="text" 
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all font-mono text-sm"
                        placeholder="evolution-of-distributed-systems"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Classification Pool</label>
                      <select 
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        className="w-full bg-[#111C2B] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all appearance-none"
                      >
                        <option>Engineering</option>
                        <option>Architecture</option>
                        <option>Security</option>
                        <option>DevOps</option>
                        <option>Frontend</option>
                        <option>Backend</option>
                        <option>FinTech</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                       <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Executive Summary (Short Preview)</label>
                       <textarea 
                        rows="3"
                        required
                        value={formData.summary}
                        onChange={(e) => setFormData({...formData, summary: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all custom-scrollbar resize-none text-sm"
                        placeholder="A brief summary of the technical insight..."
                      ></textarea>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Content Payloads (Markdown Supported)</label>
                      <textarea 
                        rows="12"
                        required
                        value={formData.content}
                        onChange={(e) => setFormData({...formData, content: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all custom-scrollbar resize-none text-sm"
                        placeholder="Enter your technical payload here..."
                      ></textarea>
                    </div>

                    <div className="md:col-span-2">
                       <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Cover Image URI</label>
                       <input 
                        type="url" 
                        value={formData.coverImage}
                        onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all text-sm"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Author Identity</label>
                      <input 
                        type="text" 
                        required
                        value={formData.authorName}
                        onChange={(e) => setFormData({...formData, authorName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Visibility State</label>
                      <select 
                        value={formData.isPublished ? 'published' : 'draft'}
                        onChange={(e) => setFormData({...formData, isPublished: e.target.value === 'published'})}
                        className="w-full bg-[#111C2B] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all appearance-none"
                      >
                        <option value="published">Production (Published)</option>
                        <option value="draft">Staging (Draft)</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex gap-4">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex-grow bg-brand-cyan text-[#040D09] font-black py-4 rounded-2xl hover:bg-white transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)] disabled:opacity-50"
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : editingBlog ? 'SYNCHRONIZE CHANGES' : 'DEPLOY PUBLICATION'}
                    </button>
                    <button 
                      type="button" 
                      onClick={() => setIsModalOpen(false)}
                      className="px-10 bg-white/5 border border-white/10 text-white font-bold py-4 rounded-2xl hover:bg-white/10 transition-all"
                    >
                      ABORT
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Notifications */}
      <AnimatePresence>
        {notification && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-8 py-4 rounded-2xl border flex items-center gap-3 shadow-2xl backdrop-blur-md ${
              notification.type === 'success' 
              ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400' 
              : 'bg-red-500/10 border-red-500/50 text-red-400'
            }`}
          >
            {notification.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            <span className="font-bold text-sm tracking-tight">{notification.message.toUpperCase()}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogManagement;
