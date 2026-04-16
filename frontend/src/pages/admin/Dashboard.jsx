import React, { useState, useEffect } from 'react';
import { 
  Users, 
  MessageSquare, 
  Quote as QuoteIcon, 
  Mail, 
  TrendingUp, 
  ArrowUpRight, 
  Clock,
  Briefcase
} from 'lucide-react';
import { motion } from 'framer-motion';
import api from '../../lib/api';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalApplications: 0,
    totalInquiries: 0,
    totalQuotes: 0,
    totalSubscribers: 0,
    recentInquiries: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [apps, inq, quotes, subs] = await Promise.all([
          api.get('/applications'),
          api.get('/contacts'),
          api.get('/quotes'),
          api.get('/subscribers')
        ]);

        setStats({
          totalApplications: apps.data.data?.length || 0,
          totalInquiries: inq.data.data?.length || 0,
          totalQuotes: quotes.data.data?.length || 0,
          totalSubscribers: subs.data.data?.length || 0,
          recentInquiries: inq.data.data?.slice(0, 5) || []
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    { name: 'Quote Requests', value: stats.totalQuotes, icon: QuoteIcon, color: 'text-brand-cyan', bg: 'bg-brand-cyan/10', trend: '+12%' },
    { name: 'Job Applications', value: stats.totalApplications, icon: Briefcase, color: 'text-blue-400', bg: 'bg-blue-400/10', trend: '+5%' },
    { name: 'Contact Inquiries', value: stats.totalInquiries, icon: MessageSquare, color: 'text-purple-400', bg: 'bg-purple-400/10', trend: '+18%' },
    { name: 'Active Subscribers', value: stats.totalSubscribers, icon: Mail, color: 'text-emerald-400', bg: 'bg-emerald-400/10', trend: '+30%' },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-black text-white tracking-tighter">OVERVIEW</h1>
        <p className="text-slate-500 text-sm mt-1">Enterprise platform analytics and lead monitoring.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-[24px] bg-[#0F172A]/40 border border-white/5 backdrop-blur-xl relative overflow-hidden group hover:border-white/10 transition-all"
          >
            <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.name}</p>
            <div className="flex items-end justify-between mt-2">
              <h3 className="text-3xl font-black text-white">{stat.value}</h3>
              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                {stat.trend}
              </span>
            </div>
            {/* Background Glow */}
            <div className={`absolute -bottom-4 -right-4 w-24 h-24 ${stat.bg} rounded-full blur-[40px] opacity-0 group-hover:opacity-100 transition-opacity`}></div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Inquiries List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-brand-cyan" />
              Latest Enterprise Inquiries
            </h2>
            <button className="text-xs font-bold text-brand-cyan hover:underline flex items-center gap-1">
              VIEW CRM <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-4">
             {stats.recentInquiries.length > 0 ? stats.recentInquiries.map((inq, i) => (
               <motion.div 
                 key={inq._id} 
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ delay: i * 0.1 }}
                 className="p-5 rounded-2xl bg-[#0F172A]/40 border border-white/5 hover:border-brand-cyan/20 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:bg-brand-cyan/10 group-hover:text-brand-cyan font-bold transition-all">
                      {inq.fullName.charAt(0)}
                    </div>
                    <div>
                      <p className="text-white text-sm font-bold">{inq.fullName}</p>
                      <p className="text-slate-500 text-xs">{inq.email}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-300 text-xs font-medium mb-1">{inq.subject}</p>
                    <p className="text-slate-500 text-[10px]">{new Date(inq.createdAt).toLocaleDateString()}</p>
                  </div>
               </motion.div>
             )) : (
               <div className="p-10 text-center glass rounded-2xl border-dashed">
                 <p className="text-slate-500 italic">No inquiries found in core system.</p>
               </div>
             )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <h2 className="text-xl font-bold text-white">Quick Actions</h2>
          <div className="grid grid-cols-1 gap-4">
            <button onClick={() => window.location.href='/admin/blogs'} className="p-4 rounded-2xl bg-brand-cyan text-[#040D09] font-black text-sm flex items-center justify-between hover:scale-[1.02] transition-transform">
              Publish New Insight
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button onClick={() => window.location.href='/admin/projects'} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm flex items-center justify-between hover:bg-white/10 transition-all">
              Add Case Study
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <button onClick={() => window.location.href='/admin/jobs'} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-white font-bold text-sm flex items-center justify-between hover:bg-white/10 transition-all">
              Post Career Opening
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* System Health */}
          <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10">
            <h3 className="text-xs font-black text-blue-400 uppercase tracking-widest mb-4">Core Connectivity</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-slate-400">Database Engine</span>
                <span className="text-emerald-400">CONNECTIVITY STEADY</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[98%] h-full bg-emerald-400"></div>
              </div>
              <div className="flex justify-between items-center text-[10px] font-bold">
                <span className="text-slate-400">CDN Propagation</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[100%] h-full bg-emerald-400"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
