import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        // Split heavy libraries into separate chunks for better caching and parallel loading
        rollupOptions: {
            output: {
                manualChunks: {
                    // Three.js is ~600KB — separate chunk avoids blocking initial paint
                    'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
                    // Animation libraries grouped together
                    'animation-vendor': ['gsap', 'framer-motion'],
                    // React core
                    'react-vendor': ['react', 'react-dom', 'react-router-dom'],
                }
            }
        },
        // Increase chunk size warning limit slightly for 3D scene assets
        chunkSizeWarningLimit: 800,
    },
})
