import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const HallwayWalk = () => {
    const hallwayRef = useRef()

    useEffect(() => {
        gsap.to(".hallway-inner", {
            scrollTrigger: {
                trigger: ".hallway-transition",
                start: "top bottom",
                end: "bottom top",
                scrub: 2
            },
            scale: 1.7,
            ease: "none"
        })

        gsap.to(".left-frames", {
            scrollTrigger: { trigger: ".hallway-transition", scrub: 1.5 },
            x: -200, ease: "none"
        })

        gsap.to(".right-frames", {
            scrollTrigger: { trigger: ".hallway-transition", scrub: 1.5 },
            x: 200, ease: "none"
        })
    }, [])

    return (
        <div className="hallway-transition w-full bg-transparent relative overflow-hidden h-[50vh]" ref={hallwayRef}>
            <div className="absolute inset-0 bg-black/60 z-10 pointer-events-none"></div>
            <div className="hallway-inner absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen bg-[url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2000&auto=format&fit=crop')]">
                <div className="wall-frames left-frames z-20 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-32 h-48 bg-gray-300 border-[8px] border-[#8B6914] shadow-2xl skew-y-3 skew-x-2"></div>
                    ))}
                </div>
                <div className="wall-frames right-frames z-20 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-32 h-48 bg-gray-300 border-[8px] border-[#8B6914] shadow-2xl -skew-y-3 -skew-x-2"></div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HallwayWalk
