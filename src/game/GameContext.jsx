import React, { createContext, useContext, useState } from 'react'

const GameContext = createContext()

export function useGame() {
  return useContext(GameContext)
}

export function GameProvider({ children }) {
  const [blocks, setBlocks] = useState([
    { id: 1, position: [0, 1, 0], type: 'dirt' },
    { id: 2, position: [1, 1, 0], type: 'stone' },
    { id: 3, position: [0, 1, 1], type: 'wood' },
  ])

  const [selectedBlockType, setSelectedBlockType] = useState('dirt')

  const addBlock = (position) => {
    const newBlock = {
      id: Date.now(),
      position,
      type: selectedBlockType
    }
    setBlocks(prev => [...prev, newBlock])
  }

  const removeBlock = (id) => {
    setBlocks(prev => prev.filter(block => block.id !== id))
  }

  const value = {
    blocks,
    selectedBlockType,
    setSelectedBlockType,
    addBlock,
    removeBlock
  }

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  )
}