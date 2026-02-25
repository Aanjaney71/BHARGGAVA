import React, { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'

const ProjectCard = ({ project, side }) => {
    const navigate = useNavigate()
    const frameRef = useRef()

    const handleFrameClick = () => {
        // Animation before navigate
        gsap.to(frameRef.current, {
            scale: 1.15,
            z: 200,
            rotateY: 0,
            duration: 0.4,
            ease: "power2.out",
            onComplete: () => navigate(`/projects/${project.slug}`)
        })
    }

    return (
        <div className="flex flex-col items-center group cursor-pointer" onClick={handleFrameClick}>
            {/* Light above frame */}
            <div className="w-12 h-2 rounded-full bg-gradient-to-b from-[#FFF2D8] to-[#FFE4B5] shadow-[0_10px_30px_10px_rgba(255,228,181,0.4)] mb-8 opacity-60 group-hover:opacity-100 transition-opacity"></div>

            {/* Frame */}
            <div
                ref={frameRef}
                className={`project-frame w-[300px] sm:w-[400px] lg:w-[450px] aspect-[4/3] p-4 relative transition-all duration-500 transform-gpu
        `}
                style={{
                    background: 'linear-gradient(145deg, #6B4C10, #8B6914, #C9A84C, #8B6914, #6B4C10)',
                    boxShadow: 'inset 0 0 15px rgba(0,0,0,0.6), inset 0 0 5px rgba(201,168,76,0.2), 0 25px 70px rgba(0,0,0,0.5), 0 0 0 1px rgba(107,76,16,0.8)'
                }}
            >
                <div className="w-full h-full overflow-hidden bg-black outline outline-1 outline-black/50 shadow-inner">
                    <img
                        src={project.img}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                </div>

                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none mix-blend-overlay"></div>
            </div>

            {/* Nameplate */}
            <div className="nameplate mt-6 bg-gradient-to-r from-[#8B6914] via-[#C9A84C] to-[#8B6914] text-[#1a1a1a] font-serif text-[11px] tracking-[0.2em] uppercase px-8 py-2 rounded shadow-lg translate-y-2 group-hover:translate-y-0 transition-transform">
                {project.title} | {project.city} | {project.year}
            </div>
        </div>
    )
}

export default ProjectCard
