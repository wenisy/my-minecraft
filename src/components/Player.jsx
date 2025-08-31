import React, { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

function Player() {
  const playerRef = useRef()
  const { camera } = useThree()

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!playerRef.current) return

      const speed = 0.5
      switch (event.code) {
        case 'KeyW':
          playerRef.current.position.z -= speed
          break
        case 'KeyS':
          playerRef.current.position.z += speed
          break
        case 'KeyA':
          playerRef.current.position.x -= speed
          break
        case 'KeyD':
          playerRef.current.position.x += speed
          break
        case 'Space':
          playerRef.current.position.y += speed
          break
        case 'ShiftLeft':
          playerRef.current.position.y -= speed
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useFrame(() => {
    if (playerRef.current) {
      camera.position.copy(playerRef.current.position)
      camera.position.y += 5
      camera.lookAt(playerRef.current.position)
    }
  })

  return (
    <mesh ref={playerRef} position={[0, 2, 0]}>
      <boxGeometry args={[1, 2, 1]} />
      <meshLambertMaterial color="#ff6b6b" />
    </mesh>
  )
}

export default Player