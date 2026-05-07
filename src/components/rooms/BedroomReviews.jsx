import React, { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Star } from 'lucide-react'
import api from '../../utils/api'

gsap.registerPlugin(ScrollTrigger)

const mockReviews = [
    { id: 1, name: 'Ananya Sharma', type: 'Residential Villa', text: "Walking into my finished home was an emotional experience. They didn't just build a house; they understood exactly how we wanted our family to feel every morning.", rating: 5, city: 'Mumbai' },
    { id: 2, name: 'Rahul Desai', type: 'Penthouse Interior', text: "The attention to detail is staggering. The way light moves through the specific angles they cut into the living room walls—it's pure poetry in concrete.", rating: 5, city: 'Pune' },
    { id: 3, name: 'Vikram Mehta', type: 'Startup Office', text: "They turned an empty, lifeless warehouse into a bustling creative hub that our employees actually want to come to every day. Brilliant execution.", rating: 4.5, city: 'Bangalore' },
    { id: 4, name: 'Priya Patel', type: 'Modern Farmhouse', text: "Their ability to balance rustic charm with modern amenities is unmatched. It truly feels like a sanctuary away from the city noise, yet completely connected.", rating: 5, city: 'Hyderabad' },
    { id: 5, name: 'Arjun Singh', type: 'Commercial Complex', text: "Incredible vision and execution. The exterior facade alone has become a landmark in the neighborhood. Highly professional and deeply committed.", rating: 5, city: 'New Delhi' }
]

// Pre-computed star positions — avoids Math.random() on every render
const STAR_POSITIONS = Array.from({ length: 40 }, (_, i) => ({
    top: `${(i * 17 + 3) % 52}%`,
    left: `${(i * 31 + 7) % 100}%`,
    scale: 0.5 + (i % 3) * 0.3,
    delay: `${(i * 0.15) % 3}s`,
    dim: i % 3 === 0
}))

