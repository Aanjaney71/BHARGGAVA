import React, { useEffect, useState } from 'react'
import api from '../../utils/api'
import { CheckCircle, XCircle, Trash2 } from 'lucide-react'

const AdminReviews = () => {
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => { fetchReviews() }, [])

    const fetchReviews = async () => {
        try {
            const { data } = await api.get('/api/reviews?status=pending')
            // Note: Endpoint usually only returns approved ones if unauthenticated, 
            // an admin endpoint should return all, we assume this does or we have a specific admin route.
            // For this mock, we just use the data
            setReviews(data.data || [])
        } catch (err) { console.error(err) } finally { setLoading(false) }
    }

    return (
        <div className="w-full">
            <div className="border-b border-gray-200 pb-6 mb-8 mt-4">
                <h1 className="text-3xl font-serif text-gray-900 mb-2">Pending Reviews</h1>
                <p className="text-sm text-gray-500 tracking-wide">Review and approve client testimonials</p>
            </div>

            <div className="space-y-4">
                {loading ? <p className="text-gray-400 p-8 text-center bg-white rounded-xl border border-gray-200 shadow-sm">Loading reviews...</p>
                    : reviews.length === 0 ? <p className="text-gray-400 p-8 text-center bg-white rounded-xl border border-gray-200 shadow-sm">No pending reviews.</p>
                        : reviews.map((r, i) => (
                            <div key={r._id || i} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start justify-between gap-6 group hover:shadow-md transition-shadow">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="font-bold text-gray-900">{r.clientName}</span>
                                        <span className="text-xs text-gray-400 uppercase tracking-widest px-2 py-0.5 border border-gray-200 rounded">{r.rating} Stars</span>
                                    </div>
                                    <p className="text-gray-600 font-serif italic mb-4">"{r.reviewText}"</p>
                                    <div className="text-xs font-mono text-gray-400 flex items-center gap-4">
                                        <span>Project Ref: {r.projectRef || 'N/A'}</span>
                                        <span>Date: {new Date(r.createdAt).toLocaleDateString()}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 shrink-0 opacity-50 group-hover:opacity-100 transition-opacity">
                                    <button className="flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 hover:bg-green-100 rounded text-sm font-medium transition-colors">
                                        <CheckCircle size={16} /> Approve
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-700 hover:bg-red-100 rounded text-sm font-medium transition-colors">
                                        <XCircle size={16} /> Reject
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded text-sm font-medium transition-colors">
                                        <Trash2 size={16} /> Delete
                                    </button>
                                </div>
                            </div>
                        ))}
            </div>
        </div>
    )
}

export default AdminReviews
