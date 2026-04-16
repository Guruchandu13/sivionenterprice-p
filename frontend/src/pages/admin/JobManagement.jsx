import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  Loader2,
  AlertCircle,
  CheckCircle2,
  X,
  Briefcase,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api';

const JobManagement = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-Time',
    description: '',
    requirements: '',
    isActive: true
  });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await api.get('/jobs'); // Public endpoint returns only active ones, maybe use admin endpoint if available
      // For now assume public endpoint for testing, but in production use /api/jobs/admin
      setJobs(response.data.data);
    } catch (err) {
      showNotification('Failed to fetch jobs', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenModal = (job = null) => {
    if (job) {
      setEditingJob(job);
      setFormData({
        title: job.title,
        department: job.department,
        location: job.location,
        type: job.type,
        description: job.description,
        requirements: Array.isArray(job.requirements) ? job.requirements.join('\n') : '',
        isActive: job.isActive
      });
    } else {
      setEditingJob(null);
      setFormData({
        title: '',
        department: 'Engineering',
        location: 'Remote',
        type: 'Full-Time',
        description: '',
        requirements: '',
        isActive: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const payload = {
      ...formData,
      requirements: formData.requirements.split('\n').map(r => r.trim()).filter(r => r !== '')
    };

    try {
      if (editingJob) {
        await api.put(`/jobs/${editingJob._id}`, payload);
        showNotification('Operation updated successfully');
      } else {
        await api.post('/jobs', payload);
        showNotification('New role synchronized');
      }
      setIsModalOpen(false);
      fetchJobs();
    } catch (err) {
      showNotification(err.response?.data?.message || 'Action failed', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to decommission this role?')) {
      try {
        await api.delete(`/jobs/${id}`);
        showNotification('Role decommissioned');
        fetchJobs();
      } catch (err) {
        showNotification('Access denied or system error', 'error');
      }
    }
  };

  const toggleStatus = async (job) => {
    try {
      await api.put(`/jobs/${job._id}`, { isActive: !job.isActive });
      showNotification(`Role ${!job.isActive ? 'activated' : 'deactivated'}`);
      fetchJobs();
    } catch (err) {
      showNotification('Failed to toggle status', 'error');
    }
  };

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">TALENT ACQUISITION</h1>
          <p className="text-slate-500 text-sm mt-1">Manage enterprise career openings and recruitment cycles.</p>
        </div>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-brand-cyan text-[#040D09] font-black px-6 py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)]"
        >
          <Plus className="w-5 h-5" />
          OPEN NEW POSITION
        </button>
      </div>

      {/* Stats/Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-cyan transition-colors" />
          <input 
            type="text" 
            placeholder="Search roles or departments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0F172A]/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all"
          />
        </div>
        <div className="bg-[#0F172A]/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between px-8">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Active Search</span>
          <span className="text-2xl font-black text-white">{jobs.filter(j => j.isActive).length}</span>
        </div>
      </div>

      {/* Jobs List */}
      {loading && jobs.length === 0 ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-12 h-12 text-brand-cyan animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <AnimatePresence>
            {filteredJobs.map((job, i) => (
              <motion.div 
                key={job._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: i * 0.05 }}
                className="group bg-[#0F172A]/40 border border-white/5 p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 hover:border-brand-cyan/20 transition-all relative overflow-hidden"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan border border-brand-cyan/20 flex-shrink-0">
                  <Briefcase className="w-8 h-8" />
                </div>
                
                <div className="flex-grow text-center md:text-left">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-1">
                    <span className="text-[10px] font-black text-brand-cyan uppercase tracking-tighter bg-brand-cyan/10 px-2 py-0.5 rounded">
                      {job.department}
                    </span>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter bg-white/5 px-2 py-0.5 rounded">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors">{job.title}</h3>
                  <p className="text-sm text-slate-500">{job.location} • Posted {new Date(job.createdAt).toLocaleDateString()}</p>
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleStatus(job)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all font-bold text-[10px] tracking-widest ${
                      job.isActive 
                      ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
                      : 'bg-slate-500/10 border-white/10 text-slate-500'
                    }`}
                  >
                    {job.isActive ? <><ToggleRight className="w-4 h-4" /> ACTIVE</> : <><ToggleLeft className="w-4 h-4" /> INACTIVE</>}
                  </button>

                  <div className="flex items-center gap-2 border-l border-white/5 pl-4">
                    <button 
                      onClick={() => handleOpenModal(job)}
                      className="p-3 rounded-xl bg-white/5 text-blue-400 hover:bg-blue-400 hover:text-white transition-all border border-blue-400/20"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(job._id)}
                      className="p-3 rounded-xl bg-white/5 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filteredJobs.length === 0 && !loading && (
            <div className="p-20 text-center glass rounded-3xl border-dashed">
              <p className="text-slate-500 italic">No job openings found in active search pools.</p>
            </div>
          )}
        </div>
      )}

      {/* Job Modal */}
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
                  <h2 className="text-2xl font-black text-white tracking-tighter uppercase">
                    {editingJob ? 'SYNC ROLE PARAMETERS' : 'INITIATE RECRUITMENT NODE'}
                  </h2>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">Human Capital Deployment</p>
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
                       <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Job Title</label>
                       <input 
                        type="text" 
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all"
                        placeholder="Lead Cloud Solutions Architect"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Department</label>
                      <select 
                        value={formData.department}
                        onChange={(e) => setFormData({...formData, department: e.target.value})}
                        className="w-full bg-[#111C2B] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all appearance-none"
                      >
                        <option>Engineering</option>
                        <option>Product</option>
                        <option>Design</option>
                        <option>Security</option>
                        <option>Sales</option>
                        <option>Operations</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Location Strategy</label>
                      <input 
                        type="text" 
                        required
                        value={formData.location}
                        onChange={(e) => setFormData({...formData, location: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all"
                        placeholder="Remote / NY / SF"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Employment Type</label>
                      <select 
                        value={formData.type}
                        onChange={(e) => setFormData({...formData, type: e.target.value})}
                        className="w-full bg-[#111C2B] border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all appearance-none"
                      >
                        <option>Full-Time</option>
                        <option>Contract</option>
                        <option>Part-Time</option>
                        <option>Freelance</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-4 pt-8">
                       <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.isActive}
                          onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                          className="sr-only peer" 
                        />
                        <div className="w-14 h-7 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-brand-cyan"></div>
                        <span className="ml-3 text-xs font-black text-slate-500 uppercase tracking-widest">Active Hiring State</span>
                      </label>
                    </div>

                    <div className="md:col-span-2">
                       <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Role Description</label>
                       <textarea 
                        rows="4"
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all resize-none text-sm"
                        placeholder="Summarize the core mission of this role..."
                      ></textarea>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-black text-slate-500 uppercase tracking-widest mb-3 px-1">Technical Requirements (One per line)</label>
                      <textarea 
                        rows="8"
                        required
                        value={formData.requirements}
                        onChange={(e) => setFormData({...formData, requirements: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all custom-scrollbar resize-none font-mono text-xs leading-loose"
                        placeholder="10+ years experience in backend..."
                      ></textarea>
                    </div>
                  </div>

                  <div className="pt-8 border-t border-white/5 flex gap-4">
                    <button 
                      type="submit" 
                      disabled={loading}
                      className="flex-grow bg-brand-cyan text-[#040D09] font-black py-4 rounded-2xl hover:bg-white transition-all shadow-[0_0_40px_rgba(34,211,238,0.2)]"
                    >
                      {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto" /> : editingJob ? 'UPDATE ROLE SPEC' : 'INITIATE ROLE'}
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

export default JobManagement;
