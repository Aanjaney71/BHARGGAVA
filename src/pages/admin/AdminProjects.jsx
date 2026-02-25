import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react'

const AdminProjects = () => {
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchProjects()
    }, [])

    const fetchProjects = async () => {
        try {
            const { data } = await api.get('/api/projects?limit=50')
            setProjects(data.data)
        } catch (err) {
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full">
            <div className="flex justify-between items-end border-b border-gray-200 pb-6 mb-8 mt-4">
                <div>
                    <h1 className="text-3xl font-serif text-gray-900 mb-2">Projects</h1>
                    <p className="text-sm text-gray-500 tracking-wide">Manage your portfolio showcase</p>
                </div>
                <button className="bg-[#C9A84C] text-[#1a1a2e] px-6 py-3 rounded text-sm font-bold tracking-widest uppercase hover:bg-[#b0923f] transition-colors flex items-center gap-2 shadow-lg">
                    <Plus size={18} /> Add Project
                </button>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest">
                            <th className="p-4 font-medium border-b border-gray-200">Project</th>
                            <th className="p-4 font-medium border-b border-gray-200">Category</th>
                            <th className="p-4 font-medium border-b border-gray-200">City</th>
                            <th className="p-4 font-medium border-b border-gray-200">Status</th>
                            <th className="p-4 font-medium border-b border-gray-200 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan="5" className="p-8 text-center text-gray-400">Loading...</td></tr>
                        ) : projects.length === 0 ? (
                            <tr><td colSpan="5" className="p-8 text-center text-gray-400">No projects found. Add one.</td></tr>
                        ) : (
                            projects.map(p => (
                                <tr key={p._id} className="hover:bg-gray-50 transition-colors group">
                                    <td className="p-4 border-b border-gray-100 flex items-center gap-4">
                                        <div className="w-16 h-12 rounded overflow-hidden shadow-sm shrink-0">
                                            <img src={p.heroImage} className="w-full h-full object-cover" alt="" />
                                        </div>
                                        <div>
                                            <div className="font-serif font-bold text-gray-900">{p.title}</div>
                                            <div className="text-xs text-gray-400 font-mono mt-1">{p.year}</div>
                                        </div>
                                    </td>
                                    <td className="p-4 border-b border-gray-100 text-sm capitalize text-gray-600 font-medium">
                                        {p.category.replace('_', ' ')}
                                    </td>
                                    <td className="p-4 border-b border-gray-100 text-sm text-gray-600">{p.city}</td>
                                    <td className="p-4 border-b border-gray-100">
                                        <span className={`px-2 py-1 rounded text-[10px] uppercase tracking-widest font-bold ${p.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                            {p.isPublished ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="p-4 border-b border-gray-100 text-right space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button className="p-2 text-gray-400 hover:text-[#C9A84C] transition-colors"><Edit2 size={16} /></button>
                                        <button className="p-2 text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminProjects
