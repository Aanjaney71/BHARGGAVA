import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { FileUp, Book, User, GraduationCap, X } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import api from '../../utils/api'

const studyBenefits = [
    { id: 1, title: 'Creative Freedom', desc: "We don't micromanage design. You own your projects." },
    { id: 2, title: 'Mentorship', desc: "Learn directly from partners with 20+ years experience." },
    { id: 3, title: 'Growth Path', desc: "Clear milestones from Junior to Lead Architect." },
    { id: 4, title: 'Studio Culture', desc: "We celebrate milestones, share meals, and respect work-life balance." }
]

const jobListings = [
    { id: 1, pos: 'Senior Architect', exp: '5-8 Years', type: 'Full Time', color: '#FFF3A3' },
    { id: 2, pos: '3D Artist / Visualizer', exp: '3+ Years', type: 'Full Time', color: '#A8D8EA' },
    { id: 3, pos: 'Project Manager', exp: '4-6 Years', type: 'Full Time', color: '#FFB3BA' },
    { id: 4, pos: 'Junior Interior Designer', exp: '1-3 Years', type: 'Full Time', color: '#B8F0B8' }
]

// Pre-computed sticky note rotations — avoids Math.random() during render
const JOB_ROTATIONS = [-3, 2.5, -1.5, 3.5]

