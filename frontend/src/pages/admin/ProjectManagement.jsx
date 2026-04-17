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
  X,
  FolderKanban,
  Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api';

const ProjectManagement = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    clientName: '',
    industry: 'Technology',
    technologies: '',
    projectUrl: '',
    coverImage: '',
    status: 'published',
    featured: false
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await api.get('/projects'); // Update to admin endpoint if needed
      setProjects(response.data.data);
    } catch (err) {
      showNotification('Failed to fetch projects', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        slug: project.slug,
        shortDescription: project.shortDescription,
        fullDescription: project.fullDescription,
        clientName: project.clientName || '',
        industry: project.industry || 'Technology',
        technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
        projectUrl: project.projectUrl || '',
        coverImage: project.coverImage || '',
        status: project.status,
        featured: project.featured || false
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        slug: '',
        shortDescription: '',
        fullDescription: '',
        clientName: '',
        industry: 'Technology',
        technologies: '',
        projectUrl: '',
        coverImage: '',
        status: 'published',
        featured: false
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(t => t !== '')
    };

    try {
      if (editingProject) {
        await api.put(`/projects/${editingProject._id}`, payload);
        showNotification('Project updated successfully');
      } else {
        await api.post('/projects', payload);
        showNotification('Project created successfully');
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Action failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this case study?')) {
      try {
        await api.delete(`/projects/${id}`);
        showNotification('Project deleted successfully');
        fetchProjects();
      } catch (err) {
        showNotification('Failed to delete project', 'error');
      }
    }
  };

  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.clientName?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase text-gradient">PORTFOLIO MATRIX</h1>
          <p className="text-slate-500 text-sm mt-1">Sivion high-impact project management and case studies.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-brand-cyan text-[#040D09] font-black px-6 py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        >
          <Plus className="w-5 h-5" />
          ADD CASE STUDY
        </button>
      </div>

      {/* Stats/Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-cyan transition-colors" />
          <input 
            type="text" 
            placeholder="Search enterprise solutions or client names..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0F172A]/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all"
          />
        </div>
        <div className="bg-[#0F172A]/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between px-8">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Global Assets</span>
          <span className="text-2xl font-black text-white">{projects.length}</span>
        </div>
      </div>

      {/* Projects List */}
      {loading && projects.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-12 h-12 text-brand-cyan animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {filteredProjects.map((project, i) => (
              <motion.div 
                key={project._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-[#0F172A]/40 border border-white/5 p-4 rounded-3xl flex flex-col md:flex-row items-center gap-6 hover:border-brand-cyan/20 transition-all overflow-hidden relative"
              >
                {project.featured && (
                  <div className="absolute top-0 right-10 py-1 px-3 bg-brand-cyan/20 border-x border-b border-brand-cyan/30 rounded-b-lg flex items-center gap-1.5">
                    <Star className="w-3 h-3 text-brand-cyan fill-brand-cyan" />
                    <span className="text-[10px] font-black text-brand-cyan uppercase tracking-tighter">FEATURED</span>
                  </div>
                )}

                <div className="w-full md:w-32 h-20 rounded-2xl bg-white/5 overflow-hidden flex-shrink-0 border border-white/5">
                  {project.coverImage ? (
                    <img src={project.coverImage} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-700">
                      <FolderKanban className="w-8 h-8" />
                    </div>
                  )}
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
                    <span className="text-[10px] font-black text-brand-cyan uppercase tracking-tighter bg-brand-cyan/10 px-2 py-0.5 rounded">
                      {project.industry}
                    </span>
                    <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-0.5 rounded ${
                      project.status === 'published' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-brand-cyan transition-colors line-clamp-1">{project.title}</h3>
                  <p className="text-xs text-slate-500">
                    <span className="font-bold text-slate-400">{project.clientName}</span> • {project.technologies?.slice(0, 3).join(', ')}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => handleOpenModal(project)}
                    className="p-3 rounded-xl bg-white/5 text-blue-400 hover:bg-blue-400 hover:text-white transition-all border border-blue-400/20"
                    title="Edit System Node"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button 
                    onClick={() => handleDelete(project._id)}
                    className="p-3 rounded-xl bg-white/5 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                    title="Terminate Deployment"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <a 
                    href={`/case-studies/${project.slug}`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="p-3 rounded-xl bg-white/5 text-slate-400 hover:bg-brand-cyan hover:text-[#040D09] transition-all border border-white/10"
                    title="Inspect Production"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Project Modal */}
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
              <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
                <div>
                  <h2 className="text-2xl font-black text-white tracking-tighter">
                    {editingProject ? 'ALTER CASE STUDY' : 'NEW SYSTEM ARCHITECTURE'}
                  </h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Portfolio Matrix Management</p>
                </div>
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2.5 rounded-xl bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-8 overflow-y-auto custom-scrollbar flex-grow">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                       <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Project High-Level Title</label>
                       <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '')})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all"
                        placeholder="Nexus FinTech Ecosystem Re-architecture"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">System Slug</label>
                      <input 
                        type="text" 
                        required
                        value={formData.slug}
                        onChange={(e) => setFormData({...formData, slug: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all font-mono text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Client Entity</label>
                      <input 
                        type="text" 
                        value={formData.clientName}
                        onChange={(e) => setFormData({...formData, clientName: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all"
                        placeholder="Global Nexus Corp"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Mission Summary (Short)</label>
                      <input 
                        type="text" 
                        required
                        value={formData.shortDescription}
                        onChange={(e) => setFormData({...formData, shortDescription: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all"
                        placeholder="Re-architecting global transaction backend with 99.99% uptime..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Full Technical Documentation</label>
                      <textarea 
                        rows="8"
                        required
                        value={formData.fullDescription}
                        onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all custom-scrollbar resize-none text-sm"
                        placeholder="Enter comprehensive project details..."
                      ></textarea>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Tech Stack (Comma-delimited)</label>
                      <input 
                        type="text" 
                        value={formData.technologies}
                        onChange={(e) => setFormData({...formData, technologies: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all text-sm font-mono"
                        placeholder="React, Golang, PostgreSQL, Kafka"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Industry Vertical</label>
                      <select 
                        value={formData.industry}
                        onChange={(e) => setFormData({...formData, industry: e.target.value})}
                        className="w-full bg-[#111C2B] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all appearance-none"
                      >
                        <option>Technology</option>
                        <option>Finance</option>
                        <option>Healthcare</option>
                        <option>E-commerce</option>
                        <option>Cybersecurity</option>
                        <option>AI/Research</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                       <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Case Study Cover URI</label>
                       <input 
                        type="url" 
                        value={formData.coverImage}
                        onChange={(e) => setFormData({...formData, coverImage: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all text-sm"
                        placeholder="https://images.unsplash.com/..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Deployment Status</label>
                      <select 
                        value={formData.status}
                        onChange={(e) => setFormData({...formData, status: e.target.value})}
                        className="w-full bg-[#111C2B] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all appearance-none"
                      >
                        <option value="published">Production (Visible)</option>
                        <option value="draft">Staging (Hidden)</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-4 px-1">
                      <button 
                        type="button"
                        onClick={() => setFormData({...formData, featured: !formData.featured})}
                        className={`flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all font-bold text-xs uppercase tracking-widest flex-grow ${
                          formData.featured ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan' : 'bg-white/5 border-white/10 text-slate-500'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${formData.featured ? 'fill-brand-cyan' : ''}`} />
                        {formData.featured ? 'FEATURED NODE' : 'STANDARD NODE'}
                      </button>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex gap-4">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex-grow bg-brand-cyan text-[#040D09] font-black py-4 rounded-2xl hover:bg-white transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)]"
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : editingProject ? 'SYNCHRONIZE ASSET' : 'DEPLOY ASSET'}
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

export default ProjectManagement;
