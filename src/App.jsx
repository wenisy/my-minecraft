import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { GameProvider } from './game/GameContext'
import GameWorld from './components/GameWorld'
import Inventory from './components/Inventory'
import GameInstructions from './components/GameInstructions'
import './App.css'

function App() {
  return (
    <GameProvider>
      <div className="app">
        <Canvas
          camera={{ position: [0, 10, 10], fov: 75 }}
          style={{ width: '100vw', height: '100vh' }}
        >
          <Sky
            distance={450000}
            sunPosition={[0, 1, 0]}
            inclination={0}
            azimuth={0.25}
          />
          <GameWorld />
        </Canvas>
        <Inventory />
        <GameInstructions />
      </div>
    </GameProvider>
  )
}

export default App
