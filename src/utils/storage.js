// 本地存储工具函数
export const saveGameState = (state) => {
  try {
    const gameState = {
      blocks: state.blocks,
      selectedBlockType: state.selectedBlockType,
      timestamp: Date.now()
    }
    localStorage.setItem('minecraft-game-state', JSON.stringify(gameState))
    return true
  } catch (error) {
    console.error('保存游戏状态失败:', error)
    return false
  }
}

export const loadGameState = () => {
  try {
    const savedState = localStorage.getItem('minecraft-game-state')
    if (savedState) {
      return JSON.parse(savedState)
    }
  } catch (error) {
    console.error('加载游戏状态失败:', error)
  }
  return null
}

export const clearGameState = () => {
  try {
    localStorage.removeItem('minecraft-game-state')
    return true
  } catch (error) {
    console.error('清除游戏状态失败:', error)
    return false
  }
}