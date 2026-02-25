import { create } from 'zustand'
import { ROOM_LIGHTING } from '../utils/roomConfig'
import { Howl, Howler } from 'howler'

const sounds = {
    exterior: new Howl({ src: ['/sounds/exterior.mp3'], loop: true, volume: 0 }),
    foyer: new Howl({ src: ['/sounds/foyer.mp3'], loop: true, volume: 0 }),
    livingroom: new Howl({ src: ['/sounds/livingroom.mp3'], loop: true, volume: 0 }),
    kitchen: new Howl({ src: ['/sounds/kitchen.mp3'], loop: true, volume: 0 }),
    bedroom: new Howl({ src: ['/sounds/bedroom.mp3'], loop: true, volume: 0 }),
    study: new Howl({ src: ['/sounds/study.mp3'], loop: true, volume: 0 }),
    terrace: new Howl({ src: ['/sounds/terrace.mp3'], loop: true, volume: 0 })
}

export const useRoomStore = create((set, get) => ({
    activeRoom: 'exterior',
    soundEnabled: false,
    setActiveRoom: (room) => {
        if (get().activeRoom !== room) {
            set({ activeRoom: room })

            // Update CSS Variables for lighting
            if (ROOM_LIGHTING[room]) {
                Object.entries(ROOM_LIGHTING[room]).forEach(([prop, value]) => {
                    document.documentElement.style.setProperty(prop, value)
                })
            }

            // Handle sound transition
            if (get().soundEnabled) {
                const prevRoom = get().activeRoom
                if (sounds[prevRoom]) {
                    sounds[prevRoom].fade(0.3, 0, 1500)
                    setTimeout(() => { if (sounds[prevRoom]) sounds[prevRoom].stop() }, 1500)
                }
                if (sounds[room]) {
                    sounds[room].play()
                    sounds[room].fade(0, 0.3, 1500)
                }
            }
        }
    },
    toggleSound: () => {
        const newState = !get().soundEnabled
        set({ soundEnabled: newState })
        const currentRoom = get().activeRoom

        if (newState) {
            if (sounds[currentRoom]) {
                sounds[currentRoom].play()
                sounds[currentRoom].fade(0, 0.3, 1000)
            }
        } else {
            Object.values(sounds).forEach(s => {
                s.fade(s.volume(), 0, 1000)
                setTimeout(() => s.stop(), 1000)
            })
        }
    }
}))
