import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'

// Admin Components
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProjects from './pages/admin/AdminProjects'
import AdminReviews from './pages/admin/AdminReviews'
import AdminLeads from './pages/admin/AdminLeads'
import { AdminBlog, AdminApplications, AdminListings, AdminSettings } from './pages/admin/AdminMisc'

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />

                <Route path="/admin" element={<AdminLayout />}>
                    <Route index element={<Navigate to="/admin/dashboard" />} />
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="projects" element={<AdminProjects />} />
                    {/* Placeholders for other admin pages */}
                    <Route path="reviews" element={<AdminReviews />} />
                    <Route path="blog" element={<AdminBlog />} />
                    <Route path="leads" element={<AdminLeads />} />
                    <Route path="applications" element={<AdminApplications />} />
                    <Route path="listings" element={<AdminListings />} />
                    <Route path="settings" element={<AdminSettings />} />
                </Route>

                <Route path="*" element={<div className="min-h-screen bg-[#1a1a2e] text-white flex items-center justify-center text-4xl font-serif">404 - Room Not Found</div>} />
            </Routes>
        </Router>
    )
}

export default App
