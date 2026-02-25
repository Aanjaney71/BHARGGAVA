import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const StaircaseTransition = () => {
    const stairsRef = useRef()

    useEffect(() => {
        gsap.to(".staircase-img", {
            scrollTrigger: {
                trigger: ".staircase-transition",
                start: "top bottom",
                end: "bottom top",
                scrub: 2
            },
            y: -120,
            scale: 1.3,
            ease: "none"
        })

        gsap.to(".ceiling-lights", {
            scrollTrigger: { scrub: 1.5 },
            y: 180,
            ease: "none"
        })
    }, [])

    return (
        <div className="staircase-transition bg-transparent w-full overflow-hidden relative min-h-[50vh] flex items-center justify-center" ref={stairsRef}>
            <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none"></div>
            <img
                className="staircase-img select-none absolute object-cover opacity-20 mix-blend-screen w-full h-full"
                src="https://images.unsplash.com/photo-1549488344-c6b738cfb274?q=80&w=2000&auto=format&fit=crop"
                alt="stairway looking up"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none z-10"></div>

            <div className="ceiling-lights z-20">
                {[1, 2, 3, 4, 5].map(i => <div className="ceiling-light shadow-[0_0_20px_10px_rgba(255,228,181,0.4)]" key={i} />)}
            </div>

            {/* Vignette */}
            <div className="stair-vignette absolute inset-0 pointer-events-none mix-blend-multiply" style={{
                background: 'radial-gradient(circle, transparent 40%, #0F0A14 100%)'
            }}></div>
        </div>
    )
}

export default StaircaseTransition
