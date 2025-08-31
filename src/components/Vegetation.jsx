import React, { useMemo } from 'react'
import * as THREE from 'three'

// 简单的植被生成
function Vegetation() {
  const trees = useMemo(() => {
    const treePositions = []
    const grassPositions = []

    // 在草地区域生成树木
    for (let i = 0; i < 20; i++) {
      const x = (Math.random() - 0.5) * 80
      const z = (Math.random() - 0.5) * 80
      const height = Math.sin(x * 0.08) * Math.cos(z * 0.08) * 2

      if (height > 0 && height < 3) {
        treePositions.push([x, height + 1, z])
      }
    }

    // 生成草丛
    for (let i = 0; i < 100; i++) {
      const x = (Math.random() - 0.5) * 100
      const z = (Math.random() - 0.5) * 100
      const height = Math.sin(x * 0.08) * Math.cos(z * 0.08) * 2

      if (height > 0 && height < 2) {
        grassPositions.push([x, height + 0.5, z])
      }
    }

    return { treePositions, grassPositions }
  }, [])

  return (
    <group>
      {/* 树木 */}
      {trees.treePositions.map((position, index) => (
        <group key={`tree-${index}`} position={position}>
          {/* 树干 */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.3, 2]} />
            <meshLambertMaterial color="#8B4513" />
          </mesh>
          {/* 树冠 */}
          <mesh position={[0, 1.5, 0]}>
            <sphereGeometry args={[1.2]} />
            <meshLambertMaterial color="#228B22" />
          </mesh>
        </group>
      ))}

      {/* 草丛 */}
      {trees.grassPositions.map((position, index) => (
        <mesh key={`grass-${index}`} position={position}>
          <cylinderGeometry args={[0.05, 0.05, 0.8]} />
          <meshLambertMaterial color="#32CD32" />
        </mesh>
      ))}
    </group>
  )
}

export default Vegetation