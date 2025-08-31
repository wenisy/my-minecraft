import React, { useState } from 'react'
import { useGame } from '../game/GameContext'
import './Inventory.css'

function Inventory() {
  const [isOpen, setIsOpen] = useState(false)
  const { selectedBlockType, setSelectedBlockType } = useGame()
  const [inventory] = useState([
    { id: 1, type: 'dirt', count: 64 },
    { id: 2, type: 'stone', count: 32 },
    { id: 3, type: 'wood', count: 16 },
    { id: 4, type: null, count: 0 },
    { id: 5, type: null, count: 0 },
    { id: 6, type: null, count: 0 },
    { id: 7, type: null, count: 0 },
    { id: 8, type: null, count: 0 },
    { id: 9, type: null, count: 0 },
  ])

  const toggleInventory = () => {
    setIsOpen(!isOpen)
  }

  const selectBlock = (type) => {
    if (type) {
      setSelectedBlockType(type)
    }
  }

  return (
    <>
      <button className="inventory-toggle" onClick={toggleInventory}>
        背包
      </button>
      {isOpen && (
        <div className="inventory">
          <h3>背包</h3>
          <div className="inventory-grid">
            {inventory.map((item) => (
              <div
                key={item.id}
                className={`inventory-slot ${selectedBlockType === item.type ? 'selected' : ''}`}
                onClick={() => selectBlock(item.type)}
              >
                {item.type && (
                  <>
                    <div className={`item-${item.type}`}></div>
                    <span className="item-count">{item.count}</span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Inventory