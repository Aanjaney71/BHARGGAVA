import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { toast } from 'react-hot-toast'
import { Lock } from 'lucide-react'

const AdminLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const login = useAuthStore(state => state.login)
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        const res = await login(email, password)
        setLoading(false)
        if (res.success) {
            toast.success('Welcome back!')
            navigate('/admin/dashboard')
        } else {
            toast.error(res.message)
        }
    }

    return (
        <div className="min-h-screen bg-[#1a1a2e] flex items-center justify-center p-4">
            <div className="bg-[#16213e] p-12 rounded-2xl shadow-2xl w-full max-w-md border border-white/5 relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#C9A84C] p-4 rounded-full shadow-[0_0_20px_rgba(201,168,76,0.4)]">
                    <Lock className="text-[#1a1a2e] w-8 h-8" />
                </div>

                <h2 className="text-3xl font-serif text-white text-center mb-2 mt-8">Studio Admin</h2>
                <p className="text-white/50 text-center mb-8 tracking-widest text-sm uppercase">Authorized Personnel Only</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-white/50 font-medium">Email Address</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                            autoComplete="email"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-white/50 font-medium">Password</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-black/30 border border-white/10 rounded px-4 py-3 text-white focus:outline-none focus:border-[#C9A84C] transition-colors"
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-6 w-full bg-[#C9A84C] text-[#1a1a2e] py-4 rounded font-bold tracking-widest hover:bg-white transition-colors duration-300 disabled:opacity-50"
                    >
                        {loading ? 'AUTHENTICATING...' : 'SECURE LOGIN'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AdminLogin
