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
        gsap.to(e.currentTarget, { x: -60, duration: 0.4, ease: "power2.out" })
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
        <div className="room-section study-section bg-transparent text-[#e0ffe8] min-h-screen py-16 px-4 relative flex flex-col items-center overflow-hidden z-10">

            {/* Background Container */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="parallax-bg absolute inset-[-5%] bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-[0.85]"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/60 to-black/90"></div>
            </div>

            {/* Ambient Desk Lamp Glow */}
            <div className="absolute top-10 right-20 w-96 h-96 bg-green-500 rounded-full mix-blend-screen opacity-10 blur-[150px] pointer-events-none z-0"></div>

            <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col gap-16 md:gap-24">

                {/* Header */}
                <div className="text-center px-4 max-w-4xl mx-auto drop-shadow-[0_0_20px_rgba(74,222,128,0.2)] mt-8">
                    <h2 className="text-5xl md:text-7xl font-serif text-[#4ADE80] mb-8 font-bold tracking-wide leading-tight">
                        Pull Up a Chair.
                    </h2>
                    <p className="text-xl md:text-2xl text-[#e0ffe8]/80 max-w-2xl mx-auto font-light leading-relaxed">
                        There is always room for great talent in this studio.
                        If you speak the language of spaces, we want to hear your voice.
                    </p>
                    <div className="w-24 h-px bg-gradient-to-r from-transparent via-[#4ADE80] to-transparent mx-auto mt-12 opacity-50"></div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 relative">

                    {/* Bookshelf Interactive */}
                    <div className="w-full relative h-[450px]">
                        <h3 className="text-3xl font-serif text-[#4ADE80] mb-8 relative z-20 flex items-center gap-4">
                            <Book className="text-[#4ADE80]" /> The Studio Library
                        </h3>

                        <div className="absolute top-24 left-0 w-full sm:w-80 h-[300px] border-l-8 border-b-8 border-r-8 border-[#3A2A1A] bg-[#2A1A0A] p-4 flex flex-col gap-2 shadow-[20px_20px_40px_rgba(0,0,0,0.8)] z-10 w-[90%] md:w-80">
                            {/* Shelf Shadow */}
                            <div className="absolute inset-0 shadow-[inset_0_20px_40px_rgba(0,0,0,0.6)] pointer-events-none"></div>

                            {studyBenefits.map((b, i) => (
                                <div
                                    key={b.id}
                                    onMouseEnter={(e) => handleBookEnter(b.id, e)}
                                    onMouseLeave={(e) => handleBookLeave(e)}
                                    className={`
                                    w-full h-12 flex items-center px-4 font-serif text-sm tracking-widest cursor-pointer shadow-xl
                                    ${i % 2 === 0 ? 'bg-[#4A2A2A] text-[#FFE4B5]' : 'bg-[#1A3A2A] text-[#98FB98]'}
                                `}
                                    style={{ transformOrigin: 'right center' }}
                                >
                                    <span className="rotate-0 w-full text-center border-l-2 border-r-2 border-dashed border-white/20 uppercase">
                                        {b.title}
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Benefit Detail Card - slides in when book is hovered */}
                        <AnimatePresence>
                            {activeBook && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="absolute left-4 md:left-[340px] top-4 md:top-32 w-[90%] md:w-72 p-6 bg-[#0D1410] border border-[#4ADE80]/30 shadow-[0_0_30px_rgba(74,222,128,0.1)] rounded z-20"
                                >
                                    <h4 className="text-xl font-serif text-[#4ADE80] mb-3">{studyBenefits.find(b => b.id === activeBook).title}</h4>
                                    <p className="text-[#e0ffe8]/80 text-sm leading-relaxed">{studyBenefits.find(b => b.id === activeBook).desc}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Cork Board Job Listings */}
                    <div className="w-full relative min-h-[500px] bg-[url('https://images.unsplash.com/photo-1586075010923-2dd4570fb338?q=80&w=800&auto=format&fit=crop')] bg-cover border-[16px] border-[#3E2723] rounded shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10">
                        <div className="absolute inset-0 bg-black/50 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none"></div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-6 md:p-12">
                            {jobListings.map((job) => {
                                const rot = (Math.random() - 0.5) * 8
                                return (
                                    <div
                                        key={job.id}
                                        onClick={() => setSelectedJob(job)}
                                        className="sticky-note bg-yellow-200 cursor-pointer text-[#1a1a1a] p-6 shadow-[4px_4px_10px_rgba(0,0,0,0.3)] transition-all hover:scale-105 hover:z-50"
                                        style={{
                                            backgroundColor: job.color,
                                            transform: `rotate(${rot}deg)`,
                                            fontFamily: "'Caveat', cursive"
                                        }}
                                    >
                                        {/* Red Pin */}
                                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-red-600 shadow-md">
                                            <div className="w-1.5 h-1.5 bg-white/50 rounded-full ml-1 mt-0.5"></div>
                                        </div>

                                        <h4 className="font-bold text-2xl leading-tight mb-2 border-b border-black/10 pb-2">{job.pos}</h4>
                                        <p className="text-lg text-black/70 flex items-center gap-2 mb-1"><User size={16} /> {job.exp}</p>
                                        <p className="text-lg text-black/70 flex items-center gap-2"><Book size={16} /> {job.type}</p>

                                        <div className="mt-4 text-sm font-sans font-bold uppercase tracking-widest flex items-center gap-1 group">
                                            View Details <span className="group-hover:translate-x-2 transition-transform">→</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                </div>

                {/* Internship Section */}
                <div className="w-full max-w-3xl mx-auto bg-gradient-to-r from-[#0A0F08] via-[#1A2A1A] to-[#0A0F08] border border-[#4ADE80]/20 p-8 rounded-xl flex items-center justify-between shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div className="w-16 h-16 rounded-full bg-[#4ADE80]/10 flex items-center justify-center text-[#4ADE80] shrink-0">
                            <GraduationCap size={32} />
                        </div>
                        <div>
                            <h4 className="text-2xl font-serif text-[#4ADE80] mb-2">Internship Program</h4>
                            <p className="text-[#e0ffe8]/60 max-w-md">We select 2 bright students every semester for hands-on mentorship.</p>
                        </div>
                    </div>
                    <button onClick={() => setSelectedJob({ pos: 'Internship Program' })} className="mt-6 md:mt-0 px-6 py-3 border border-[#4ADE80] text-[#4ADE80] hover:bg-[#4ADE80] hover:text-[#0A0F08] rounded transition-colors font-bold tracking-widest text-sm uppercase whitespace-nowrap">
                        Apply Now
                    </button>
                </div>

            </div>

            {/* Application Modal (Blueprint styling) */}
            {typeof document !== 'undefined' && createPortal(
                <AnimatePresence>
                    {selectedJob && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
                        >
                            <motion.div
                                initial={{ scale: 0.9, y: 50 }}
                                animate={{ scale: 1, y: 0 }}
                                exit={{ scale: 0.9, y: 50 }}
                                className="w-full max-w-4xl bg-[#002f5a] shadow-[0_0_50px_rgba(74,222,128,0.2)] relative border border-[#4ADE80]/30 min-h-[500px] my-8"
                                style={{
                                    backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                                    backgroundSize: '20px 20px',
                                    fontFamily: "'Inter', sans-serif"
                                }}
                            >
                                {/* Blueprint decorative borders */}
                                <div className="absolute top-4 left-4 right-4 bottom-4 border border-white/20 pointer-events-none"></div>
                                <div className="absolute top-6 left-6 border-l-2 border-t-2 border-white w-8 h-8 pointer-events-none"></div>
                                <div className="absolute top-6 right-6 border-r-2 border-t-2 border-white w-8 h-8 pointer-events-none"></div>
                                <div className="absolute bottom-6 left-6 border-l-2 border-b-2 border-white w-8 h-8 pointer-events-none"></div>
                                <div className="absolute bottom-6 right-6 border-r-2 border-b-2 border-white w-8 h-8 pointer-events-none"></div>

                                <button
                                    onClick={() => setSelectedJob(null)}
                                    className="absolute top-4 right-4 md:top-8 md:right-8 text-white hover:text-[#4ADE80] z-20 transition-colors bg-black/40 md:bg-black/20 p-2 rounded-full backdrop-blur cursor-pointer"
                                >
                                    <X size={24} />
                                </button>

                                <div className="p-6 md:p-16 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10 text-white mt-8 md:mt-0">

                                    {/* Job Details col */}
                                    <div>
                                        <h3 className="text-sm font-bold tracking-[0.3em] uppercase text-[#4ADE80] mb-4">Position Available</h3>
                                        <h2 className="text-4xl md:text-5xl font-serif mb-8 border-b border-white/20 pb-4 inline-block">{selectedJob.pos}</h2>

                                        <h4 className="text-xl font-bold mb-4 font-serif text-white/90 uppercase tracking-widest mt-8">Requirements</h4>
                                        <ul className="space-y-3 font-light tracking-wide text-white/70">
                                            <li className="flex gap-3"><span className="text-[#4ADE80]">—</span> Minimum {selectedJob.exp || '3 years'} experience</li>
                                            <li className="flex gap-3"><span className="text-[#4ADE80]">—</span> Excellent portfolio demonstrating problem solving</li>
                                            <li className="flex gap-3"><span className="text-[#4ADE80]">—</span> Proficiency in relevant architectural software</li>
                                            <li className="flex gap-3"><span className="text-[#4ADE80]">—</span> Strong communication and presentation skills</li>
                                        </ul>

                                        <div className="mt-12 w-full p-6 border border-[#4ADE80]/30 bg-[#4ADE80]/5 rounded font-mono text-sm text-[#4ADE80]/80">
                                    // Notice: Scale 1:1 <br />
                                    // Project: Human Capital <br />
                                    // Date: {new Date().toLocaleDateString()}
                                        </div>
                                    </div>

                                    {/* Application Form col */}
                                    <div className="bg-white/5 p-6 md:p-8 border border-white/10 backdrop-blur rounded">
                                        <h3 className="text-xl font-serif text-white mb-6 border-b border-white/10 pb-4">Submit Application</h3>

                                        {status.msg && (
                                            <div className={`p-3 text-sm mb-4 rounded ${status.type === 'error' ? 'bg-red-500/20 text-red-200' : 'bg-green-500/20 text-green-200'}`}>
                                                {status.msg}
                                            </div>
                                        )}

                                        <form onSubmit={handleApply} className="flex flex-col gap-6 w-full cursor-auto">
                                            <input type="text" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} placeholder="Full Name *" required className="bg-transparent border-b border-white/30 py-2 px-1 focus:outline-none focus:border-[#4ADE80] transition-colors w-full font-sans max-w-[100%] placeholder-white/40" />
                                            <input type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} placeholder="Email Address *" required className="bg-transparent border-b border-white/30 py-2 px-1 focus:outline-none focus:border-[#4ADE80] transition-colors w-full font-sans max-w-[100%] placeholder-white/40" />
                                            <input type="text" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} placeholder="Phone Number" className="bg-transparent border-b border-white/30 py-2 px-1 focus:outline-none focus:border-[#4ADE80] transition-colors w-full font-sans max-w-[100%] placeholder-white/40" />
                                            <input type="url" value={formData.portfolioLink} onChange={e => setFormData({ ...formData, portfolioLink: e.target.value })} placeholder="Portfolio URL (Behance/Drive) *" required className="bg-transparent border-b border-white/30 py-2 px-1 focus:outline-none focus:border-[#4ADE80] transition-colors w-full font-sans max-w-[100%] placeholder-white/40" />

                                            <div
                                                {...getRootProps()}
                                                className={`mt-4 border-2 border-dashed p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${isDragActive ? 'border-[#4ADE80] bg-[#4ADE80]/10' : 'border-white/20 hover:border-white/50'}`}
                                            >
                                                <input {...getInputProps()} />
                                                <FileUp className={`w-8 h-8 mb-2 ${file ? 'text-[#4ADE80]' : 'text-white/50'}`} />
                                                {file ? (
                                                    <p className="text-[#4ADE80] text-sm break-all">{file.name}</p>
                                                ) : (
                                                    <p className="text-white/50 text-sm">Drag & drop resume PDF here, or click to browse</p>
                                                )}
                                            </div>

                                            <button type="submit" disabled={loading} className="mt-4 w-full bg-[#4ADE80] text-[#002f5a] py-4 font-bold tracking-widest hover:bg-white transition-colors uppercase cursor-pointer disabled:opacity-50">
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
