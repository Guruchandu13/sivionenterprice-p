import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Trash2, 
  Loader2,
  AlertCircle,
  CheckCircle2,
  Mail,
  User,
  Calendar,
  Phone,
  Briefcase,
  FileText,
  ExternalLink,
  ChevronDown,
  Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api';

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [selectedApp, setSelectedApp] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const response = await api.get('/applications');
      setApplications(response.data.data);
    } catch (err) {
      showNotification('Failed to fetch applications', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this application record?')) {
      try {
        await api.delete(`/applications/${id}`);
        showNotification('Profile erased');
        fetchApplications();
        if (selectedApp?._id === id) setSelectedApp(null);
      } catch (err) {
        showNotification('Operation Aborted', 'error');
      }
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    setUpdatingStatus(true);
    try {
      await api.patch(`/applications/${id}/status`, { status: newStatus });
      showNotification(`Status updated to ${newStatus}`);
      fetchApplications();
      // Update selected app in view
      setSelectedApp({...selectedApp, status: newStatus});
    } catch (err) {
      showNotification('Status Sync Failed', 'error');
    } finally {
      setUpdatingStatus(false);
    }
  };

  const filteredApps = applications.filter(app => 
    app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.jobId?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'hired': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'reviewed': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      default: return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase">TALENT PIPELINE</h1>
        <p className="text-slate-500 text-sm mt-1">Review elite candidates and manage technical recruitment funnels.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-cyan transition-colors" />
            <input 
              type="text" 
              placeholder="Filter candidates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0F172A]/40 border border-white/5 rounded-2xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand-cyan transition-all"
            />
          </div>

          <div className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar pr-2">
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader2 className="w-8 h-8 text-brand-cyan animate-spin" />
              </div>
            ) : filteredApps.map((app) => (
              <motion.div 
                key={app._id}
                onClick={() => setSelectedApp(app)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedApp?._id === app._id 
                  ? 'bg-brand-cyan/10 border-brand-cyan' 
                  : 'bg-[#0F172A]/40 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-bold text-white truncate max-w-[150px]">{app.fullName}</h3>
                  <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full border ${getStatusColor(app.status)}`}>
                    {app.status}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest truncate">{app.jobId?.title || 'Unknown Role'}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedApp ? (
              <motion.div 
                key={selectedApp._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#0F172A]/40 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-xl h-fit"
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan border border-brand-cyan/20">
                      <User className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight">{selectedApp.fullName}</h2>
                      <p className="text-brand-cyan text-[10px] font-black uppercase tracking-[0.2em]">Candidate Analysis Node</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative group/status">
                      <button className={`flex items-center gap-2 px-4 py-2 rounded-xl border text-[10px] font-black tracking-widest transition-all ${getStatusColor(selectedApp.status)}`}>
                        {selectedApp.status.toUpperCase()} <ChevronDown className="w-3 h-3" />
                      </button>
                      <div className="absolute right-0 mt-2 w-40 bg-[#111C2B] border border-white/10 rounded-2xl shadow-2xl opacity-0 group-hover/status:opacity-100 pointer-events-none group-hover/status:pointer-events-auto transition-all z-20">
                        {['pending', 'reviewed', 'rejected', 'hired'].map((s) => (
                           <button 
                            key={s}
                            onClick={() => handleUpdateStatus(selectedApp._id, s)}
                            className="w-full text-left px-4 py-3 text-[10px] font-bold text-slate-400 hover:text-white hover:bg-white/5 first:rounded-t-2xl last:rounded-b-2xl uppercase tracking-widest border-b border-white/5 last:border-0"
                           >
                              {s}
                           </button>
                        ))}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(selectedApp._id)}
                      className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <div className="flex items-center gap-3">
                         <Mail className="w-4 h-4 text-slate-500" />
                         <span className="text-sm text-slate-300 font-medium">{selectedApp.email}</span>
                       </div>
                       <div className="flex items-center gap-3">
                         <Phone className="w-4 h-4 text-slate-500" />
                         <span className="text-sm text-slate-300 font-medium">{selectedApp.phone}</span>
                       </div>
                       <div className="flex items-center gap-3">
                         <Briefcase className="w-4 h-4 text-slate-500" />
                         <span className="text-sm text-brand-cyan font-bold">{selectedApp.jobId?.title || 'Applied Position'}</span>
                       </div>
                    </div>
                    <div className="space-y-4 text-right">
                       <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Applied Date</div>
                       <div className="text-sm text-white font-medium">{new Date(selectedApp.appliedAt).toLocaleString()}</div>
                       <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-4">Experience Metrics</div>
                       <div className="text-sm text-white font-black">{selectedApp.experience || 'Not Specified'}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Technical Competencies</p>
                    <div className="flex flex-wrap gap-2">
                       {selectedApp.skills?.map((skill, i) => (
                         <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-slate-300">
                           {skill}
                         </span>
                       ))}
                    </div>
                  </div>

                  {selectedApp.resumeUrl && (
                    <div className="p-6 rounded-2xl bg-brand-cyan/5 border border-brand-cyan/20 flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-brand-cyan/20 rounded-xl flex items-center justify-center text-brand-cyan">
                          <FileText className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-white text-sm font-bold tracking-tight">Technical Resume Asset</p>
                          <p className="text-slate-500 text-[10px] font-medium uppercase">Cloud-Hosted Document</p>
                        </div>
                      </div>
                      <a 
                        href={selectedApp.resumeUrl} 
                        target="_blank" 
                        rel="noreferrer"
                        className="p-3 bg-brand-cyan text-[#040D09] rounded-xl hover:bg-white transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)]"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  )}

                  <div className="flex gap-4">
                     <a href={`mailto:${selectedApp.email}`} className="flex-grow bg-white/5 border border-white/10 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-all">
                        SEND INTERVIEW INVITE
                     </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center glass rounded-[32px] border-dashed text-slate-600">
                <Users className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-bold uppercase tracking-widest text-xs">Awaiting Candidate Selection</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

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

export default Applications;