const StudyCareer = () => {
    const [activeBook, setActiveBook] = useState(null)
    const [selectedJob, setSelectedJob] = useState(null)
    const [file, setFile] = useState(null)
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', portfolioLink: '' })
    const [status, setStatus] = useState({ type: '', msg: '' })
    const [loading, setLoading] = useState(false)

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { 'application/pdf': ['.pdf'] },
        maxFiles: 1,
        onDrop: acceptedFiles => setFile(acceptedFiles[0])
    })

    const handleBookEnter = (id, e) => {
        setActiveBook(id)
        gsap.to(e.currentTarget, { x: -40, duration: 0.4, ease: "power2.out" })
    }

    const handleBookLeave = (e) => {
        setActiveBook(null)
        gsap.to(e.currentTarget, { x: 0, duration: 0.4, ease: "power2.in" })
    }

    const handleApply = async (e) => {
        e.preventDefault()
        if (!file) {
            setStatus({ type: 'error', msg: 'Please upload a resume (PDF)' })
            return
        }

        const data = new FormData()
        data.append('name', formData.name)
        data.append('email', formData.email)
        data.append('phone', formData.phone)
        data.append('portfolioLink', formData.portfolioLink)
        data.append('position', selectedJob.pos)
        data.append('experience', selectedJob.exp || 'Fresher')
        data.append('resume', file)

        setLoading(true)
        setStatus({ type: '', msg: '' })

        try {
            await api.post('/api/career/apply', data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            setStatus({ type: 'success', msg: 'Application sent successfully!' })
            setFormData({ name: '', email: '', phone: '', portfolioLink: '' })
            setFile(null)
        } catch (error) {
            setStatus({ type: 'error', msg: 'Failed to send application.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="room-section study-section bg-transparent text-[#e0ffe8] min-h-screen py-12 sm:py-16 px-4 relative flex flex-col items-center overflow-hidden z-10">

            {/* Background Container */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="parallax-bg absolute inset-[-5%] bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.85]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90"></div>
            </div>

            {/* Ambient Desk Lamp Glow */}
            <div className="absolute top-10 right-10 sm:right-20 w-64 sm:w-96 h-64 sm:h-96 bg-green-500 rounded-full mix-blend-screen opacity-10 blur-[150px] pointer-events-none z-0"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16 md:gap-24">

                {/* Header */}
                <div className="text-center px-4 max-w-4xl mx-auto drop-shadow-[0_0_20px_rgba(74,222,128,0.2)] mt-6 sm:mt-8">
                    <h2 className="text-4xl sm:text-5xl md:text-7xl font-serif text-[#4ADE80] mb-6 sm:mb-8 font-bold tracking-wide leading-tight">
                        Pull Up a Chair.
                    </h2>
                    <p className="text-lg sm:text-xl md:text-2xl text-[#e0ffe8]/80 max-w-2xl mx-auto font-light leading-relaxed">
                        There is always room for great talent in this studio.
                        If you speak the language of spaces, we want to hear your voice.
                    </p>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#4ADE80] to-transparent mx-auto mt-8 sm:mt-12 opacity-50"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-24 relative">

                    {/* Bookshelf Interactive — auto height, no fixed */}
                    <div className="w-full relative">
                        <h3 className="text-2xl sm:text-3xl font-serif text-[#4ADE80] mb-6 sm:mb-8 relative z-20 flex items-center gap-4">
                            <Book className="text-[#4ADE80] shrink-0" /> The Studio Library
                        </h3>

                        <div className="relative w-full border-l-8 border-b-8 border-r-8 border-[#3A2A1A] bg-[#2A1A0A] p-4 flex flex-col gap-2 shadow-[20px_20px_40px_rgba(0,0,0,0.8)] z-10">
                            {/* Shelf Shadow */}
                            <div className="absolute inset-0 shadow-[inset_0_20px_40px_rgba(0,0,0,0.6)] pointer-events-none"></div>

                            {studyBenefits.map((b, i) => (
                                <div
                                    key={b.id}
                                    onMouseEnter={(e) => handleBookEnter(b.id, e)}
                                    onMouseLeave={(e) => handleBookLeave(e)}
                                    className={`w-full h-12 flex items-center px-4 font-serif text-sm tracking-widest cursor-pointer shadow-xl ${i % 2 === 0 ? 'bg-[#4A2A2A] text-[#FFE4B5]' : 'bg-[#1A3A2A] text-[#98FB98]'}`}
                                    style={{ transformOrigin: 'right center' }}
                                >
                                    <span className="rotate-0 w-full text-center border-l-2 border-r-2 border-dashed border-white/20 uppercase">
                                        {b.title}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Benefit Detail Card */}
                        <AnimatePresence>
                            {activeBook && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="mt-4 lg:absolute lg:left-full lg:top-16 w-full lg:w-72 p-6 bg-[#0D1410] border border-[#4ADE80]/30 shadow-[0_0_30px_rgba(74,222,128,0.1)] rounded z-20"
                                >
                                    <h4 className="text-xl font-serif text-[#4ADE80] mb-3">{studyBenefits.find(b => b.id === activeBook).title}</h4>
                                    <p className="text-[#e0ffe8]/80 text-sm leading-relaxed">{studyBenefits.find(b => b.id === activeBook).desc}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cork Board Job Listings */}
                    <div className="w-full relative min-h-[400px] sm:min-h-[500px] bg-[url('https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop')] bg-cover border-[12px] sm:border-[16px] border-[#3E2723] rounded shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10 overflow-hidden">
                        <div className="absolute inset-0 bg-black/50 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 p-5 sm:p-6 md:p-12">
                            {jobListings.map((job, idx) => (
                                <div
                                    key={job.id}
                                    onClick={() => setSelectedJob(job)}
                                    className="sticky-note relative cursor-pointer text-[#1a1a1a] p-5 sm:p-6 shadow-[4px_4px_10px_rgba(0,0,0,0.3)] transition-all hover:scale-105 hover:z-50"
                                    style={{
                                        backgroundColor: job.color,
                                        transform: `rotate(${JOB_ROTATIONS[idx]}deg)`,
                                        fontFamily: "'Caveat', cursive"
                                    }}
                                >
                                    {/* Red Pin */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-md">
                                        <div className="w-1.5 h-1.5 bg-white/50 rounded-full ml-1 mt-0.5"></div>
                                    </div>

                                    <h4 className="font-bold text-xl sm:text-2xl leading-tight mb-2 border-b border-black/10 pb-2">{job.pos}</h4>
                                    <p className="text-base sm:text-lg text-black/70 flex items-center gap-2 mb-1"><User size={16} /> {job.exp}</p>
                                    <p className="text-base sm:text-lg text-black/70 flex items-center gap-2"><Book size={16} /> {job.type}</p>

                                    <div className="mt-3 sm:mt-4 text-sm font-sans font-bold uppercase tracking-widest flex items-center gap-1 group">
                                        View Details <span className="group-hover:translate-x-2 transition-transform">→</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Internship Section */}
                <div className="w-full max-w-3xl mx-auto bg-gradient-to-r from-[#0A0F08] via-[#1A2A1A] to-[#0A0F08] border border-[#4ADE80]/20 p-6 sm:p-8 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
                    <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-center sm:text-left">
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#4ADE80]/10 flex items-center justify-center text-[#4ADE80] shrink-0">
                            <GraduationCap size={28} />
                        </div>
                        <div>
                            <h4 className="text-xl sm:text-2xl font-serif text-[#4ADE80] mb-2">Internship Program</h4>
                            <p className="text-[#e0ffe8]/60 max-w-md text-sm sm:text-base">We select 2 bright students every semester for hands-on mentorship.</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedJob({ pos: 'Internship Program' })} className="px-5 sm:px-6 py-3 border border-[#4ADE80] text-[#4ADE80] hover:bg-[#4ADE80] hover:text-[#0A0F08] rounded transition-colors font-bold tracking-widest text-sm uppercase whitespace-nowrap w-full sm:w-auto">
                        Apply Now
                    </button>
                </div>

            </div>

            {/* Application Modal */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedJob && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-start sm:items-center justify-center p-3 sm:p-4 overflow-y-auto"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 50 }}
                                className="w-full max-w-4xl bg-[#002f5a] shadow-[0_0_50px_rgba(74,222,128,0.2)] relative border border-[#4ADE80]/30 my-4 sm:my-8"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                                    backgroundSize: '20px 20px',
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                {/* Blueprint borders */}
                                <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/20 pointer-events-none"></div>
                                <div className="absolute top-6 left-6 border-l-2 border-t-2 border-white w-8 h-8 pointer-events-none"></div>
                                <div className="absolute top-6 right-6 border-r-2 border-t-2 border-white w-8 h-8 pointer-events-none"></div>
                                <div className="absolute bottom-6 left-6 border-l-2 border-b-2 border-white w-8 h-8 pointer-events-none"></div>
                                <div className="absolute bottom-6 right-6 border-r-2 border-b-2 border-white w-8 h-8 pointer-events-none"></div>

                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="absolute top-3 right-3 sm:top-8 sm:right-8 text-white hover:text-[#4ADE80] z-20 transition-colors bg-black/50 p-2 rounded-full backdrop-blur cursor-pointer"
                                >
                                    <X size={22} />
                                </button>

                                <div className="p-5 sm:p-8 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 relative z-10 text-white mt-6 sm:mt-8 md:mt-0">

                                    {/* Job Details */}
                                    <div>
                                        <h3 className="text-xs font-bold tracking-[0.3em] uppercase text-[#4ADE80] mb-3 sm:mb-4">Position Available</h3>
                                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif mb-6 sm:mb-8 border-b border-white/20 pb-4 inline-block">{selectedJob.pos}</h2>

                                        <h4 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-serif text-white/90 uppercase tracking-widest mt-6 sm:mt-8">Requirements</h4>
                                        <ul className="space-y-2 sm:space-y-3 font-light tracking-wide text-white/70 text-sm sm:text-base">
                                            <li className="flex gap-3"><span className="text-[#4ADE80]">—</span> Minimum {selectedJob.exp || '3 years'} experience</li>
                                            <li className="flex gap-3"><span className="text-[#4ADE80]">—</span> Excellent portfolio demonstrating problem solving</li>
                                            <li className="flex gap-3"><span className="text-[#4ADE80]">—</span> Proficiency in relevant architectural software</li>
                                            <li className="flex gap-3"><span className="text-[#4ADE80]">—</span> Strong communication and presentation skills</li>
                                        </ul>

                                        <div className="mt-8 sm:mt-12 w-full p-4 sm:p-6 border border-[#4ADE80]/30 bg-[#4ADE80]/5 rounded font-mono text-xs sm:text-sm text-[#4ADE80]/80">
                                            // Notice: Scale 1:1 <br />
                                            // Project: Human Capital <br />
                                            // Date: {new Date().toLocaleDateString()}
                                        </div>
                                    </div>

                                    {/* Application Form */}
                                    <div className="bg-white/5 p-5 sm:p-6 md:p-8 border border-white/10 backdrop-blur rounded">
                                        <h3 className="text-lg sm:text-xl font-serif text-white mb-4 sm:mb-6 border-b border-white/10 pb-4">Submit Application</h3>

                                        {status.msg && (
                                            <div className={`p-3 text-sm mb-4 rounded ${status.type === 'error' ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
                                                {status.msg}
                                            </div>
                                        )}

                                        <form onSubmit={handleApply} className="flex flex-col gap-4 sm:gap-6 w-full cursor-auto">
                                            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name *" required className="bg-transparent border-b border-white/30 py-2 px-1 focus:outline-none focus:border-[#4ADE80] transition-colors w-full font-sans placeholder-white/40 text-sm sm:text-base" />
                                            <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email Address *" required className="bg-transparent border-b border-white/30 py-2 px-1 focus:outline-none focus:border-[#4ADE80] transition-colors w-full font-sans placeholder-white/40 text-sm sm:text-base" />
                                            <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone Number" className="bg-transparent border-b border-white/30 py-2 px-1 focus:outline-none focus:border-[#4ADE80] transition-colors w-full font-sans placeholder-white/40 text-sm sm:text-base" />
                                            <input type="url" value={formData.portfolioLink} onChange={e => setFormData({ ...formData, portfolioLink: e.target.value })} placeholder="Portfolio URL *" required className="bg-transparent border-b border-white/30 py-2 px-1 focus:outline-none focus:border-[#4ADE80] transition-colors w-full font-sans placeholder-white/40 text-sm sm:text-base" />

                                            <div
                                                {...getRootProps()}
                                                className={`mt-2 sm:mt-4 border-2 border-dashed p-4 sm:p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDragActive ? 'border-[#4ADE80] bg-[#4ADE80]/10' : 'border-white/20 hover:border-white/50'}`}
                                            >
                                                <input {...getInputProps()} />
                                                <FileUp className={`w-7 h-7 sm:w-8 sm:h-8 mb-2 ${file ? 'text-[#4ADE80]' : 'text-white/50'}`} />
                                                {file ? (
                                                    <p className="text-[#4ADE80] text-xs sm:text-sm break-all">{file.name}</p>
                                                ) : (
                                                    <p className="text-white/50 text-xs sm:text-sm">Drag & drop resume PDF here, or click to browse</p>
                                                )}
                                            </div>

                                            <button type="submit" disabled={loading} className="mt-2 sm:mt-4 w-full bg-[#4ADE80] text-[#002f5a] py-3 sm:py-4 font-bold tracking-widest hover:bg-white transition-colors uppercase cursor-pointer disabled:opacity-50 text-sm sm:text-base">
                                                {loading ? 'Sending...' : 'Send Application'}
                                            </button>
                                        </form>
                                    </div>

                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>,
                document.body
            )}
        </div>
    )
}

export default StudyCareer
