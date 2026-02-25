import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'

const DoorOpenTransition = ({ onOpen }) => {
    const containerRef = useRef()
    const videoRef = useRef()
    const isFading = useRef(false)

    useEffect(() => {
        if (videoRef.current) {
            // Autoplay the video (muted is required by browsers for autoplay)
            videoRef.current.play().catch(e => console.log("Auto-play prevented", e))
        }
    }, [])

    const triggerFadeOut = () => {
        if (isFading.current) return;
        isFading.current = true;

        // Tell the ExteriorHero to start animating its text immediately
        if (onOpen) onOpen()

        // 1. Cinematic push-in and blur on the video itself
        gsap.to(videoRef.current, {
            scale: 1.15,
            filter: "blur(15px)",
            opacity: 0,
            duration: 2.0,
            ease: "power2.inOut"
        })

        // 2. Smoothly cross-fade and remove the container
        gsap.to(containerRef.current, {
            opacity: 0,
            duration: 2.0,
            ease: "power2.inOut",
            onComplete: () => {
                if (containerRef.current) {
                    containerRef.current.style.display = 'none'
                }
            }
        })
    }

    const handleTimeUpdate = (e) => {
        const video = e.target;
        // Trigger the fadeout transition 1.5 seconds before the video ends to avoid the hard cut
        if (video.duration > 0 && (video.duration - video.currentTime) < 1.5) {
            triggerFadeOut();
        }
    };

    const handleVideoEnd = () => {
        // Fallback in case timeupdate missed the window
        triggerFadeOut();
    }

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[999] bg-black flex flex-col items-center justify-center overflow-hidden selection:bg-transparent pointer-events-none"
        >
            <video
                ref={videoRef}
                className="w-full h-full object-cover origin-center"
                autoPlay
                muted
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnd}
            >
                <source src="/gate-animation.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    )
}

export default DoorOpenTransition
