import React from 'react'
import { Canvas } from '@react-three/fiber'
import { Sky } from '@react-three/drei'
import { GameProvider } from './game/GameContext'
import GameWorld from './components/GameWorld'
import Inventory from './components/Inventory'
import './App.css'

function App() {
  return (
    <GameProvider>
      <div className="app">
        <Canvas
          camera={{ position: [0, 10, 10], fov: 75 }}
          style={{ width: '100vw', height: '100vh' }}
        >
          <Sky sunPosition={[100, 20, 100]} />
          <GameWorld />
        </Canvas>
        <Inventory />
      </div>
    </GameProvider>
  )
}

export default App
