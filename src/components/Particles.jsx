import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function Particles({ position, active, onComplete }) {
  const particlesRef = useRef()
  const particleCount = 20

  const { positions, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3)
    const velocities = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      // 随机位置偏移
      positions[i * 3] = position[0] + (Math.random() - 0.5) * 0.5
      positions[i * 3 + 1] = position[1] + (Math.random() - 0.5) * 0.5
      positions[i * 3 + 2] = position[2] + (Math.random() - 0.5) * 0.5

      // 随机速度
      velocities[i * 3] = (Math.random() - 0.5) * 0.2
      velocities[i * 3 + 1] = Math.random() * 0.15 + 0.05
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.2
    }

    return { positions, velocities }
  }, [position])

  const initialPositions = useMemo(() => positions.slice(), [positions])

  useFrame((state, delta) => {
    if (!particlesRef.current || !active) return

    const positions = particlesRef.current.geometry.attributes.position.array
    const colors = particlesRef.current.geometry.attributes.color.array

    let allParticlesSettled = true

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3

      // 更新位置
      positions[i3] += velocities[i3] * delta * 60
      positions[i3 + 1] += velocities[i3 + 1] * delta * 60
      positions[i3 + 2] += velocities[i3 + 2] * delta * 60

      // 重力效果
      velocities[i3 + 1] -= 0.01 * delta * 60

      // 地面碰撞
      if (positions[i3 + 1] < -2) {
        positions[i3 + 1] = -2
        velocities[i3 + 1] *= -0.3 // 反弹
        velocities[i3] *= 0.8 // 摩擦
        velocities[i3 + 2] *= 0.8
      }

      // 粒子生命周期
      const distance = Math.sqrt(
        Math.pow(positions[i3] - initialPositions[i3], 2) +
        Math.pow(positions[i3 + 1] - initialPositions[i3 + 1], 2) +
        Math.pow(positions[i3 + 2] - initialPositions[i3 + 2], 2)
      )

      if (distance < 3) {
        allParticlesSettled = false
      }

      // 颜色渐变（从不透明到透明）
      const alpha = Math.max(0, 1 - distance / 2)
      colors[i * 4 + 3] = alpha
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true
    particlesRef.current.geometry.attributes.color.needsUpdate = true

    // 如果所有粒子都静止，完成动画
    if (allParticlesSettled && onComplete) {
      onComplete()
    }
  })

  if (!active) return null

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particleCount}
          array={new Float32Array(particleCount * 4).fill(1)}
          itemSize={4}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        alphaTest={0.001}
      />
    </points>
  )
}

export default Particles