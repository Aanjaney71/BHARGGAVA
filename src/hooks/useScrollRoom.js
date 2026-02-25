import { useEffect } from 'react'
import { useRoomStore } from '../store/roomStore'

export const useScrollRoom = () => {
    const setActiveRoom = useRoomStore(state => state.setActiveRoom)

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when section passes middle of screen
            threshold: 0
        }

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id.replace('-room', '')
                    setActiveRoom(id)
                }
            })
        }

        const observer = new IntersectionObserver(observerCallback, observerOptions)

        const elements = document.querySelectorAll('[id$="-room"]')
        elements.forEach(el => observer.observe(el))

        return () => observer.disconnect()
    }, [setActiveRoom])
}
