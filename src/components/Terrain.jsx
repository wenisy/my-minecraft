import React from 'react'
import { useMemo } from 'react'
import * as THREE from 'three'

// 改进的噪声函数
function noise(x, z, scale = 0.05) {
  return Math.sin(x * scale) * Math.cos(z * scale) * 2 +
         Math.sin(x * scale * 2) * Math.cos(z * scale * 2) * 1 +
         Math.sin(x * scale * 4) * Math.cos(z * scale * 4) * 0.5
}

// 生成山脉的函数
function mountainNoise(x, z) {
  const distance = Math.sqrt(x * x + z * z)
  const mountainFactor = Math.max(0, 1 - distance / 30) // 山脉在中心区域
  return noise(x, z, 0.03) * mountainFactor * 8
}

function Terrain({ onClick }) {
  const terrainGeometry = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(100, 100, 100, 100)
    const positions = geometry.attributes.position.array
    const colors = []

    // 改进的地形生成
    for (let i = 0; i < positions.length; i += 3) {
      const x = positions[i]
      const z = positions[i + 2]

      // 基础地形
      let height = noise(x, z, 0.08) * 1.5

      // 添加山脉
      height += mountainNoise(x, z)

      // 添加一些随机丘陵
      height += Math.sin(x * 0.15 + z * 0.12) * 0.8

      positions[i + 1] = height

      // 根据高度设置颜色
      let color
      if (height < -1) {
        // 水域
        color = new THREE.Color(0x4a90e2) // 蓝色
      } else if (height < 0) {
        // 沙滩
        color = new THREE.Color(0xf4e4bc) // 沙色
      } else if (height < 3) {
        // 草地
        color = new THREE.Color(0x4a7c59) // 绿色
      } else if (height < 6) {
        // 山地
        color = new THREE.Color(0x8b7355) // 棕色
      } else {
        // 雪山
        color = new THREE.Color(0xffffff) // 白色
      }

      colors.push(color.r, color.g, color.b)
    }

    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3))
    geometry.attributes.position.needsUpdate = true
    geometry.computeVertexNormals()

    return geometry
  }, [])

  return (
    <mesh
      geometry={terrainGeometry}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      onClick={onClick}
    >
      <meshLambertMaterial vertexColors />
    </mesh>
  )
}

export default Terrain