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
      case 'water':
        return '#4a90e2'
      case 'sand':
        return '#f4e4bc'
      case 'snow':
        return '#ffffff'
      default:
        return '#808080'
    }
  }

  const getBlockMaterial = (blockType) => {
    const color = getBlockColor(blockType)
    if (blockType === 'water') {
      return (
        <meshLambertMaterial
          color={color}
          transparent
          opacity={0.7}
        />
      )
    }
    return <meshLambertMaterial color={color} />
  }

  return (
    <mesh position={position} onClick={onClick}>
      <boxGeometry args={[1, 1, 1]} />
      {getBlockMaterial(type)}
    </mesh>
  )
}

export default Block