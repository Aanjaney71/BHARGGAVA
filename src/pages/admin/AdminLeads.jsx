import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { Mail, Phone, Trash2, CheckSquare, Square } from 'lucide-react'

const AdminLeads = () => {
    const [leads, setLeads] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        // Simulated fetch call
        setTimeout(() => {
            setLeads([
                { _id: '1', name: 'John Doe', email: 'john@example.com', phone: '+123456789', status: 'new', projectPreferences: { type: 'Residential', budget: '10M-20M', timeline: '6 months' }, createdAt: new Date().toISOString() },
                { _id: '2', name: 'Jane Smith', email: 'jane@example.com', phone: '+987654321', status: 'contacted', projectPreferences: { type: 'Commercial', budget: '50M+', timeline: 'ASAP' }, createdAt: new Date(Date.now() - 86400000).toISOString() }
            ])
            setLoading(false)
        }, 800)
    }, [])

    return (
        <div className="w-full">
            <div className="border-b border-gray-200 pb-6 mb-8 mt-4">
                <h1 className="text-3xl font-serif text-gray-900 mb-2">Contact Leads</h1>
                <p className="text-sm text-gray-500 tracking-wide">Manage prospective clients and inquiries</p>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 text-gray-500 text-xs uppercase tracking-widest">
                            <th className="p-4 font-medium border-b border-gray-200 w-12 text-center text-gray-300"><CheckSquare size={16} /></th>
                            <th className="p-4 font-medium border-b border-gray-200">Client Info</th>
                            <th className="p-4 font-medium border-b border-gray-200">Project Interests</th>
                            <th className="p-4 font-medium border-b border-gray-200">Status</th>
                            <th className="p-4 font-medium border-b border-gray-200 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? <tr><td colSpan="5" className="p-8 text-center text-gray-400">Loading leads...</td></tr> :
                            leads.length === 0 ? <tr><td colSpan="5" className="p-8 text-center text-gray-400">No leads found.</td></tr> :
                                leads.map(l => (
                                    <tr key={l._id} className="hover:bg-gray-50 transition-colors group">
                                        <td className="p-4 border-b border-gray-100 text-center text-gray-300"><Square size={16} /></td>
                                        <td className="p-4 border-b border-gray-100">
                                            <div className="font-bold text-gray-900">{l.name}</div>
                                            <div className="flex gap-3 text-xs text-gray-500 mt-2 font-mono">
                                                <a href={`mailto:${l.email}`} className="hover:text-[#C9A84C] flex items-center gap-1"><Mail size={12} />{l.email}</a>
                                                <a href={`tel:${l.phone}`} className="hover:text-[#C9A84C] flex items-center gap-1"><Phone size={12} />{l.phone}</a>
                                            </div>
                                        </td>
                                        <td className="p-4 border-b border-gray-100">
                                            <ul className="text-sm text-gray-600 list-disc list-inside">
                                                <li>Type: {l.projectPreferences.type}</li>
                                                <li>Budget: {l.projectPreferences.budget}</li>
                                                <li>Timing: {l.projectPreferences.timeline}</li>
                                            </ul>
                                        </td>
                                        <td className="p-4 border-b border-gray-100">
                                            <select
                                                className={`text-xs uppercase tracking-widest font-bold border-none bg-transparent focus:ring-0 cursor-pointer 
                                    ${l.status === 'new' ? 'text-blue-600' : l.status === 'contacted' ? 'text-amber-600' : 'text-green-600'}
                                `}
                                                defaultValue={l.status}
                                            >
                                                <option value="new">New</option>
                                                <option value="contacted">Contacted</option>
                                                <option value="qualified">Qualified</option>
                                                <option value="lost">Lost</option>
                                            </select>
                                        </td>
                                        <td className="p-4 border-b border-gray-100 text-right opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-white rounded shadow-sm border border-gray-200 ml-2">
                                                <Trash2 size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default AdminLeads
