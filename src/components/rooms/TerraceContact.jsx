import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react'
import api from '../../utils/api'

gsap.registerPlugin(ScrollTrigger)

// Pre-computed star positions for the terrace starfield — static to avoid re-render
const TERRACE_STARS = Array.from({ length: 50 }, (_, i) => ({
    top: `${(i * 13 + 5) % 52}%`,
    left: `${(i * 37 + 11) % 100}%`,
    scale: 0.5 + (i % 4) * 0.25,
    animDuration: `${2 + (i % 3)}s`,
    animDelay: `${(i * 0.12) % 3}s`,
    dim: i % 3 === 0
}))

// Pre-computed fairy light positions
const FAIRY_LIGHTS = Array.from({ length: 20 }, (_, i) => ({
    cx: i * 100 + 50,
    cy: i % 2 === 0 ? 80 : 100,
    delay: `${i * 0.1}s`
}))

const TerraceContact = () => {

    const [isSubmitted, setSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        projectType: '',
        description: ''
    })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        // Stars now use CSS animation — no GSAP repeat tweens needed
        // Only animate clouds with a subtle, non-repeating drift
        gsap.to(".cloud-1", {
            x: 40, duration: 8, repeat: -1, yoyo: true, ease: "sine.inOut"
        })
        gsap.to(".cloud-2", {
            x: -30, duration: 10, repeat: -1, yoyo: true, ease: "sine.inOut"
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/api/contact', formData)
            gsap.to(".paper-plane", {
                x: window.innerWidth,
                y: -300,
                rotation: 45,
                duration: 1.5,
                ease: "power1.in",
                onComplete: () => {
                    setSubmitted(true)
                    setFormData({ name: '', email: '', phone: '', projectType: '', description: '' })
                }
            })
        } catch (error) {
            console.error("Submission failed", error)
            alert("Sorry, something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    return (
        <div className="room-section terrace-section bg-transparent min-h-screen relative overflow-hidden text-[#fff0e8] py-12 sm:py-16 px-4 flex flex-col justify-center w-full z-10">

            {/* Background Container */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="parallax-bg absolute inset-[-5%] bg-[url('/luxury_contact_terrace.png')] bg-cover bg-center opacity-85"></div>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-transparent h-1/2"></div>
            </div>

            {/* CSS-animated stars — replaces GSAP repeat:-1 tweens (much lighter) */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {TERRACE_STARS.map((star, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: `${2 * star.scale}px`,
                            height: `${2 * star.scale}px`,
                            opacity: star.dim ? 0.2 : 0.6,
                            animation: `starTwinkle ${star.animDuration} ease-in-out ${star.animDelay} infinite`
                        }}
                    />
                ))}
            </div>

            {/* Clouds */}
            <div className="cloud-1 absolute top-20 left-0 w-[400px] sm:w-[800px] h-64 bg-white/5 blur-3xl rounded-[100%] mix-blend-overlay pointer-events-none"></div>
            <div className="cloud-2 absolute top-40 right-10 w-[300px] sm:w-[600px] h-48 bg-[#F97316]/10 blur-3xl rounded-[100%] mix-blend-overlay pointer-events-none"></div>

            {/* Fairy string lights — responsive, no overflow */}
            <div className="absolute top-0 left-0 w-full h-[100px] pointer-events-none z-10 overflow-hidden">
                <svg width="100%" height="150" className="absolute top-0 left-0 drop-shadow-[0_0_8px_#F59E0B]" preserveAspectRatio="none">
                    <path d="M 0 50 Q 250 150 500 50 T 1000 50 T 1500 50 T 2000 50" fill="transparent" stroke="#222" strokeWidth="1" />
                    {FAIRY_LIGHTS.map((light, i) => (
                        <circle
                            key={i}
                            cx={light.cx}
                            cy={light.cy}
                            r="4"
                            fill="#F59E0B"
                            style={{ animation: `starTwinkle 2s ease-in-out ${light.delay} infinite` }}
                        />
                    ))}
                </svg>
            </div>

            {/* Header content */}
            <div className="relative z-20 flex flex-col items-center text-center mt-12 sm:mt-16 max-w-4xl mx-auto mb-10 sm:mb-16 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)] px-4">
                <div className="relative mb-6">
                    {/* Teacup SVG */}
                    <svg width="60" height="60" viewBox="0 0 100 100" fill="none" className="drop-shadow-lg mx-auto mb-4 sm:w-20 sm:h-20">
                        <path d="M25 60 C25 80, 75 80, 75 60 L75 40 L25 40 Z" fill="#fff0e8" stroke="#F97316" strokeWidth="2" />
                        <path d="M75 45 C90 45, 90 65, 75 60" fill="transparent" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
                        <path d="M20 75 C30 85, 70 85, 80 75" fill="transparent" stroke="#fff0e8" strokeWidth="2" />
                        <path d="M40 35 C45 25, 35 15, 40 5" fill="transparent" stroke="#fff0e8" strokeWidth="2" className="opacity-60" style={{ animation: 'steamRise 3s infinite ease-in-out' }} />
                        <path d="M50 35 C55 25, 45 15, 50 5" fill="transparent" stroke="#fff0e8" strokeWidth="2" className="opacity-80" style={{ animation: 'steamRise 3s infinite 0.7s ease-in-out' }} />
                        <path d="M60 35 C65 25, 55 15, 60 5" fill="transparent" stroke="#fff0e8" strokeWidth="2" className="opacity-50" style={{ animation: 'steamRise 3s infinite 1.4s ease-in-out' }} />
                    </svg>
                    <h2 className="text-4xl sm:text-5xl md:text-8xl font-serif italic text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-[#F97316]">
                        Let Us Sit and Talk.
                    </h2>
                </div>
                <p className="text-lg sm:text-2xl font-light text-white/80 max-w-xl mx-auto tracking-wide">
                    Every great home begins with a conversation. We've saved a seat for you.
                </p>
            </div>

            {/* Main content — form + contact info */}
            <div className="relative z-30 max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-10 sm:gap-16 px-4 pb-10 sm:pb-16 items-start">

                {/* Form Postcard */}
                <div className="postcard-form w-full bg-gradient-to-br from-[#f5f0e8] to-[#ede8df] text-[#1a1a1a] rounded p-5 sm:p-6 md:p-12 relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-4 border border-[#c41e3a]" style={{ fontFamily: "'Inter', sans-serif" }}>

                    {/* Stamp */}
                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-12 h-16 sm:w-16 sm:h-20 bg-white border border-dashed border-gray-400 p-1 rotate-6 shadow-sm flex items-center justify-center pointer-events-none overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1544830154-159c3817f52a?q=80&w=150&auto=format&fit=crop" alt="stamp" loading="lazy" decoding="async" className="w-full h-full object-cover filter sepia" />
                    </div>

                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form
                                onSubmit={handleSubmit}
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-8 lg:gap-x-16 gap-y-0"
                            >
                                <div className="flex flex-col gap-4 sm:gap-6 w-full">
                                    <h3 className="font-['Caveat',_cursive] text-3xl sm:text-4xl text-[#c41e3a] mb-2 sm:mb-4 font-bold tracking-wider">Send a Note</h3>

                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Full Name" required className="bg-transparent border-b-2 border-dashed border-gray-400 py-3 sm:py-4 focus:outline-none focus:border-[#C9A84C] transition-colors font-['Caveat',_cursive] text-xl sm:text-3xl placeholder-gray-500 w-full" />
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email Address" required className="bg-transparent border-b-2 border-dashed border-gray-400 py-3 sm:py-4 focus:outline-none focus:border-[#C9A84C] transition-colors font-['Caveat',_cursive] text-xl sm:text-3xl placeholder-gray-500 w-full" />
                                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="bg-transparent border-b-2 border-dashed border-gray-400 py-3 sm:py-4 focus:outline-none focus:border-[#C9A84C] transition-colors font-['Caveat',_cursive] text-xl sm:text-3xl placeholder-gray-500 w-full" />

                                    <select name="projectType" value={formData.projectType} onChange={handleChange} className="bg-transparent border-b-2 border-dashed border-gray-400 py-3 sm:py-4 focus:outline-none focus:border-[#C9A84C] transition-colors font-['Caveat',_cursive] text-xl sm:text-3xl text-gray-500 mt-2 w-full appearance-none">
                                        <option value="">Project Type</option>
                                        <option value="residential">Residential Villa</option>
                                        <option value="commercial">Commercial Office</option>
                                        <option value="interior">Interior Design</option>
                                        <option value="other">Other Inquiry</option>
                                    </select>
                                </div>

                                <div className="flex flex-col w-full h-full relative border-l-0 md:border-l-2 border-dashed border-gray-300 md:pl-8 mt-6 md:mt-0 pt-4 md:pt-4">
                                    {/* Postcard address lines */}
                                    <div className="absolute top-32 right-0 w-full flex flex-col gap-8 opacity-40 pointer-events-none -z-10 mt-8 hidden md:flex">
                                        <div className="w-full h-px border-b-2 border-gray-400 border-solid"></div>
                                        <div className="w-full h-px border-b-2 border-gray-400 border-solid"></div>
                                        <div className="w-full h-px border-b-2 border-gray-400 border-solid"></div>
                                        <div className="w-full h-px border-b-2 border-gray-400 border-solid"></div>
                                    </div>

                                    <textarea
                                        rows="5"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Tell us about the space you're dreaming of..."
                                        required
                                        className="bg-transparent py-2 focus:outline-none focus:border-[#C9A84C] transition-colors font-['Caveat',_cursive] text-xl sm:text-3xl leading-[2.1] resize-none h-[180px] sm:h-[220px] placeholder-gray-500 w-full block mt-4 sm:mt-8 z-10"
                                    ></textarea>

                                    <button type="submit" disabled={loading} className="mt-6 sm:mt-12 md:mt-auto bg-transparent text-[#1a1a1a] flex items-center gap-2 hover:text-[#c41e3a] transition-colors py-2 font-bold tracking-widest uppercase font-sans self-end border-b-2 border-transparent hover:border-[#c41e3a] relative z-20 cursor-pointer disabled:opacity-50">
                                        {loading ? 'Sending...' : 'Send My Note'} {!loading && <Send size={18} />}
                                        <div className="paper-plane absolute right-0 top-0 text-[#c41e3a] opacity-0 pointer-events-none"><Send size={24} /></div>
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative z-10 py-20 sm:py-32 flex flex-col items-center justify-center text-center font-['Caveat',_cursive] text-[#1a1a1a]"
                            >
                                <h3 className="text-3xl sm:text-5xl font-bold mb-6 text-[#c41e3a]">Your message is on its way! ✈️</h3>
                                <p className="text-2xl sm:text-3xl text-gray-700 max-w-md leading-relaxed">
                                    Thank you for writing to us. We have received your note and our team will be in touch within 24 hours to schedule a talk. ☕
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Contact Info Cards */}
                <div className="flex flex-col gap-6 sm:gap-8 mt-0 lg:mt-0 w-full lg:w-[400px] shrink-0">

                    {/* Chalkboard Hours */}
                    <div className="w-full bg-[#2d3a1e] border-[10px] border-[#4a5a2a] p-5 sm:p-6 shadow-2xl rotate-3 transform-gpu hover:rotate-1 transition-transform cursor-default">
                        <h4 className="font-['Caveat',_cursive] text-white text-2xl sm:text-3xl mb-3 sm:mb-4 border-b border-white/20 pb-2 drop-shadow-sm">Studio Hours</h4>
                        <ul className="text-white/80 font-['Caveat',_cursive] text-xl sm:text-2xl space-y-2 drop-shadow-sm">
                            <li className="flex justify-between"><span>Mon - Fri:</span> <span>10am - 6pm</span></li>
                            <li className="flex justify-between"><span>Saturday:</span> <span>By Appt Only</span></li>
                            <li className="flex justify-between text-[#c41e3a]"><span>Sunday:</span> <span className="uppercase text-lg sm:text-xl">Closed</span></li>
                        </ul>
                    </div>

                    {/* Business Card */}
                    <div className="w-full bg-white text-[#1a1a1a] p-6 sm:p-8 shadow-[0_15px_30px_rgba(0,0,0,0.6)] -rotate-2 transform-gpu hover:scale-105 hover:z-50 transition-all cursor-pointer flex flex-col border border-gray-200">
                        <div className="text-left font-serif text-xl sm:text-2xl border-b border-black/10 pb-4 tracking-widest uppercase text-[#8B6914] font-bold">Shree Bhargava<br /><span className="text-base sm:text-lg text-gray-600 font-light">& Associate</span></div>
                        <div className="flex flex-col gap-4 sm:gap-5 font-sans text-sm tracking-wider mt-4 sm:mt-6 mb-6 sm:mb-8">
                            <a href="tel:+919876543210" className="flex items-center gap-4 hover:text-[#C9A84C] transition-colors"><Phone size={18} /> +91 98765 43210</a>
                            <a href="mailto:hello@shreebhargava.com" className="flex items-center gap-4 hover:text-[#C9A84C] transition-colors break-all sm:break-normal"><Mail size={18} /> hello@shreebhargava.com</a>
                            <div className="flex items-start gap-4 mt-2 text-gray-500"><MapPin size={24} className="shrink-0" /> Indore, Madhya Pradesh</div>
                        </div>
                        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-[#25D366] text-white hover:bg-[#128C7E] py-3 sm:py-4 rounded shadow-lg transition-transform hover:scale-105 font-bold tracking-widest uppercase text-sm mt-auto">
                            <MessageCircle size={20} /> Chat on WhatsApp
                        </a>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default TerraceContact
