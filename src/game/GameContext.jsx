import React, { createContext, useContext, useState, useEffect } from 'react'
import { saveGameState, loadGameState } from '../utils/storage'

const GameContext = createContext()

export function useGame() {
  return useContext(GameContext)
}

export function GameProvider({ children }) {
  // 加载保存的游戏状态
  const savedState = loadGameState()

  const [blocks, setBlocks] = useState(savedState?.blocks || [
    { id: 1, position: [0, 1, 0], type: 'dirt' },
    { id: 2, position: [1, 1, 0], type: 'stone' },
    { id: 3, position: [0, 1, 1], type: 'wood' },
    { id: 4, position: [-1, 1, 0], type: 'grass' },
    { id: 5, position: [0, 1, -1], type: 'water' },
  ])

  const [selectedBlockType, setSelectedBlockType] = useState(savedState?.selectedBlockType || 'dirt')
  const [particles, setParticles] = useState([])

  const addBlock = (position) => {
    const newBlock = {
      id: Date.now(),
      position,
      type: selectedBlockType
    }
    setBlocks(prev => [...prev, newBlock])
  }

  const removeBlock = (id) => {
    const block = blocks.find(b => b.id === id)
    if (block) {
      // 添加粒子效果
      setParticles(prev => [...prev, {
        id: Date.now(),
        position: block.position,
        active: true
      }])
    }
    setBlocks(prev => prev.filter(block => block.id !== id))
  }

  const removeParticle = (id) => {
    setParticles(prev => prev.filter(p => p.id !== id))
  }

  // 自动保存游戏状态
  useEffect(() => {
    const gameState = {
      blocks,
      selectedBlockType,
      timestamp: Date.now()
    }
    saveGameState(gameState)
  }, [blocks, selectedBlockType])

  const saveGame = () => {
    const gameState = {
      blocks,
      selectedBlockType,
      timestamp: Date.now()
    }
    return saveGameState(gameState)
  }

  const loadGame = () => {
    const savedState = loadGameState()
    if (savedState) {
      setBlocks(savedState.blocks || [])
      setSelectedBlockType(savedState.selectedBlockType || 'dirt')
      return true
    }
    return false
  }

  const value = {
    blocks,
    selectedBlockType,
    setSelectedBlockType,
    addBlock,
    removeBlock,
    particles,
    removeParticle,
    saveGame,
    loadGame
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}