import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const ParticleSystem = ({ count = 300, color = "#F59E0B" }) => {
    const pointsRef = useRef()
    const posRef = useRef()

    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3)
        posRef.current = new Float32Array(count * 3)
        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * 20
            const y = (Math.random() - 0.5) * 10
            const z = (Math.random() - 0.5) * 8
            pos[i * 3] = x
            pos[i * 3 + 1] = y
            pos[i * 3 + 2] = z
            posRef.current[i * 3] = x
            posRef.current[i * 3 + 1] = y
            posRef.current[i * 3 + 2] = z
        }
        return pos
    }, [count])

    useFrame(({ clock }) => {
        if (!pointsRef.current) return
        const t = clock.elapsedTime
        const geometry = pointsRef.current.geometry
        const pos = geometry.attributes.position.array

        for (let i = 0; i < count; i++) {
            pos[i * 3 + 1] = posRef.current[i * 3 + 1] + Math.sin(t * 0.5 + i) * 0.2
            pos[i * 3] = posRef.current[i * 3] + Math.cos(t * 0.3 + i) * 0.1
        }
        geometry.attributes.position.needsUpdate = true
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color={color}
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

export default ParticleSystem
