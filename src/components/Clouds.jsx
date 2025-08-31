import React, { useMemo } from 'react'
import * as THREE from 'three'

function Clouds() {
  const clouds = useMemo(() => {
    const cloudPositions = []
    const cloudScales = []

    // 生成云朵位置
    for (let i = 0; i < 15; i++) {
      const x = (Math.random() - 0.5) * 200
      const y = 15 + Math.random() * 10
      const z = (Math.random() - 0.5) * 200
      const scale = 0.8 + Math.random() * 0.4

      cloudPositions.push([x, y, z])
      cloudScales.push(scale)
    }

    return { cloudPositions, cloudScales }
  }, [])

  return (
    <group>
      {clouds.cloudPositions.map((position, index) => (
        <mesh key={`cloud-${index}`} position={position} scale={clouds.cloudScales[index]}>
          <sphereGeometry args={[3, 8, 6]} />
          <meshLambertMaterial
            color="#ffffff"
            transparent
            opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  )
}

export default Clouds