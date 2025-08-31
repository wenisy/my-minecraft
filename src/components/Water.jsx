import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Water() {
  const waterRef = useRef()

  useFrame((state) => {
    if (waterRef.current) {
      // 创建波浪动画
      const time = state.clock.getElapsedTime()
      const geometry = waterRef.current.geometry

      if (geometry.attributes.position) {
        const positions = geometry.attributes.position.array

        for (let i = 0; i < positions.length; i += 3) {
          const x = positions[i]
          const z = positions[i + 2]

          // 创建多个波浪层
          const wave1 = Math.sin(x * 0.02 + time * 2) * Math.cos(z * 0.02 + time * 2) * 0.3
          const wave2 = Math.sin(x * 0.05 + time * 3) * Math.cos(z * 0.05 + time * 3) * 0.1
          const wave3 = Math.sin(x * 0.01 + time * 1) * Math.cos(z * 0.01 + time * 1) * 0.5

          positions[i + 1] = wave1 + wave2 + wave3 - 1 // 保持水面在y=-1位置
        }

        geometry.attributes.position.needsUpdate = true
        geometry.computeVertexNormals()
      }
    }
  })

  return (
    <mesh ref={waterRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[100, 100, 64, 64]} />
      <meshLambertMaterial
        color="#4a90e2"
        transparent
        opacity={0.8}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default Water