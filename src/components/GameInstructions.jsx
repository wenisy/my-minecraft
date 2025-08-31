import React, { useState } from 'react'
import './GameInstructions.css'

function GameInstructions() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleInstructions = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button className="instructions-toggle" onClick={toggleInstructions}>
        帮助
      </button>
      {isOpen && (
        <div className="instructions-overlay" onClick={toggleInstructions}>
          <div className="instructions-modal" onClick={(e) => e.stopPropagation()}>
            <h2>🎮 游戏说明</h2>

            <div className="instructions-section">
              <h3>移动控制</h3>
              <ul>
                <li><strong>WASD</strong> - 移动玩家</li>
                <li><strong>鼠标拖拽</strong> - 旋转视角</li>
                <li><strong>鼠标滚轮</strong> - 缩放视角</li>
              </ul>
            </div>

            <div className="instructions-section">
              <h3>建造系统</h3>
              <ul>
                <li><strong>右键点击地面</strong> - 放置方块</li>
                <li><strong>左键点击方块</strong> - 破坏方块</li>
                <li><strong>点击背包</strong> - 选择方块类型</li>
              </ul>
            </div>

            <div className="instructions-section">
              <h3>方块类型</h3>
              <div className="block-types">
                <div className="block-type">
                  <div className="block-sample dirt"></div>
                  <span>泥土</span>
                </div>
                <div className="block-type">
                  <div className="block-sample stone"></div>
                  <span>石头</span>
                </div>
                <div className="block-type">
                  <div className="block-sample wood"></div>
                  <span>木头</span>
                </div>
                <div className="block-type">
                  <div className="block-sample grass"></div>
                  <span>草地</span>
                </div>
                <div className="block-type">
                  <div className="block-sample water"></div>
                  <span>水</span>
                </div>
                <div className="block-type">
                  <div className="block-sample sand"></div>
                  <span>沙子</span>
                </div>
                <div className="block-type">
                  <div className="block-sample snow"></div>
                  <span>雪</span>
                </div>
              </div>
            </div>

            <div className="instructions-section">
              <h3>世界特色</h3>
              <ul>
                <li><strong>🏔️ 山脉</strong> - 中央区域的山地地形</li>
                <li><strong>🌊 水域</strong> - 湖泊和海洋</li>
                <li><strong>🌳 森林</strong> - 自动生成的树木</li>
                <li><strong>🌱 草地</strong> - 绿色植被区域</li>
                <li><strong>☁️ 云朵</strong> - 天空中的云层</li>
              </ul>
            </div>

            <button className="close-button" onClick={toggleInstructions}>
              关闭
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default GameInstructions