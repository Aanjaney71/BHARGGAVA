import React, { useEffect } from 'react'
import { Outlet, Navigate, NavLink, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { LayoutDashboard, Image as ImageIcon, Star, FileText, Users, Briefcase, Settings, LogOut } from 'lucide-react'

const AdminSidebar = () => {
    const logout = useAuthStore(state => state.logout)
    const navigate = useNavigate()

    const navItems = [
        { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Overview' },
        { to: '/admin/projects', icon: <ImageIcon size={20} />, label: 'Projects' },
        { to: '/admin/reviews', icon: <Star size={20} />, label: 'Reviews' },
        { to: '/admin/blog', icon: <FileText size={20} />, label: 'Blog Posts' },
        { to: '/admin/leads', icon: <Users size={20} />, label: 'Leads' },
        { to: '/admin/applications', icon: <Briefcase size={20} />, label: 'Applications' },
        { to: '/admin/listings', icon: <Briefcase size={20} />, label: 'Career Listings' },
        { to: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' }
    ]

    const handleLogout = () => {
        logout()
        navigate('/admin/login')
    }

    return (
        <div className="w-64 bg-[#1a1a2e] text-white min-h-screen flex flex-col fixed left-0 top-0 border-r border-white/10 shrink-0 shadow-2xl z-[100]">
            <div className="p-8 pb-4">
                <h2 className="font-serif text-2xl tracking-widest text-[#C9A84C]">STUDIO</h2>
                <p className="text-xs tracking-[0.2em] text-white/50 uppercase mt-1">Admin Panel</p>
            </div>

            <div className="flex-1 flex flex-col gap-2 p-4 mt-8">
                {navItems.map(item => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        className={({ isActive }) => `
              flex items-center gap-4 px-4 py-3 rounded text-sm tracking-wider font-medium transition-colors
              ${isActive ? 'bg-[#C9A84C] text-[#1a1a2e]' : 'text-white/70 hover:bg-white/10 hover:text-white'}
            `}
                    >
                        {item.icon} {item.label}
                    </NavLink>
                ))}
            </div>

            <div className="p-4 mt-auto">
                <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-4 px-4 py-3 rounded text-sm tracking-wider font-medium text-red-400 hover:bg-red-400/10 transition-colors"
                >
                    <LogOut size={20} /> Logout
                </button>
            </div>
        </div>
    )
}

const AdminLayout = () => {
    const { isAuthenticated, isLoading, checkAuth } = useAuthStore()

    useEffect(() => {
        checkAuth()
    }, [checkAuth])

    if (isLoading) {
        return <div className="min-h-screen bg-[#111] flex items-center justify-center text-white">Loading...</div>
    }

    if (!isAuthenticated) {
        return <Navigate to="/admin/login" />
    }

    return (
        <div className="flex min-h-screen bg-[#111] font-sans">
            <AdminSidebar />
            <div className="flex-1 ml-64 bg-gray-50 min-h-screen">
                <div className="p-8 md:p-12 w-full max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default AdminLayout
