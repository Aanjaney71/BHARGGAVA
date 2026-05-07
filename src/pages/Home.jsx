import React, { useEffect, useState, useRef } from 'react'
import ExteriorHero from '../components/rooms/ExteriorHero'
import FoyerAbout from '../components/rooms/FoyerAbout'
import LivingRoomProjects from '../components/rooms/LivingRoomProjects'
import KitchenServices from '../components/rooms/KitchenServices'
import BedroomReviews from '../components/rooms/BedroomReviews'
import StudyCareer from '../components/rooms/StudyCareer'
import TerraceContact from '../components/rooms/TerraceContact'
import DoorOpenTransition from '../components/transitions/DoorOpenTransition'
import RoomProgressIndicator from '../components/ui/RoomProgressIndicator'
import SoundToggle from '../components/ui/SoundToggle'
import { useScrollRoom } from '../hooks/useScrollRoom'
import { useRoomStore } from '../store/roomStore'
import { ROOM_LIGHTING } from '../utils/roomConfig'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {

    const [isGateOpen, setIsGateOpen] = useState(false)
    const globalBgRef = useRef(null)

    // Set initial CSS variables on mount
    useEffect(() => {
        Object.entries(ROOM_LIGHTING['exterior']).forEach(([prop, value]) => {
            document.documentElement.style.setProperty(prop, value)
        })
    }, [])

    // Smooth and efficient background zoom parallax effect for transitions across the whole website
    useEffect(() => {
        if (!isGateOpen) return

        let ctx = gsap.context(() => {
            const bgs = gsap.utils.toArray('.parallax-bg')
            bgs.forEach((bg) => {
                gsap.fromTo(bg, {
                    y: "-10%"
                }, {
                    y: "10%",
                    scrollTrigger: {
                        trigger: bg.closest('.room-section'),
                        start: "top bottom",
                        end: "bottom top",
                        scrub: true,
                    }
                })
            })
        })

        return () => ctx.revert()
    }, [isGateOpen])



    // Hook to detect current room based on scroll position triggers
    useScrollRoom()

    const activeRoom = useRoomStore(state => state.activeRoom)

    return (
        <main className={`w-full relative overflow-x-hidden ${!isGateOpen ? 'h-screen overflow-y-hidden' : ''}`}>



            {/* Room 1 */}
            <div className="relative z-10" id="exterior-room"><ExteriorHero isGateOpen={isGateOpen} /></div>

            <DoorOpenTransition onOpen={() => setIsGateOpen(true)} />

            <div className="main-room-container relative z-10 w-full overflow-hidden">
                {/* Room 2 */}
                <div id="foyer-room"><FoyerAbout /></div>

                {/* Room 3 */}
                <div id="living-room"><LivingRoomProjects /></div>

                {/* Room 4 */}
                <div id="kitchen-room"><KitchenServices /></div>

                {/* Room 5 */}
                <div id="bedroom-room"><BedroomReviews /></div>

                {/* Room 6 */}
                <div id="study-room"><StudyCareer /></div>

                {/* Room 7 */}
                <div id="terrace-room"><TerraceContact /></div>
            </div>

            {/* UI Elements */}
            <div className="relative z-50">
                <RoomProgressIndicator activeRoom={activeRoom} />
                <SoundToggle />
            </div>

        </main>
    )
}
