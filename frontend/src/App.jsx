import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/admin/ProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import PublicLayout from './components/layouts/PublicLayout';
import ScrollToTop from './components/common/ScrollToTop';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Solutions from './pages/Solutions';
import TechnologiesPage from './pages/TechnologiesPage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import Careers from './pages/Careers';
import Blog from './pages/Blog';
import Contact from './pages/Contact';
import Quote from './pages/Quote';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import ThankYou from './pages/ThankYou';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import BlogManagement from './pages/admin/BlogManagement';
import ProjectManagement from './pages/admin/ProjectManagement';
import JobManagement from './pages/admin/JobManagement';
import Applications from './pages/admin/Applications';
import Inquiries from './pages/admin/Inquiries';
import Quotes from './pages/admin/Quotes';
import Subscribers from './pages/admin/Subscribers';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Public Routes with Navbar/Footer */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:id" element={<ServiceDetail />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/technologies" element={<TechnologiesPage />} />
            <Route path="/case-studies" element={<CaseStudiesPage />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/quote" element={<Quote />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/thank-you" element={<ThankYou />} />
          </Route>

          {/* Admin Routes - Clean independent layout */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AdminLayout />}>
              <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/blogs" element={<BlogManagement />} />
              <Route path="/admin/projects" element={<ProjectManagement />} />
              <Route path="/admin/jobs" element={<JobManagement />} />
              <Route path="/admin/applications" element={<Applications />} />
              <Route path="/admin/inquiries" element={<Inquiries />} />
              <Route path="/admin/quotes" element={<Quotes />} />
              <Route path="/admin/subscribers" element={<Subscribers />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
