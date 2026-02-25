import React, { useState } from 'react'
import gsap from 'gsap'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Plus } from 'lucide-react'

const RATES = {
    metro: { basic: 1800, standard: 2500, luxury: 4000 },
    tier2: { basic: 1400, standard: 2000, luxury: 3200 },
    tier3: { basic: 1100, standard: 1600, luxury: 2600 }
}

const CostCalculator = () => {
    const [formData, setFormData] = useState({
        city: 'metro',
        type: 'residential',
        area: '',
        floors: 1,
        finish: 'standard'
    })

    const [result, setResult] = useState(null)

    const handleCalculate = (e) => {
        e.preventDefault()
        if (!formData.area) return

        const baseRate = RATES[formData.city][formData.finish]
        const min = baseRate * Number(formData.area) * Number(formData.floors)
        const max = min * 1.25

        const inLakhs = (n) => (n / 100000).toFixed(1)

        setResult({
            min: inLakhs(min),
            max: inLakhs(max)
        })

        // Animate numbers counting up on result
        setTimeout(() => {
            gsap.fromTo(".result-lakhs",
                { innerHTML: 0, opacity: 0, y: 20 },
                {
                    innerHTML: 100, // Dummy animate to
                    opacity: 1, y: 0,
                    duration: 1,
                    ease: "power2.out",
                    snap: { innerHTML: 1 }
                } // We will just animate opacity/Y in reality since the actual value is fixed text
            )
        }, 100)
    }

    return (
        <div className="w-full max-w-2xl mx-auto bg-white/80 backdrop-blur rounded-xl shadow-2xl p-5 sm:p-8 border border-gray-100">
            <div className="flex items-center gap-4 mb-8 pb-4 border-b border-gray-200 border-dashed">
                {/* Measuring scale graphic */}
                <div className="h-6 w-full max-w-xs bg-gray-100 flex shadow-inner overflow-hidden">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                        <div key={i} className={`flex-1 flex text-[8px] justify-between border-l border-gray-300 ${i % 5 === 0 ? 'bg-red-50 text-red-800 font-bold' : ''}`}>
                            <span className="p-[2px]">{i}</span>
                        </div>
                    ))}
                </div>
                <h3 className="text-xl font-serif text-[#2d3a1e] font-bold">Measure Your Project</h3>
            </div>

            <form onSubmit={handleCalculate} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-gray-500 font-medium">City Type</label>
                        <select
                            className="w-full bg-transparent border-b-2 border-gray-300 py-2 focus:border-[#8B6914] focus:outline-none transition-colors"
                            value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })}
                        >
                            <option value="metro">Metro City</option>
                            <option value="tier2">Tier 2 City</option>
                            <option value="tier3">Tier 3 City</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-gray-500 font-medium">Project Type</label>
                        <select
                            className="w-full bg-transparent border-b-2 border-gray-300 py-2 focus:border-[#8B6914] focus:outline-none transition-colors"
                            value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })}
                        >
                            <option value="residential">Residential</option>
                            <option value="commercial">Commercial</option>
                            <option value="interior">Interior Only</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2 relative group">
                        <label className="text-xs uppercase tracking-wider text-gray-500 font-medium">Plot Area (sqft)</label>
                        <input
                            type="number" min="100" placeholder="e.g. 2400" required
                            className="w-full bg-transparent border-b-2 border-gray-300 py-2 focus:border-[#8B6914] focus:outline-none transition-colors"
                            value={formData.area} onChange={e => setFormData({ ...formData, area: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs uppercase tracking-wider text-gray-500 font-medium">Floors</label>
                        <input
                            type="number" min="1" max="10" required
                            className="w-full bg-transparent border-b-2 border-gray-300 py-2 focus:border-[#8B6914] focus:outline-none transition-colors"
                            value={formData.floors} onChange={e => setFormData({ ...formData, floors: e.target.value })}
                        />
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <label className="text-xs uppercase tracking-wider text-gray-500 font-medium block">Finish Level</label>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
                        {['basic', 'standard', 'luxury'].map(level => (
                            <label key={level} className={`
                        flex-1 cursor-pointer py-3 px-2 sm:px-4 text-center rounded text-sm transition-all
                        ${formData.finish === level ? 'bg-[#8B6914] text-white shadow-md' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
                    `}>
                                <input
                                    type="radio" name="finish" value={level} className="hidden"
                                    checked={formData.finish === level} onChange={e => setFormData({ ...formData, finish: e.target.value })}
                                />
                                <span className="capitalize">{level}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <button type="submit" className="w-full bg-[#2d3a1e] text-[#f5f0e8] py-4 rounded font-medium tracking-widest hover:bg-[#3a4a2a] transition-colors mt-8">
                    CALCULATE ESTIMATE
                </button>
            </form>

            <AnimatePresence>
                {result && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-8 pt-8 border-t border-gray-200 text-center overflow-hidden"
                    >
                        <div className="text-sm text-gray-500 uppercase tracking-widest mb-2 font-medium">Estimated Range</div>
                        <div className="text-4xl md:text-5xl font-serif text-[#1a1a1a] result-lakhs">
                            <span className="bg-gradient-to-r from-yellow-200 to-[#C9A84C]/40 px-2 rounded">
                                ₹{result.min}L — ₹{result.max}L
                            </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-4 max-w-sm mx-auto">
                            *This is a rough estimate. Material costs fluctuate. For an exact quote, let's look at the floorplans.
                        </p>
                        <button className="mt-6 border-b-2 border-[#8B6914] text-[#8B6914] pb-1 uppercase tracking-widest text-sm hover:text-black hover:border-black transition-colors">
                            Get Exact Quote
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}

export default CostCalculator
