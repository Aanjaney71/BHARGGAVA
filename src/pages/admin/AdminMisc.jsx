import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { FileDown, ExternalLink, Calendar, Plus, Trash2 } from 'lucide-react'

// Placeholder for now, can implement TipTap inside Blog
const AdminBlog = () => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-end border-b border-gray-200 pb-6 mb-8 mt-4">
                <div>
                    <h1 className="text-3xl font-serif text-gray-900 mb-2">Blog Posts</h1>
                    <p className="text-sm text-gray-500 tracking-wide">Manage editorial content</p>
                </div>
                <button className="bg-[#C9A84C] text-[#1a1a2e] px-6 py-3 rounded text-sm font-bold tracking-widest uppercase hover:bg-[#b0923f] transition-colors flex items-center gap-2 shadow-lg">
                    <Plus size={18} /> New Post
                </button>
            </div>

            <div className="bg-white text-gray-500 flex flex-col items-center justify-center p-16 rounded-xl border border-dashed border-gray-300">
                <FileDown size={48} className="opacity-20 mb-4" />
                <h3 className="font-serif text-xl mb-2 text-gray-800">No blog posts written yet</h3>
                <p>Click "New Post" to open the rich text editor and draft your first entry.</p>
            </div>
        </div>
    )
}

const AdminApplications = () => {
    return (
        <div className="w-full">
            <div className="border-b border-gray-200 pb-6 mb-8 mt-4">
                <h1 className="text-3xl font-serif text-gray-900 mb-2">Job Applications</h1>
                <p className="text-sm text-gray-500 tracking-wide">Review submitted resumes and portfolios</p>
            </div>

            <div className="bg-white text-gray-500 flex flex-col items-center justify-center p-16 rounded-xl border border-dashed border-gray-300">
                <Calendar size={48} className="opacity-20 mb-4" />
                <h3 className="font-serif text-xl mb-2 text-gray-800">No applications received</h3>
                <p>Ensure you have active career listings to receive applications.</p>
            </div>
        </div>
    )
}

const AdminListings = () => {
    return (
        <div className="w-full">
            <div className="flex justify-between items-end border-b border-gray-200 pb-6 mb-8 mt-4">
                <div>
                    <h1 className="text-3xl font-serif text-gray-900 mb-2">Career Listings</h1>
                    <p className="text-sm text-gray-500 tracking-wide">Manage open positions</p>
                </div>
                <button className="bg-[#1a1a2e] text-white px-6 py-3 rounded text-sm font-bold tracking-widest uppercase hover:bg-black transition-colors flex items-center gap-2 shadow-lg">
                    <Plus size={18} /> New Position
                </button>
            </div>

            <div className="bg-white text-gray-500 flex flex-col items-center justify-center p-16 rounded-xl border border-dashed border-gray-300">
                <h3 className="font-serif text-xl mb-2 text-gray-800">No active positions</h3>
            </div>
        </div>
    )
}

const AdminSettings = () => {
    return (
        <div className="w-full max-w-4xl">
            <div className="border-b border-gray-200 pb-6 mb-8 mt-4">
                <h1 className="text-3xl font-serif text-gray-900 mb-2">Site Settings</h1>
                <p className="text-sm text-gray-500 tracking-wide">Configure global website properties</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-8 flex flex-col gap-8">
                <div>
                    <h3 className="text-lg font-serif font-bold text-gray-800 mb-4">Studio Identity</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-500">Studio Name</label>
                            <input type="text" defaultValue="The Studio" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#C9A84C] bg-transparent" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-500">Contact Email</label>
                            <input type="email" defaultValue="hello@thestudio.com" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#C9A84C] bg-transparent" />
                        </div>
                    </div>
                </div>

                <div>
                    <h3 className="text-lg font-serif font-bold text-gray-800 mb-4">Social Links</h3>
                    <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-500">Instagram URL</label>
                            <input type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#C9A84C] bg-transparent" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs uppercase tracking-widest text-gray-500">LinkedIn URL</label>
                            <input type="text" className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-[#C9A84C] bg-transparent" />
                        </div>
                    </div>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex justify-end">
                    <button className="bg-[#C9A84C] text-[#1a1a2e] px-8 py-3 rounded font-bold tracking-widest uppercase hover:bg-[#b0923f] transition-colors shadow-lg">
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    )
}

export { AdminBlog, AdminApplications, AdminListings, AdminSettings }
