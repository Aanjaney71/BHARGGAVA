import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

/**
 * DoorOpenTransition — Pure CSS + GSAP gate animation.
 * 
 * Replaces the previous video-based intro (which required loading /gate-animation.mp4).
 * Two door panels slide open using the existing .door-panel-left / .door-panel-right
 * CSS classes defined in animations.css, creating an instant, dependency-free intro.
 * 
 * Flow:
 *   1. Door panels are visible on mount (covering the full screen)
 *   2. After 0.8s — panels animate open (rotate on Y axis with perspective)
 *   3. After animation completes — onOpen() callback fires, container hidden
 */
const DoorOpenTransition = ({ onOpen }) => {
    const containerRef = useRef()
    const leftPanelRef = useRef()
    const rightPanelRef = useRef()
    const glowRef = useRef()
    const hasOpened = useRef(false)

    useEffect(() => {
        if (hasOpened.current) return
        hasOpened.current = true

        // Short pause to let the page render before opening
        const timer = setTimeout(() => {
            const tl = gsap.timeline()

            // 1. Subtle glow effect in the door crack
            tl.to(glowRef.current, {
                opacity: 1,
                duration: 0.6,
                ease: 'power2.in'
            })

            // 2. Both door panels swing open simultaneously
            tl.to(leftPanelRef.current, {
                rotateY: -110,
                duration: 1.4,
                ease: 'power2.inOut'
            }, '-=0.2')

            tl.to(rightPanelRef.current, {
                rotateY: 110,
                duration: 1.4,
                ease: 'power2.inOut'
            }, '<')

            // 3. Fade out the whole overlay
            tl.to(containerRef.current, {
                opacity: 0,
                duration: 0.5,
                ease: 'power1.out',
                onStart: () => {
                    // Trigger hero text animations as doors open
                    if (onOpen) onOpen()
                },
                onComplete: () => {
                    if (containerRef.current) {
                        containerRef.current.style.display = 'none'
                    }
                }
            }, '-=0.4')
        }, 800)

        return () => clearTimeout(timer)
    }, [onOpen])

    return (
        <div
            ref={containerRef}
            className="door-container"
            aria-hidden="true"
        >
            {/* Left door panel */}
            <div ref={leftPanelRef} className="door-panel-left">
                {/* Door detailing */}
                <div style={{
                    position: 'absolute', inset: '10%', border: '1px solid rgba(139,105,20,0.4)',
                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)'
                }} />
                <div style={{
                    position: 'absolute', top: '20%', left: '15%', right: '15%', height: '35%',
                    border: '1px solid rgba(139,105,20,0.3)', background: 'rgba(0,0,0,0.2)'
                }} />
                <div style={{
                    position: 'absolute', bottom: '15%', left: '15%', right: '15%', height: '30%',
                    border: '1px solid rgba(139,105,20,0.3)', background: 'rgba(0,0,0,0.2)'
                }} />
                {/* Handle */}
                <div style={{
                    position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)',
                    width: '12px', height: '60px', background: 'linear-gradient(180deg, #C9A84C, #8B6914)',
                    borderRadius: '6px', boxShadow: '0 0 10px rgba(201,168,76,0.3)'
                }} />
            </div>

            {/* Central glow when door is about to open */}
            <div ref={glowRef} className="door-glow" style={{ opacity: 0 }} />

            {/* Right door panel */}
            <div ref={rightPanelRef} className="door-panel-right">
                {/* Door detailing */}
                <div style={{
                    position: 'absolute', inset: '10%', border: '1px solid rgba(139,105,20,0.4)',
                    boxShadow: 'inset 0 0 30px rgba(0,0,0,0.5)'
                }} />
                <div style={{
                    position: 'absolute', top: '20%', left: '15%', right: '15%', height: '35%',
                    border: '1px solid rgba(139,105,20,0.3)', background: 'rgba(0,0,0,0.2)'
                }} />
                <div style={{
                    position: 'absolute', bottom: '15%', left: '15%', right: '15%', height: '30%',
                    border: '1px solid rgba(139,105,20,0.3)', background: 'rgba(0,0,0,0.2)'
                }} />
                {/* Handle */}
                <div style={{
                    position: 'absolute', left: '8%', top: '50%', transform: 'translateY(-50%)',
                    width: '12px', height: '60px', background: 'linear-gradient(180deg, #C9A84C, #8B6914)',
                    borderRadius: '6px', boxShadow: '0 0 10px rgba(201,168,76,0.3)'
                }} />
            </div>

            {/* Firm name plate above the door */}
            <div style={{
                position: 'absolute', top: '50%', left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10, textAlign: 'center', pointerEvents: 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px'
            }}>
                <div style={{
                    color: '#C9A84C', fontFamily: "'Playfair Display', serif",
                    fontSize: 'clamp(1rem, 3vw, 1.5rem)', letterSpacing: '0.3em',
                    textTransform: 'uppercase', whiteSpace: 'nowrap',
                    textShadow: '0 0 20px rgba(201,168,76,0.8)'
                }}>
                    Shree Bhargava
                </div>
                <div style={{ width: '60px', height: '1px', background: '#8B6914' }} />
                <div style={{
                    color: 'rgba(201,168,76,0.7)', fontFamily: "'Inter', sans-serif",
                    fontSize: 'clamp(0.6rem, 2vw, 0.75rem)', letterSpacing: '0.5em', textTransform: 'uppercase'
                }}>
                    & Associate
                </div>
            </div>
        </div>
    )
}

export default DoorOpenTransition
