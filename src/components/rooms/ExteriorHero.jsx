import React, { useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import ParticleSystem from '../three/ParticleSystem'
import gsap from 'gsap'

const ExteriorScene = () => {
    return null // Placeholder for actual 3D objects
}

const ExteriorHero = ({ isGateOpen }) => {
    useEffect(() => {
        if (!isGateOpen) return

        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ delay: 0.5 }) // 0.5s delay after gate opens
            tl.from(".exterior-title span", {
                opacity: 0,
                y: 80,
                stagger: 0.1,
                duration: 1.2,
                ease: "power3.out"
            })
                .from(".exterior-subtitle", {
                    opacity: 0, y: 40, duration: 1, ease: "power2.out"
                }, "-=0.8")
                .from(".exterior-cta-group", {
                    opacity: 0, y: 30, duration: 0.8, ease: "power2.out"
                }, "-=0.6")
                .from(".footstep-indicator", {
                    opacity: 0, duration: 0.6
                }, "-=0.3")
        });

            // Replace raw scroll event with optimized GSAP ScrollTrigger
            gsap.to(".layer-sky", {
                y: 100, // Roughly equivalent to previous var(--scroll-y) * 0.1
                ease: "none",
                scrollTrigger: {
                    trigger: "#exterior-room",
                    start: "top top",
                    end: "bottom top",
                    scrub: true
                }
            })
        });

        return () => {
            ctx.revert()
        }
    }, [isGateOpen])

    const scrollToSection = (id) => {
        const el = document.getElementById(id)
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const titleWords = ["नमस्ते,", "Step", "Inside."]

    return (
        <div className="room-section relative w-full h-screen bg-[#1a1a2e] overflow-hidden">
            {/* Three.js Background */}
            <div className="absolute inset-0 z-0">
                <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                    <fog attach="fog" args={['#1a1a2e', 8, 25]} />
                    <ambientLight intensity={0.3} color="#4466ff" />
                    <directionalLight intensity={1.2} color="#F59E0B" position={[5, 8, 3]} />
                    <pointLight position={[-3, 2, 2]} intensity={0.8} color="#FF8C00" />
                    <pointLight position={[3, 2, 2]} intensity={0.8} color="#FF8C00" />
                    <ParticleSystem count={300} color="#F59E0B" />
                    <ExteriorScene />
                </Canvas>
            </div>

            {/* Layer Parallax */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="layer-sky absolute inset-0 bg-cover bg-center border-b border-black/10 opacity-40 mix-blend-screen" style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop')"
                }}></div>
            </div>

            {/* Content */}
            <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
                <div className="bg-black/40 p-8 md:p-12 rounded-3xl backdrop-blur-md border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col items-center">
                    <h1 className="exterior-title text-4xl sm:text-5xl md:text-8xl font-serif text-white flex flex-wrap justify-center overflow-hidden pb-4 drop-shadow-2xl" itemProp="name">
                        {titleWords.map((word, index) => (
                            <span key={index} className="inline-block mr-4 md:mr-6 last:mr-0">{word}</span>
                        ))}
                    </h1>

                    <p className="exterior-subtitle text-lg sm:text-xl md:text-2xl text-white max-w-2xl mt-4 tracking-wide font-light drop-shadow-xl">
                        We design spaces that breathe, inspire, and elevate the human experience.
                    </p>

                    <div className="exterior-cta-group flex flex-col sm:flex-row gap-4 sm:gap-6 mt-8 sm:mt-10 w-full sm:w-auto">
                        <button
                            onClick={() => scrollToSection('living-room')}
                            className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#C9A84C] text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#1a1a2e] transition-all duration-300 font-bold tracking-widest text-sm backdrop-blur-sm shadow-xl cursor-pointer w-full sm:w-auto text-center"
                        >
                            VIEW OUR WORK
                        </button>
                        <button
                            onClick={() => scrollToSection('terrace-room')}
                            className="px-6 sm:px-8 py-3 sm:py-4 bg-[#C9A84C] text-[#1a1a2e] hover:bg-white transition-all duration-300 font-bold tracking-widest text-sm shadow-[0_0_20px_rgba(201,168,76,0.6)] cursor-pointer w-full sm:w-auto text-center"
                        >
                            START YOUR PROJECT
                        </button>
                    </div>
                </div>

                <div className="footstep-indicator absolute bottom-12 flex flex-col items-center gap-2 animate-pulse z-30">
                    <span className="text-white/50 text-xs tracking-[0.3em] uppercase">Scroll to Walk In</span>
                    <div className="w-px h-16 bg-gradient-to-b from-amber-500 to-transparent"></div>
                </div>
            </div>

            {/* Fade effect at the bottom to merge with next section seamlessly */}
            <div className="absolute bottom-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-[#140F0C] z-40 pointer-events-none"></div>
        </div>
    )
}

export default ExteriorHero
