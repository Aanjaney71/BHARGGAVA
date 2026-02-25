import React from 'react'

const rooms = [
    { id: 'exterior', icon: '🏠', label: 'Entrance' },
    { id: 'foyer', icon: '🚪', label: 'Foyer' },
    { id: 'living', icon: '🛋️', label: 'Our Work' },
    { id: 'kitchen', icon: '🍳', label: 'Services' },
    { id: 'bedroom', icon: '🛏️', label: 'Reviews' },
    { id: 'study', icon: '📚', label: 'Join Us' },
    { id: 'terrace', icon: '🌿', label: 'Contact' }
]

const RoomProgressIndicator = ({ activeRoom = 'exterior' }) => {
    const scrollTo = (id) => {
        document.getElementById(`${id}-room`)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-4">
            <div className="absolute top-0 bottom-0 w-[1px] bg-white/20 -z-10" />

            {rooms.map((room) => {
                const isActive = activeRoom === room.id
                return (
                    <div
                        key={room.id}
                        onClick={() => scrollTo(room.id)}
                        className="group relative flex items-center justify-center cursor-pointer px-4 py-2"
                    >
                        <div className={`
              rounded-full transition-all duration-300
              ${isActive ? 'w-5 h-5 bg-[#C9A84C] shadow-[0_0_15px_#C9A84C]' : 'w-3 h-3 border-2 border-white/60 hover:bg-white/40 hover:scale-125'}
            `} />

                        {/* Tooltip */}
                        <div className={`
              absolute right-8 px-3 py-1 bg-black/80 backdrop-blur top-1/2 -translate-y-1/2 
              whitespace-nowrap rounded text-sm text-white border border-white/10
              transition-all duration-300 pointer-events-none
              ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}
            `}>
                            {room.icon} {room.label}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default RoomProgressIndicator
