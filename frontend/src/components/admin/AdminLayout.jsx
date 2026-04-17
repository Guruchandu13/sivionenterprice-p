import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  Users, 
  MessageSquare, 
  Quote, 
  Mail, 
  LogOut, 
  Menu, 
  X,
  ShieldCheck,
  ChevronRight,
  FolderKanban
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
    { name: 'Blogs', path: '/admin/blogs', icon: FileText },
    { name: 'Jobs', path: '/admin/jobs', icon: Briefcase },
    { name: 'Applications', path: '/admin/applications', icon: Users },
    { name: 'Inquiries', path: '/admin/inquiries', icon: MessageSquare },
    { name: 'Quotes', path: '/admin/quotes', icon: Quote },
    { name: 'Subscribers', path: '/admin/subscribers', icon: Mail },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#070D18] flex text-slate-300 font-inter">
      {/* Sidebar Overlay for mobile */}
      <AnimatePresence>
        {!isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(true)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0A192F]/80 backdrop-blur-2xl border-r border-white/5 transition-transform duration-300 lg:static lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-8 pb-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-cyan/10 rounded-xl flex items-center justify-center border border-brand-cyan/20">
                <ShieldCheck className="w-6 h-6 text-brand-cyan" />
              </div>
              <div>
                <h1 className="text-white font-black tracking-tighter text-xl">SIVION</h1>
                <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-grow px-4 space-y-2 overflow-y-auto custom-scrollbar">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-200 group relative ${
                    isActive 
                    ? 'bg-brand-cyan/10 text-brand-cyan border border-brand-cyan/20 shadow-[0_0_20px_rgba(34,211,238,0.05)]' 
                    : 'hover:bg-white/5 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-5 h-5 ${isActive ? 'text-brand-cyan' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    <span className="font-medium text-sm">{item.name}</span>
                    {isActive && (
                      <motion.div 
                        layoutId="active-indicator"
                        className="absolute right-4 w-1 h-1 rounded-full bg-brand-cyan shadow-[0_0_8px_rgba(34,211,238,1)]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Footer User Info */}
          <div className="p-6 border-t border-white/5 mt-auto">
            <div className="bg-[#111C2B] rounded-2xl p-4 border border-white/5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan font-bold border border-brand-cyan/30">
                  {user?.fullName?.charAt(0) || 'A'}
                </div>
                <div className="overflow-hidden">
                  <p className="text-white text-sm font-bold truncate">{user?.fullName || 'Administrator'}</p>
                  <p className="text-slate-500 text-[10px] font-medium uppercase truncate">{user?.role || 'Super Admin'}</p>
                </div>
              </div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-400 text-sm font-bold hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
              >
                <LogOut className="w-4 h-4" />
                <span>SIGN OUT</span>
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Header */}
        <header className="bg-[#0A192F]/40 backdrop-blur-md border-b border-white/5 p-4 lg:px-8 flex items-center justify-between sticky top-0 z-40">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="p-2.5 rounded-xl bg-white/5 lg:hidden text-slate-400 hover:text-white hover:bg-white/10"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="hidden lg:flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest">
                <span>Enterprise</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-brand-cyan">Command Center</span>
              </div>
           </div>

           <div className="flex items-center gap-4">
              <div className="hidden sm:flex flex-col items-end px-4 py-1 border-r border-white/5 mr-2">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-tighter">System Status</span>
                <span className="flex items-center gap-1.5 text-[10px] text-brand-cyan font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse"></span>
                  OPERATIONAL
                </span>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
                <Users className="w-5 h-5" />
              </div>
           </div>
        </header>

        {/* Content Area */}
        <main className="flex-grow overflow-y-auto p-4 lg:p-8 custom-scrollbar">
           <div className="max-w-7xl mx-auto">
              <Outlet />
           </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
