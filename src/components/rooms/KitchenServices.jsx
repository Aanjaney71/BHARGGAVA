import React, { useEffect, useMemo } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CostCalculator from '../ui/CostCalculator'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const faqs = [
    { q: "How long does a residential project take?", a: "Typically 6-12 months from conceptualization to handover, depending on scale and finishing details." },
    { q: "Do you handle approvals and permits?", a: "Yes, our team handles all liaison work with local authorities to ensure full compliance before construction." },
    { q: "Can I bring my own contractors?", a: "We prefer to work with our trusted execution partners to guarantee quality, but we are open to collaborating if they meet our standards." },
    { q: "What is your consultation fee?", a: "The initial meeting is complementary. Following this, we charge a flat fee for the design concept, which adjusts into the overall project cost." }
]

// Static rotation values computed once — prevents re-render jank from Math.random() in render
const PROCESS_STEPS = [
    { label: 'Consultation', rot: -3 },
    { label: 'Concept', rot: 2 },
    { label: 'Approval', rot: -1.5 },
    { label: 'Build', rot: 3 },
    { label: 'Handover', rot: -2 }
]

const AccordionItem = ({ q, a }) => {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
        <div className="border-b border-[#2d3a1e]/20">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 sm:py-6 text-left group"
                aria-expanded={isOpen}
            >
                <span className="font-serif text-[#1a1a1a] text-base sm:text-xl group-hover:text-[#8B6914] transition-colors pr-4">{q}</span>
                <motion.div animate={{ rotate: isOpen ? 45 : 0 }} className="text-[#8B6914] shrink-0">
                    <Plus />
                </motion.div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                    >
                        <p className="pb-6 text-gray-600 leading-relaxed max-w-3xl pr-4 sm:pr-8 text-sm sm:text-base">{a}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

const KitchenServices = () => {

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from(".service-item-1", {
                scrollTrigger: { trigger: ".counter-section", start: "top 60%" },
                x: -100, opacity: 0, duration: 0.8, ease: "back.out(1.7)"
            })
            gsap.from(".service-item-2", {
                scrollTrigger: { trigger: ".counter-section", start: "top 55%" },
                x: 100, opacity: 0, duration: 0.8, ease: "back.out(1.7)"
            })
        });
        return () => ctx.revert()
    }, [])

    return (
        <div className="room-section kitchen-section bg-[#F8F6F0] text-[#1a1a1a] relative flex flex-col py-12 sm:py-16 px-4 w-full h-auto min-h-screen z-10">
            {/* Background Container */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="parallax-bg absolute inset-[-5%] bg-[url('/kitchen_studio.png')] bg-cover bg-center opacity-[0.85]"></div>
                <div className="absolute inset-0 bg-white/70"></div>
            </div>

            {/* Blackboard Heading */}
            <div className="max-w-4xl mx-auto flex justify-center mb-10 sm:mb-16 z-10 relative px-4">
                <div className="blackboard-heading bg-[#2d3a1e] border-4 border-[#4a5a2a] p-6 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rotate-[-1deg]">
                    <h2 className="font-['Caveat',_cursive] text-2xl sm:text-4xl md:text-6xl text-[#f5f0e8] shadow-black drop-shadow-md text-center">
                        Every Masterpiece Starts in the Workshop
                    </h2>
                </div>
            </div>

            {/* Counter Services Section */}
            <div className="counter-section relative flex justify-center items-end py-10 sm:py-16 mb-10 sm:mb-16 max-w-7xl mx-auto w-full">
                {/* Counter Illustration Top Edge */}
                <div className="absolute bottom-0 w-full h-1/2 bg-[url('https://images.unsplash.com/photo-1556910103-1c02745a8e32?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center rounded-t-[50px] shadow-inner opacity-40 mix-blend-multiply"></div>
                <div className="absolute bottom-0 w-full h-2 bg-gradient-to-r from-gray-300 via-white to-gray-300 rounded-t-full shadow-[0_-1px_10px_rgba(0,0,0,0.1)]"></div>

                <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 relative z-20 pb-10 sm:pb-16 justify-center w-full px-4 sm:px-8">
                    {[
                        { id: 1, title: "Architecture", icon: "🏛️", desc: "Master planning & structural design that stands the test of time." },
                        { id: 2, title: "Interior Design", icon: "🛋️", desc: "Curated furniture, lighting, and materials that tell your story." }
                    ].map(service => (
                        <div key={service.id} className={`service-item-${service.id} bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded shadow-2xl max-w-sm w-full mx-auto sm:mx-0 group transition-all duration-300 hover:-translate-y-4 hover:shadow-[0_20px_40px_rgba(201,168,76,0.5)] relative z-10 border border-black/5`}>
                            <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{service.icon}</div>
                            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3">{service.title}</h3>
                            <p className="text-gray-500 mb-6 text-sm sm:text-base">{service.desc}</p>
                            <button onClick={(e) => { e.preventDefault(); document.getElementById('terrace-room')?.scrollIntoView({ behavior: 'smooth' }); }} className="text-[#8B6914] flex items-center gap-2 text-sm uppercase tracking-widest font-bold group-hover:gap-4 transition-all cursor-pointer bg-transparent border-0 p-0 text-left">
                                Learn More <span>→</span>
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* How We Work — with pre-computed static rotations */}
            <div className="w-full relative mb-10 sm:mb-16 py-10 sm:py-16 text-center border-y-[20px] border-[#8B4513] z-10 bg-[#e0dacc]">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542841791-1927b35371bb?q=80&w=2000&auto=format&fit=crop')] opacity-40 mix-blend-multiply pointer-events-none"></div>
                <h3 className="text-3xl sm:text-4xl font-serif text-[#1a1a1a] mb-8 sm:mb-12 relative z-10 drop-shadow-md bg-white/60 inline-block px-6 sm:px-12 py-3 sm:py-4 shadow-xl -rotate-1">How We Work</h3>

                <div className="flex flex-wrap justify-center gap-6 sm:gap-8 relative z-10 px-4 max-w-6xl mx-auto">
                    {PROCESS_STEPS.map((step, idx) => (
                        <div
                            key={step.label}
                            className="bg-[#fff9e6] p-5 sm:p-6 shadow-xl w-36 sm:w-48 aspect-square relative flex items-center justify-center border border-yellow-200/50 hover:z-50 hover:scale-110 transition-transform duration-300"
                            style={{ transform: `rotate(${step.rot}deg)` }}
                        >
                            {/* Thumbtack */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-600 shadow-md">
                                <div className="w-1 h-1 bg-white/50 rounded-full ml-0.5 mt-0.5"></div>
                            </div>
                            <div className="text-xl sm:text-2xl font-['Caveat',_cursive] font-bold text-gray-800">
                                <span className="text-xs text-gray-400 block mb-2">{idx + 1}.</span>
                                {step.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Cost Calculator Section */}
            <div className="relative z-10 mb-10 sm:mb-16 px-2">
                <CostCalculator />
            </div>

            {/* FAQ Accordion Section */}
            <div className="max-w-4xl mx-auto w-full mb-10 sm:mb-16 relative z-10 px-2">
                <h3 className="text-3xl sm:text-4xl font-serif mb-8 sm:mb-12 text-center text-[#1a1a1a] drop-shadow-md bg-white/60 inline-block px-6 sm:px-12 py-3 sm:py-4 shadow-xl -rotate-1 mx-auto max-w-max block">Common Questions</h3>
                <div className="bg-white/80 backdrop-blur-xl border border-black/5 rounded-2xl p-6 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.1)]">
                    {faqs.map((faq, i) => <AccordionItem key={i} q={faq.q} a={faq.a} />)}
                </div>
            </div>

        </div>
    )
}

export default KitchenServices
