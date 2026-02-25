import React from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useRoomStore } from '../../store/roomStore'

const SoundToggle = () => {
    const { soundEnabled, toggleSound } = useRoomStore()

    return (
        <button
            onClick={toggleSound}
            className={`fixed top-8 right-8 z-[100] p-3 rounded-full border border-white/20 backdrop-blur-md shadow-2xl transition-all duration-300 group
        ${soundEnabled ? 'bg-white/10 hover:bg-white/20' : 'bg-black/50 hover:bg-black/70'}
      `}
            aria-label="Toggle Sound"
        >
            {soundEnabled ? (
                <Volume2 className="text-[#C9A84C] group-hover:scale-110 transition-transform w-5 h-5" />
            ) : (
                <VolumeX className="text-white/50 group-hover:scale-110 transition-transform w-5 h-5" />
            )}

            {/* Tooltip */}
            <div className="absolute top-full right-0 mt-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-3 py-1 rounded text-xs tracking-widest text-[#C9A84C] pointer-events-none">
                {soundEnabled ? 'SOUND: ON' : 'SOUND: OFF'}
            </div>
        </button>
    )
}

export default SoundToggle
