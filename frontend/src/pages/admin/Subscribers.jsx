import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Trash2, 
  Loader2,
  AlertCircle,
  CheckCircle2,
  Mail,
  Calendar,
  Send,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api';

const Subscribers = () => {
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const fetchSubscribers = async () => {
    try {
      const response = await api.get('/subscribers');
      setSubscribers(response.data.data);
    } catch (err) {
      showNotification('Failed to fetch subscribers', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this subscriber?')) {
      try {
        await api.delete(`/subscribers/${id}`);
        showNotification('Email purged from system');
        fetchSubscribers();
      } catch (err) {
        showNotification('Operation denied', 'error');
      }
    }
  };

  const filteredSubscribers = subscribers.filter(s => 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-white tracking-tighter uppercase">SUBSCRIBER INDEX</h1>
          <p className="text-slate-500 text-sm mt-1">Manage newsletter community and broadcast distribution lists.</p>
        </div>
        <button className="bg-brand-cyan text-[#040D09] font-black px-6 py-3 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)]">
          <Send className="w-4 h-4" />
          BROADCAST PROTOCOL
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-brand-cyan transition-colors" />
          <input 
            type="text" 
            placeholder="Search email index..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#0F172A]/40 border border-white/5 rounded-2xl pl-12 pr-4 py-4 text-white focus:outline-none focus:border-brand-cyan transition-all"
          />
        </div>
        <div className="bg-[#0F172A]/40 border border-white/5 rounded-2xl p-4 flex items-center justify-between px-8">
          <span className="text-slate-500 text-xs font-bold uppercase tracking-widest">Active nodes</span>
          <span className="text-2xl font-black text-white">{subscribers.length}</span>
        </div>
      </div>

      <div className="bg-[#0F172A]/40 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Community Node (Email)</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest">Ingestion Date</th>
              <th className="px-8 py-5 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="3" className="py-20 text-center">
                  <Loader2 className="w-10 h-10 text-brand-cyan animate-spin mx-auto" />
                </td>
              </tr>
            ) : filteredSubscribers.map((sub, i) => (
              <motion.tr 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.02 }}
                key={sub._id} 
                className="border-b border-white/5 hover:bg-white/5 transition-colors group"
              >
                <td className="px-8 py-5">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-brand-cyan/10 flex items-center justify-center text-brand-cyan">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm text-slate-300 font-medium group-hover:text-white transition-colors">{sub.email}</span>
                  </div>
                </td>
                <td className="px-8 py-5">
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Calendar className="w-4 h-4" />
                    {new Date(sub.subscribedAt || sub.createdAt).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-8 py-5 text-right">
                   <button 
                    onClick={() => handleDelete(sub._id)}
                    className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                   >
                     <Trash2 className="w-4 h-4" />
                   </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {filteredSubscribers.length === 0 && !loading && (
          <div className="p-20 text-center text-slate-600">
             <Mail className="w-12 h-12 mx-auto mb-4 opacity-10" />
             <p className="uppercase tracking-[0.2em] text-[10px] font-black">No subscriber records in current index pool</p>
          </div>
        )}
      </div>

      {/* Broadcaster Promo */}
      <div className="p-8 rounded-[32px] bg-gradient-to-r from-brand-cyan/20 to-blue-500/10 border border-brand-cyan/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
           <h3 className="text-xl font-bold text-white mb-2">Automated Broadcaster</h3>
           <p className="text-slate-400 text-sm max-w-lg">Initiate automated marketing protocols and synchronize your technical insights with your entire community index.</p>
        </div>
        <button className="whitespace-nowrap flex items-center gap-2 bg-brand-cyan text-[#040D09] px-8 py-4 rounded-2xl font-black text-xs hover:bg-white transition-all">
          ACCESS SMTP CONSOLE <ArrowRight className="w-4 h-4" />
        </button>
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

export default Subscribers;
