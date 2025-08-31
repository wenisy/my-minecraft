import React from 'react'
import * as THREE from 'three'

function Block({ position, type, onClick }) {
  const getBlockColor = (blockType) => {
    switch (blockType) {
      case 'dirt':
        return '#8B4513'
      case 'stone':
        return '#696969'
      case 'wood':
        return '#D2691E'
      case 'grass':
        return '#4a7c59'
      default:
        return '#808080'
    }
  }

  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={[1, 1, 1]} />
      <meshLambertMaterial color={getBlockColor(type)} />
    </mesh>
  )
}

export default Block