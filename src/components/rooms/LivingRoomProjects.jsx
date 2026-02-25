import React, { useRef, useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from '../ui/ProjectCard'

gsap.registerPlugin(ScrollTrigger)

const dummyProjects = [
    { slug: 'villa-1', title: 'The Glass Villa', city: 'Mumbai', year: 2023, category: 'residential', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800' },
    { slug: 'office-1', title: 'Tech Hub', city: 'Bangalore', year: 2022, category: 'commercial', img: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=800' },
    { slug: 'interior-1', title: 'Oasis Penthouse', city: 'Delhi', year: 2024, category: 'interior', img: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=800' },
    { slug: 'villa-2', title: 'Cliffside Home', city: 'Goa', year: 2021, category: 'residential', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800' },
    { slug: 'interior-2', title: 'Minimalist Loft', city: 'Pune', year: 2023, category: 'interior', img: 'https://images.unsplash.com/photo-1560448205-4d9b3e6bb6db?q=80&w=800' },
    { slug: 'commercial-2', title: 'The Vertex', city: 'Hyderabad', year: 2022, category: 'commercial', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800' }
]

const LivingRoomProjects = () => {
    const [filter, setFilter] = useState('all')
    const filteredProjects = filter === 'all'
        ? dummyProjects
        : dummyProjects.filter(p => p.category === filter)

    const leftWall = filteredProjects.slice(0, Math.ceil(filteredProjects.length / 2))
    const rightWall = filteredProjects.slice(Math.ceil(filteredProjects.length / 2))

    useEffect(() => {
        gsap.to(".left-wall-frames", {
            scrollTrigger: {
                trigger: "#living-room",
                start: "top center",
                end: "bottom center",
                scrub: 1.5
            },
            x: -250,
            ease: "none"
        })

        gsap.to(".right-wall-frames", {
            scrollTrigger: {
                trigger: "#living-room",
                start: "top center",
                end: "bottom center",
                scrub: 1.5
            },
            x: 250,
            ease: "none"
        })
    }, [])

    return (
        <div className="room-section living-section bg-[#18120A] text-[#f0ebe0] min-h-screen py-24 px-4 relative flex flex-col items-center">

            {/* Background Container */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="parallax-bg absolute inset-[-5%] bg-[url('/modern_kitchen.png')] bg-cover bg-center opacity-85"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/90"></div>
            </div>

            {/* Filter Switches */}
            <div className="sticky top-24 z-50 flex gap-4 mb-20 bg-[#18120A]/80 p-4 rounded-xl backdrop-blur-md border border-white/5 shadow-2xl">
                {['all', 'residential', 'commercial', 'interior'].map(f => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`filter-switch capitalize py-2 px-6 rounded text-sm tracking-wider font-medium transition-all ${filter === f ? 'bg-[#C9A84C] text-[#1a1a1a] shadow-[0_0_15px_rgba(201,168,76,0.4)]' : 'bg-[#2a2a2a] text-white/70 border border-[#444] hover:bg-[#333]'}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="w-full max-w-7xl relative grid grid-cols-2 gap-x-24 place-items-center">
                {/* Left Wall */}
                <div className="left-wall-frames w-full flex flex-col gap-32 items-end pr-12">
                    <AnimatePresence>
                        {leftWall.map((project, idx) => (
                            <motion.div
                                key={project.slug}
                                initial={{ opacity: 0, scale: 0.8, x: -50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: -50 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <ProjectCard project={project} side="left" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Right Wall */}
                <div className="right-wall-frames w-full flex flex-col gap-32 items-start pl-12 pt-32">
                    <AnimatePresence>
                        {rightWall.map((project, idx) => (
                            <motion.div
                                key={project.slug}
                                initial={{ opacity: 0, scale: 0.8, x: 50 }}
                                animate={{ opacity: 1, scale: 1, x: 0 }}
                                exit={{ opacity: 0, scale: 0.8, x: 50 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                            >
                                <ProjectCard project={project} side="right" />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default LivingRoomProjects