const BedroomReviews = () => {

    const [rating, setRating] = useState(0)
    const [formData, setFormData] = useState({
        clientName: '',
        city: '',
        reviewText: ''
    })
    const [status, setStatus] = useState({ type: '', msg: '' })
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let ctx = gsap.context(() => {
            // Review card entrance animation
            gsap.fromTo(".review-card",
                { x: (i) => i % 2 === 0 ? -120 : 120, opacity: 0, rotation: (i) => i % 2 === 0 ? -6 : 6 },
                {
                    scrollTrigger: { trigger: ".reviews-grid", start: "top 85%" },
                    x: 0, opacity: 1, rotation: (i) => (i % 2 === 0 ? -2 : 2),
                    stagger: 0.05, duration: 0.5, ease: "power3.out"
                }
            )
        });
        return () => ctx.revert()
    }, [])

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (rating === 0) {
            setStatus({ type: 'error', msg: 'Please select a rating' })
            return
        }
        setLoading(true)
        setStatus({ type: '', msg: '' })
        try {
            await api.post('/api/reviews', {
                ...formData,
                rating
            })
            setStatus({ type: 'success', msg: 'Review submitted successfully! Pending approval.' })
            setFormData({ clientName: '', city: '', reviewText: '' })
            setRating(0)
        } catch (error) {
            setStatus({ type: 'error', msg: 'Failed to submit review. Please try again later.' })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="room-section bedroom-section bg-[#0F0A14] text-[#f0e8ff] min-h-screen relative py-12 sm:py-16 px-4 overflow-hidden z-20 flex flex-col justify-center">

            {/* Background Container */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="parallax-bg absolute inset-[-5%] bg-[url('https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-85"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/50 to-black/90"></div>
            </div>

            {/*
              * CSS-only starfield — replaces the Three.js Canvas that was here.
              * Two active WebGL contexts during scroll caused significant GPU load.
              * Pre-computed positions prevent Math.random() jank on re-renders.
              * Stars use the existing `starTwinkle` keyframe from animations.css.
            */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden" aria-hidden="true">
                {STAR_POSITIONS.map((star, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-white"
                        style={{
                            top: star.top,
                            left: star.left,
                            width: `${2 * star.scale}px`,
                            height: `${2 * star.scale}px`,
                            opacity: star.dim ? 0.2 : 0.6,
                            animation: `starTwinkle ${2 + (i % 3)}s ease-in-out ${star.delay} infinite`
                        }}
                    />
                ))}
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto mb-10 sm:mb-16 flex justify-center mt-8 sm:mt-12 px-4">
                {/* Curtains overlay */}
                <div className="curtain-left absolute -left-32 -top-64 w-96 h-[150vh] bg-gradient-to-r from-white/10 to-transparent blur-3xl rounded-[100%] pointer-events-none transform -rotate-12"></div>
                <div className="curtain-right absolute -right-32 -top-64 w-96 h-[150vh] bg-gradient-to-l from-white/10 to-transparent blur-3xl rounded-[100%] pointer-events-none transform rotate-12"></div>

                <h2 className="text-3xl sm:text-5xl md:text-7xl font-serif text-[#C084FC] mix-blend-screen drop-shadow-xl text-center max-w-2xl px-4 sm:px-8 tracking-wide">
                    "The greatest compliment we receive is simply when our clients say, 'I'm home.'"
                </h2>
            </div>

            {/* Reviews Grid */}
            <div className="reviews-grid relative z-20 w-full max-w-6xl mx-auto flex flex-col gap-8 sm:gap-12 md:gap-16 px-4 mb-10 sm:mb-16">
                {mockReviews.map((review, i) => (
                    <div
                        key={review.id}
                        className={`review-card w-full max-w-lg shadow-[0_20px_40px_rgba(0,0,0,0.5)] ${i % 2 === 0 ? 'self-start' : 'self-end'} text-[#1a1a1a] p-6 sm:p-8 md:p-12 hover:z-50 hover:scale-[1.02] sm:hover:scale-[1.05] transition-transform duration-300 relative`}
                        style={{
                            backgroundColor: '#f5f0e8',
                            border: '1px solid #d4c9b0',
                            fontFamily: "'Lora', serif"
                        }}
                    >
                        {/* Stars */}
                        <div className="flex gap-1 mb-4 sm:mb-6">
                            {[1, 2, 3, 4, 5].map(s => (
                                <Star key={s} className="w-4 h-4 sm:w-5 sm:h-5 text-[#C9A84C] fill-[#C9A84C] opacity-90" />
                            ))}
                        </div>

                        <p className="text-base sm:text-lg leading-loose italic mb-6 sm:mb-10 text-gray-700">"{review.text}"</p>

                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shadow-inner border border-[#d4c9b0] shrink-0">
                                <div className="w-full h-full bg-[#eadecd] flex items-center justify-center font-serif text-base sm:text-lg text-gray-500">
                                    {review.name.charAt(0)}
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-bold tracking-wide text-xs sm:text-sm">{review.name}</span>
                                <span className="text-xs text-gray-500 uppercase tracking-widest">{review.type} | {review.city}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Wall Certificate — visible on sm+ */}
            <div className="relative z-10 w-full flex justify-center items-center mb-10 sm:mb-16 px-4 hidden sm:flex">
                <div className="max-w-md bg-[#F8F6F0] p-6 sm:p-8 border-8 border-double border-[#8B6914] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rotate-1 flex flex-col items-center">
                    <h4 className="font-['Playfair_Display'] text-3xl sm:text-4xl text-[#1a1a1a] mb-2 tracking-widest uppercase">Certify</h4>
                    <div className="w-8 h-px bg-[#8B6914] mb-6"></div>
                    <div className="flex flex-col gap-4 text-center font-serif text-gray-700">
                        <p><strong className="text-xl sm:text-2xl text-[#8B6914]">4.9 ⭐</strong> Average Rating</p>
                        <p><strong className="text-xl sm:text-2xl text-[#8B6914]">150+</strong> Delighted Clients</p>
                        <p><strong className="text-xl sm:text-2xl text-[#8B6914]">100%</strong> On-time Delivery</p>
                    </div>
                </div>
            </div>

            {/* Review Form */}
            <div className="relative z-20 w-full max-w-2xl mx-auto pb-10 sm:pb-16 px-4 mt-8 sm:mt-16">
                <h3 className="text-3xl sm:text-4xl font-serif text-center mb-8 sm:mb-12 text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">Share Your Experience</h3>

                <form onSubmit={handleSubmit} className="bg-black/60 backdrop-blur-xl border border-white/20 p-5 sm:p-6 md:p-12 rounded-xl text-white flex flex-col gap-5 sm:gap-6 shadow-[0_30px_60px_rgba(0,0,0,0.8)]">

                    {status.msg && (
                        <div className={`p-4 rounded border text-sm text-center ${status.type === 'error' ? 'bg-red-500/20 border-red-500/50 text-red-100' : 'bg-green-500/20 border-green-500/50 text-green-100'}`}>
                            {status.msg}
                        </div>
                    )}

                    <div className="flex justify-center gap-2 mb-4">
                        {[1, 2, 3, 4, 5].map(star => (
                            <Star
                                key={star}
                                onClick={() => setRating(star)}
                                className={`w-8 h-8 sm:w-10 sm:h-10 cursor-pointer transition-all ${rating >= star ? 'text-[#C9A84C] fill-[#C9A84C] hover:scale-110 drop-shadow-[0_0_10px_rgba(201,168,76,0.6)]' : 'text-gray-500/50 hover:text-[#C9A84C]/50'}`}
                            />
                        ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 w-full">
                        <input type="text" name="clientName" value={formData.clientName} onChange={handleChange} required placeholder="Your Name" className="bg-transparent border-b border-white/50 py-3 focus:outline-none focus:border-[#C084FC] transition-colors w-full placeholder-gray-400 font-sans text-base sm:text-lg" />
                        <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Project City" className="bg-transparent border-b border-white/50 py-3 focus:outline-none focus:border-[#C084FC] transition-colors w-full placeholder-gray-400 font-sans text-base sm:text-lg" />
                    </div>

                    <textarea name="reviewText" value={formData.reviewText} onChange={handleChange} required rows="4" placeholder="How did you feel working with us? Every word matters..." className="bg-transparent border-b border-white/50 py-3 focus:outline-none focus:border-[#C084FC] transition-colors resize-none w-full mt-2 sm:mt-4 placeholder-gray-400 font-sans text-base sm:text-lg"></textarea>

                    <button type="submit" disabled={loading} className="mt-4 sm:mt-8 bg-[#C084FC] text-[#0F0A14] py-4 rounded font-bold tracking-widest hover:bg-white transition-colors duration-300 shadow-[0_0_20px_rgba(192,132,252,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] disabled:opacity-50">
                        {loading ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
                    </button>
                </form>
            </div>

        </div>
    )
}

export default BedroomReviews
