import React from 'react'
import { useMemo } from 'react'
import * as THREE from 'three'

function Terrain({ onClick }) {
  const terrainGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(100, 100, 50, 50)
    const positions = geometry.attributes.position.array

    // 简单的噪声地形生成
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const z = positions[i + 2]
      positions[i + 1] = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 2
    }

    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()

    return geometry
  }, [])

  return (
    <mesh
      geometry={terrainGeometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      onClick={onClick}
    >
      <meshLambertMaterial color="#4a7c59" />
    </mesh>
  )
}

export default Terrain