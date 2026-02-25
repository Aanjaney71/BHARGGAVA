import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion, AnimatePresence } from 'framer-motion'
import { Phone, Mail, MapPin, Send, MessageCircle } from 'lucide-react'
import api from '../../utils/api'

gsap.registerPlugin(ScrollTrigger)

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
        gsap.to(".twinkle-stars", {
            opacity: 0.8,
            duration: 2,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            stagger: {
                each: 0.2,
                from: "random"
            }
        })
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        try {
            await api.post('/api/contact', formData)
            // Animation for plane
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
        <div className="room-section terrace-section bg-transparent min-h-screen relative overflow-hidden text-[#fff0e8] py-16 px-4 flex flex-col justify-center w-full z-10">

            {/* Background Container */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="parallax-bg absolute inset-[-5%] bg-[url('/luxury_contact_terrace.png')] bg-cover bg-center opacity-85"></div>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 to-transparent h-1/2"></div>
            </div>

            {/* Stars */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {[...Array(50)].map((_, i) => (
                    <div key={i} className={`twinkle-stars absolute w-1 h-1 bg-white rounded-full ${i % 3 === 0 ? 'opacity-20' : 'opacity-60'}`} style={{
                        top: `${Math.random() * 50}%`,
                        left: `${Math.random() * 100}%`,
                        transform: `scale(${Math.random() * 1 + 0.5})`
                    }}></div>
                ))}
            </div>

            {/* Clouds */}
            <div className="cloud-1 absolute top-20 left-0 w-[800px] h-64 bg-white/5 blur-3xl rounded-[100%] mix-blend-overlay pointer-events-none"></div>
            <div className="cloud-2 absolute top-40 right-10 w-[600px] h-48 bg-[#F97316]/10 blur-3xl rounded-[100%] mix-blend-overlay pointer-events-none"></div>

            {/* Fairy string lights */}
            <div className="absolute top-0 left-0 w-full h-[100px] pointer-events-none z-10 flex justify-around">
                <svg width="100%" height="150" className="absolute top-0 left-0 drop-shadow-[0_0_8px_#F59E0B]">
                    <path d="M 0 50 Q 250 150 500 50 T 1000 50 T 1500 50 T 2000 50" fill="transparent" stroke="#222" strokeWidth="1" />
                    {[...Array(20)].map((_, i) => (
                        <circle
                            key={i}
                            cx={i * 100 + 50}
                            cy={i % 2 === 0 ? 80 : 100}
                            r="4"
                            fill="#F59E0B"
                            className="animate-pulse"
                            style={{ animationDelay: `${i * 0.1}s`, animationDuration: '2s' }}
                        />
                    ))}
                </svg>
            </div>

            {/* Header content */}
            <div className="relative z-20 flex flex-col items-center text-center mt-16 max-w-4xl mx-auto mb-16 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
                <div className="relative mb-6">
                    {/* Teacup SVG Graphic */}
                    <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="drop-shadow-lg mx-auto mb-4">
                        <path d="M25 60 C25 80, 75 80, 75 60 L75 40 L25 40 Z" fill="#fff0e8" stroke="#F97316" strokeWidth="2" />
                        <path d="M75 45 C90 45, 90 65, 75 60" fill="transparent" stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
                        <path d="M20 75 C30 85, 70 85, 80 75" fill="transparent" stroke="#fff0e8" strokeWidth="2" />

                        {/* Steam */}
                        <path d="M40 35 C45 25, 35 15, 40 5" fill="transparent" stroke="#fff0e8" strokeWidth="2" className="opacity-60" style={{ animation: 'steamRise 3s infinite ease-in-out' }} />
                        <path d="M50 35 C55 25, 45 15, 50 5" fill="transparent" stroke="#fff0e8" strokeWidth="2" className="opacity-80" style={{ animation: 'steamRise 3s infinite 0.7s ease-in-out' }} />
                        <path d="M60 35 C65 25, 55 15, 60 5" fill="transparent" stroke="#fff0e8" strokeWidth="2" className="opacity-50" style={{ animation: 'steamRise 3s infinite 1.4s ease-in-out' }} />
                    </svg>
                    <h2 className="text-5xl md:text-8xl font-serif italic text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-[#F97316]">
                        Let Us Sit and Talk.
                    </h2>
                </div>
                <p className="text-2xl font-light text-white/80 max-w-xl mx-auto tracking-wide">
                    Every great home begins with a conversation. We've saved a seat for you.
                </p>
            </div>


            <div className="relative z-30 max-w-6xl mx-auto w-full flex flex-col lg:flex-row gap-16 px-4 pb-16 items-start">

                {/* Form Postcard */}
                <div className="postcard-form w-full bg-gradient-to-br from-[#f5f0e8] to-[#ede8df] text-[#1a1a1a] rounded p-6 md:p-12 relative shadow-[0_30px_60px_rgba(0,0,0,0.5)] border-4 border border-[#c41e3a]" style={{ fontFamily: "'Inter', sans-serif" }}>

                    {/* Stamp */}
                    <div className="absolute top-6 right-6 w-16 h-20 bg-white border border-dashed border-gray-400 p-1 rotate-6 shadow-sm flex items-center justify-center pointer-events-none">
                        <img src="https://images.unsplash.com/photo-1544830154-159c3817f52a?q=80&w=150&auto=format&fit=crop" alt="stamp" className="w-full h-full object-cover filter sepia" />
                    </div>

                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-50 pointer-events-none"></div>

                    <AnimatePresence mode="wait">
                        {!isSubmitted ? (
                            <motion.form
                                onSubmit={handleSubmit}
                                initial={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-0"
                            >
                                <div className="flex flex-col gap-6 w-full">
                                    <h3 className="font-['Caveat',_cursive] text-4xl text-[#c41e3a] mb-4 font-bold tracking-wider">Send a Note</h3>

                                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Full Name" required className="bg-transparent border-b-2 border-dashed border-gray-400 py-3 md:py-4 focus:outline-none focus:border-[#C9A84C] transition-colors font-['Caveat',_cursive] text-2xl md:text-3xl placeholder-gray-500 w-full" />
                                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email Address" required className="bg-transparent border-b-2 border-dashed border-gray-400 py-3 md:py-4 focus:outline-none focus:border-[#C9A84C] transition-colors font-['Caveat',_cursive] text-2xl md:text-3xl placeholder-gray-500 w-full" />
                                    <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" className="bg-transparent border-b-2 border-dashed border-gray-400 py-3 md:py-4 focus:outline-none focus:border-[#C9A84C] transition-colors font-['Caveat',_cursive] text-2xl md:text-3xl placeholder-gray-500 w-full" />

                                    <select name="projectType" value={formData.projectType} onChange={handleChange} className="bg-transparent border-b-2 border-dashed border-gray-400 py-3 md:py-4 focus:outline-none focus:border-[#C9A84C] transition-colors font-['Caveat',_cursive] text-2xl md:text-3xl text-gray-500 mt-2 w-full appearance-none">
                                        <option value="">Project Type</option>
                                        <option value="residential">Residential Villa</option>
                                        <option value="commercial">Commercial Office</option>
                                        <option value="interior">Interior Design</option>
                                        <option value="other">Other Inquiry</option>
                                    </select>
                                </div>

                                <div className="flex flex-col w-full h-full relative border-l-2 border-dashed border-gray-300 pl-8 mt-12 md:mt-0 pt-16 md:pt-4">

                                    {/* Postcard address lines */}
                                    <div className="absolute top-32 right-0 w-full flex flex-col gap-8 opacity-40 pointer-events-none -z-10 mt-8">
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
                                        className="bg-transparent py-2 focus:outline-none focus:border-[#C9A84C] transition-colors font-['Caveat',_cursive] text-2xl md:text-3xl leading-[2.1] resize-none h-[220px] placeholder-gray-500 w-full block mt-8 z-10"
                                    ></textarea>

                                    <button type="submit" disabled={loading} className="mt-12 md:mt-auto bg-transparent text-[#1a1a1a] flex items-center gap-2 hover:text-[#c41e3a] transition-colors py-2 font-bold tracking-widest uppercase font-sans self-end border-b-2 border-transparent hover:border-[#c41e3a] relative z-20 cursor-pointer disabled:opacity-50">
                                        {loading ? 'Sending...' : 'Send My Note'} {!loading && <Send size={18} />}
                                        <div className="paper-plane absolute right-0 top-0 text-[#c41e3a] opacity-0 pointer-events-none"><Send size={24} /></div>
                                    </button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="relative z-10 py-32 flex flex-col items-center justify-center text-center font-['Caveat',_cursive] text-[#1a1a1a]"
                            >
                                <h3 className="text-5xl font-bold mb-6 text-[#c41e3a]">Your message is on its way! ✈️</h3>
                                <p className="text-3xl text-gray-700 max-w-md leading-relaxed h-[160px]">
                                    Thank you for writing to us. We have received your note and our team will be in touch within 24 hours to schedule a talk. ☕
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Props on Table (Contact Info) */}
                <div className="flex flex-col gap-8 perspective-1000 mt-16 lg:mt-0 w-full lg:w-[400px] shrink-0">

                    {/* Chalkboard Hours */}
                    <div className="w-full bg-[#2d3a1e] border-[10px] border-[#4a5a2a] p-6 shadow-2xl rotate-3 transform-gpu hover:rotate-1 transition-transform cursor-default">
                        <h4 className="font-['Caveat',_cursive] text-white text-3xl mb-4 border-b border-white/20 pb-2 drop-shadow-sm">Studio Hours</h4>
                        <ul className="text-white/80 font-['Caveat',_cursive] text-2xl space-y-2 drop-shadow-sm">
                            <li className="flex justify-between"><span>Mon - Fri:</span> <span>10am - 6pm</span></li>
                            <li className="flex justify-between"><span>Saturday:</span> <span>By Appt Only</span></li>
                            <li className="flex justify-between text-[#c41e3a]"><span>Sunday:</span> <span className="uppercase text-xl">Closed</span></li>
                        </ul>
                    </div>

                    {/* Business Card (Phone & Email) */}
                    <div className="w-full bg-white text-[#1a1a1a] p-8 shadow-[0_15px_30px_rgba(0,0,0,0.6)] -rotate-2 transform-gpu hover:scale-105 hover:z-50 transition-all cursor-pointer flex flex-col border border-gray-200">
                        <div className="text-left font-serif text-2xl border-b border-black/10 pb-4 tracking-widest uppercase text-[#8B6914] font-bold">Shree Bhargava<br /><span className="text-lg text-gray-600 font-light">& Associate</span></div>
                        <div className="flex flex-col gap-5 font-sans text-sm tracking-wider mt-6 mb-8">
                            <a href="tel:+919876543210" className="flex items-center gap-4 hover:text-[#C9A84C] transition-colors"><Phone size={18} /> +91 98765 43210</a>
                            <a href="mailto:hello@shreebhargava.com" className="flex items-center gap-4 hover:text-[#C9A84C] transition-colors"><Mail size={18} /> hello@shreebhargava.com</a>
                            <div className="flex items-start gap-4 mt-2 text-gray-500"><MapPin size={24} className="shrink-0" /> Indore, Madhya Pradesh</div>
                        </div>
                        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 bg-[#25D366] text-white hover:bg-[#128C7E] py-4 rounded shadow-lg transition-transform hover:scale-105 font-bold tracking-widest uppercase text-sm mt-auto">
                            <MessageCircle size={20} /> Chat on WhatsApp
                        </a>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default TerraceContact
