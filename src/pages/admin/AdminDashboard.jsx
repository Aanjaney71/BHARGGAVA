import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Users, FileText, Briefcase, Star, Clock } from 'lucide-react'

// Dummy data for chart if api fails or is empty initially
const dummyData = [
    { name: 'Jan', leads: 4 },
    { name: 'Feb', leads: 7 },
    { name: 'Mar', leads: 5 },
    { name: 'Apr', leads: 12 },
    { name: 'May', leads: 15 },
    { name: 'Jun', leads: 10 },
    { name: 'Jul', leads: 22 }
]

const StatCard = ({ title, value, color, icon }) => (
    <div className={`p-6 rounded-xl border border-gray-200 bg-white shadow-sm flex items-start justify-between relative overflow-hidden group hover:scale-[1.02] transition-transform`}>
        <div className={`absolute -right-4 -top-4 w-24 h-24 rounded-full opacity-10 ${color}`}></div>
        <div>
            <h3 className="text-gray-500 font-medium text-sm tracking-wide mb-1 uppercase">{title}</h3>
            <p className="text-4xl font-serif font-bold text-gray-900">{value}</p>
        </div>
        <div className={`p-3 rounded-lg ${color} text-white shadow-md`}>
            {icon}
        </div>
    </div>
)

const AdminDashboard = () => {
    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const { data } = await api.get('/api/admin/stats')
                setStats(data.data)
            } catch (error) {
                console.error('Failed to fetch stats')
            } finally {
                setLoading(false)
            }
        }
        fetchStats()
    }, [])

    if (loading) return <div className="p-8">Loading dashboard metrics...</div>

    return (
        <div className="w-full">
            <h1 className="text-3xl font-serif text-gray-900 mb-2">Studio Overview</h1>
            <p className="text-gray-500 mb-8 tracking-wide">Welcome back. Here is what is happening today.</p>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <StatCard title="Total Projects" value={stats?.totalProjects || 0} color="bg-blue-600" icon={<Briefcase size={20} />} />
                <StatCard title="New Leads (This Week)" value={stats?.newLeads || 0} color="bg-green-600" icon={<Users size={20} />} />
                <StatCard title="Pending Reviews" value={stats?.pendingReviews || 0} color="bg-amber-500" icon={<Star size={20} />} />
                <StatCard title="Job Applications" value={stats?.newApplications || 0} color="bg-purple-600" icon={<FileText size={20} />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart */}
                <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="font-serif text-xl mb-6 text-gray-800">New Inquiries Trend</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={dummyData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#C9A84C" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#C9A84C" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="leads" stroke="#C9A84C" strokeWidth={3} fillOpacity={1} fill="url(#colorLeads)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                    <h3 className="font-serif text-xl mb-6 text-gray-800">Top Projects</h3>
                    <div className="space-y-6">
                        {(stats?.topProjects || []).length > 0 ? stats.topProjects.map((p, i) => (
                            <div key={p._id} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center font-serif text-[#C9A84C] text-lg font-bold shrink-0">
                                    {i + 1}
                                </div>
                                <div>
                                    <h4 className="font-medium text-gray-900 leading-tight">{p.title}</h4>
                                    <p className="text-xs text-gray-500 uppercase mt-1 tracking-wider">{p.category} | {p.viewCount} Views</p>
                                </div>
                            </div>
                        )) : (
                            <div className="text-center text-gray-400 py-8 flex flex-col items-center">
                                <Clock className="w-8 h-8 opacity-20 mb-2" />
                                <p>No project data available.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard
