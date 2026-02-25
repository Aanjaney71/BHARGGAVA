import { create } from 'zustand'
import api from '../utils/api'

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    login: async (email, password) => {
        try {
            const res = await api.post('/api/auth/login', { email, password })
            localStorage.setItem('adminToken', res.data.token)
            set({ user: res.data.user, isAuthenticated: true })
            return { success: true }
        } catch (error) {
            return { success: false, message: error.response?.data?.message || 'Login failed' }
        }
    },
    logout: () => {
        localStorage.removeItem('adminToken')
        set({ user: null, isAuthenticated: false })
    },
    checkAuth: async () => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            set({ isLoading: false, isAuthenticated: false })
            return
        }

        try {
            const res = await api.get('/api/auth/me')
            set({ user: res.data.user, isAuthenticated: true, isLoading: false })
        } catch (error) {
            localStorage.removeItem('adminToken')
            set({ user: null, isAuthenticated: false, isLoading: false })
        }
    }
}))
