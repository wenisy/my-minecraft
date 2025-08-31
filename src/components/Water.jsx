import React from 'react'
import * as THREE from 'three'

function Water() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
      <planeGeometry args={[100, 100, 32, 32]} />
      <meshLambertMaterial
        color="#4a90e2"
        transparent
        opacity={0.7}
        side={THREE.DoubleSide}
      />
    </mesh>
  )
}

export default Water