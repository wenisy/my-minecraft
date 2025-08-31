import React, { useRef } from 'react'
import { OrbitControls } from '@react-three/drei'
import { useGame } from '../game/GameContext'
import Terrain from './Terrain'
import Player from './Player'
import Block from './Block'
import Water from './Water'
import Vegetation from './Vegetation'
import Clouds from './Clouds'
import Particles from './Particles'

function GameWorld() {
  const controlsRef = useRef()
  const { blocks, removeBlock, addBlock, particles, removeParticle } = useGame()

  const handleBlockClick = (blockId, event) => {
    event.stopPropagation()
    if (event.button === 0) { // 左键破坏
      removeBlock(blockId)
    }
  }

  const handleGroundClick = (event) => {
    if (event.button === 2) { // 右键放置
      const intersect = event.intersections[0]
      if (intersect) {
        const position = intersect.point
        const newPosition = [
          Math.round(position.x),
          Math.round(position.y) + 1,
          Math.round(position.z)
        ]
        addBlock(newPosition)
      }
    }
  }

  return (
    <>
      <OrbitControls
        ref={controlsRef}
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        maxPolarAngle={Math.PI / 2}
      />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Terrain onClick={handleGroundClick} />
      <Water />
      <Vegetation />
      <Clouds />
      <Player />
      {blocks.map(block => (
        <Block
          key={block.id}
          position={block.position}
          type={block.type}
          onClick={(event) => handleBlockClick(block.id, event)}
        />
      ))}
      {particles.map(particle => (
        <Particles
          key={particle.id}
          position={particle.position}
          active={particle.active}
          onComplete={() => removeParticle(particle.id)}
        />
      ))}
    </>
  )
}

export default GameWorld