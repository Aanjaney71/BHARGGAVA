import React, { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const FoyerAbout = () => {

    useEffect(() => {
        const animateCounter = (el, target, duration) => {
            gsap.to({ val: 0 }, {
                val: target,
                duration: duration,
                ease: "power1.inOut",
                onUpdate: function () {
                    el.textContent = Math.round(this.targets()[0].val) + "+"
                }
            })
        }

        ScrollTrigger.create({
            trigger: ".stats-row",
            start: "top 75%",
            once: true,
            onEnter: () => {
                animateCounter(document.querySelector(".stat-projects"), 150, 2)
                animateCounter(document.querySelector(".stat-years"), 20, 2)
                animateCounter(document.querySelector(".stat-cities"), 30, 2)
            }
        })
    }, [])

    return (
        <div className="room-section foyer-wrapper-clean bg-[#1C1208] text-[#f5f0e8] py-24 px-8 md:px-12 relative min-h-screen flex items-center" style={{ filter: 'none' }}>

            {/* Background Image Container */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="parallax-bg absolute inset-[-5%] bg-[url('/grand_foyer.png')] bg-cover bg-center opacity-80"></div>
                {/* Fixed standard gradient to ensure text readability */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/80"></div>
            </div>

            <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left Column */}
                <div className="flex flex-col gap-8 order-2 lg:order-1 drop-shadow-[0_20px_40px_rgba(0,0,0,0.8)] p-8">
                    <div className="portrait-frame relative overflow-hidden transition-all duration-700 w-full max-w-md mx-auto aspect-[3/4]">
                        <div className="absolute inset-0 border-[3px] border-transparent" style={{
                            background: 'linear-gradient(#1a1a1a, #1a1a1a) padding-box, linear-gradient(145deg, #8B6914, #C9A84C, #8B6914) border-box',
                            padding: '16px',
                            boxShadow: '0 0 0 1px rgba(201,168,76,0.3), 0 30px 80px rgba(0,0,0,0.5), inset 0 0 20px rgba(0,0,0,0.3)'
                        }}>
                            <img
                                src="/architect_portrait.png"
                                alt="Architect Portrait"
                                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 pointer-events-auto filter"
                            />
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="flex flex-col justify-center">
                    <div className="w-16 h-0.5 bg-gradient-to-r from-[#8B6914] via-[#C9A84C] to-[#8B6914] mb-8"></div>
                    <h2 className="text-4xl md:text-5xl font-serif text-white opacity-90 drop-shadow-md">
                        You Have Arrived.
                    </h2>

                    <div className="space-y-6 text-lg text-[#f5f0e8]/90 leading-relaxed font-light font-serif drop-shadow-md">
                        <p>A true architectural masterpiece reveals itself the moment you cross the threshold. The Grand Foyer sets the tone for your entire home.</p>
                        <p>At <strong className="text-[#C9A84C] font-semibold tracking-wide">Shree Bhargava & Associate</strong>, we design entrances to take your breath away—seamlessly blending sweeping marble floors, a cascading crystal chandelier, and soaring double-height ceilings to create maximum visual impact.</p>
                        <p>Step inside, feel the luxury, and let our architecture speak for itself.</p>
                        <p className="italic text-[#C9A84C] font-semibold mt-8 text-xl">Welcome to our Architectural Studio in Indore. Welcome home.</p>
                    </div>

                    <div className="h-px w-full bg-white/10 my-12"></div>

                    {/* Stats */}
                    <div className="stats-row flex flex-wrap justify-between md:justify-start gap-y-6 md:gap-x-24 uppercase tracking-[0.2em] text-sm">
                        <div className="flex flex-col gap-2">
                            <span className="stat-projects text-4xl font-serif text-[#C9A84C]">0</span>
                            <span className="text-white/50">Projects</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="stat-years text-4xl font-serif text-[#C9A84C]">0</span>
                            <span className="text-white/50">Years</span>
                        </div>
                        <div className="flex flex-col gap-2">
                            <span className="stat-cities text-4xl font-serif text-[#C9A84C]">0</span>
                            <span className="text-white/50">Cities</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default FoyerAbout
