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
  Building,
  DollarSign,
  Cpu,
  Quote as QuoteIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import api from '../../lib/api';

const Quotes = () => {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [notification, setNotification] = useState(null);
  const [selectedQuote, setSelectedQuote] = useState(null);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await api.get('/quotes');
      setQuotes(response.data.data);
    } catch (err) {
      showNotification('Failed to fetch quote requests', 'error');
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Erase this quote request?')) {
      try {
        await api.delete(`/quotes/${id}`);
        showNotification('Request purged');
        fetchQuotes();
        if (selectedQuote?._id === id) setSelectedQuote(null);
      } catch (err) {
        showNotification('System Error', 'error');
      }
    }
  };

  const filteredQuotes = quotes.filter(q => 
    q.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    q.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter uppercase">PROPOSAL LOGISTICS</h1>
        <p className="text-slate-500 text-sm mt-1">Manage technical proposals and project budget estimations.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1 space-y-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-brand-cyan transition-colors" />
            <input 
              type="text" 
              placeholder="Filter proposals..."
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
            ) : filteredQuotes.map((quote) => (
              <motion.div 
                key={quote._id}
                onClick={() => setSelectedQuote(quote)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                  selectedQuote?._id === quote._id 
                  ? 'bg-brand-cyan/10 border-brand-cyan' 
                  : 'bg-[#0F172A]/40 border-white/5 hover:border-white/10'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="text-sm font-bold text-white truncate max-w-[150px]">{quote.fullName}</h3>
                  <span className="text-[10px] text-brand-cyan font-black">{quote.budget}</span>
                </div>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{quote.serviceType}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {selectedQuote ? (
              <motion.div 
                key={selectedQuote._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-[#0F172A]/40 border border-white/5 rounded-[32px] overflow-hidden backdrop-blur-xl h-fit"
              >
                <div className="p-8 border-b border-white/5 flex items-center justify-between bg-white/5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan border border-brand-cyan/20">
                      <Cpu className="w-7 h-7" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white tracking-tight">{selectedQuote.fullName}</h2>
                      <p className="text-brand-cyan text-[10px] font-black uppercase tracking-[0.2em]">{selectedQuote.company}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(selectedQuote._id)}
                    className="p-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                       <div className="flex items-center gap-3">
                         <Mail className="w-4 h-4 text-slate-500" />
                         <span className="text-sm text-slate-300 font-medium">{selectedQuote.email}</span>
                       </div>
                       <div className="flex items-center gap-3">
                         <Phone className="w-4 h-4 text-slate-500" />
                         <span className="text-sm text-slate-300 font-medium">{selectedQuote.phone || 'N/A'}</span>
                       </div>
                       <div className="flex items-center gap-3 text-brand-cyan">
                         <DollarSign className="w-4 h-4" />
                         <span className="text-sm font-black tracking-widest uppercase">{selectedQuote.budget} Target</span>
                       </div>
                    </div>
                    <div className="space-y-4">
                       <div className="flex items-center gap-3">
                         <Building className="w-4 h-4 text-slate-500" />
                         <span className="text-sm text-slate-300 font-medium">{selectedQuote.company}</span>
                       </div>
                       <div className="flex items-center gap-3">
                         <Cpu className="w-4 h-4 text-slate-500" />
                         <span className="text-sm text-slate-300 font-medium">{selectedQuote.serviceType}</span>
                       </div>
                       <div className="flex items-center gap-3">
                         <Calendar className="w-4 h-4 text-slate-500" />
                         <span className="text-sm text-slate-500">{new Date(selectedQuote.createdAt).toLocaleString()}</span>
                       </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-3">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Project Requirements Architecture</p>
                    <p className="text-white text-sm leading-relaxed whitespace-pre-wrap">
                      {selectedQuote.projectDetails}
                    </p>
                  </div>

                  <div className="flex gap-4">
                     <a href={`mailto:${selectedQuote.email}`} className="flex-grow bg-brand-cyan text-[#040D09] font-black py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-white transition-all shadow-[0_0_30px_rgba(34,211,238,0.2)]">
                        SEND TECHNICAL PROPOSAL
                     </a>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="h-96 flex flex-col items-center justify-center glass rounded-[32px] border-dashed text-slate-600">
                <QuoteIcon className="w-16 h-16 mb-4 opacity-20" />
                <p className="font-bold uppercase tracking-widest text-xs">Awaiting Proposal Selection</p>
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

export default Quotes;
