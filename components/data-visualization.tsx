"use client"

import { motion } from "framer-motion"
import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function DataVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  // No chart toggling state needed anymore

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      const container = canvas.parentElement
      if (!container) return

      const dpr = window.devicePixelRatio || 1
      canvas.width = container.clientWidth * dpr
      canvas.height = container.clientHeight * dpr
      canvas.style.width = `${container.clientWidth}px`
      canvas.style.height = `${container.clientHeight}px`
      ctx.scale(dpr, dpr)
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Colors based on theme
    const getColors = () => {
      const isDark = theme === "dark"
      return {
        primary: "#71B023", // Logo green
        background: isDark ? "#292929" : "#ffffff",
        grid: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
        text: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
        accent1: "#4ade80", // Light green
        accent2: "#3b82f6", // Blue
        accent3: "#a855f7", // Purple
        accent4: "#f59e0b", // Amber
      }
    }

    let colors = getColors()

    // Create particles
    const particleCount = 100
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      color: Math.random() > 0.5 ? colors.primary : colors.accent2,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      connected: [] as number[],
    }))

    // Create data nodes
    const nodeCount = 8
    const nodes = Array.from({ length: nodeCount }, (_, i) => ({
      x: canvas.width * (0.2 + Math.random() * 0.3),
      y: canvas.height * (0.2 + Math.random() * 0.3),
      radius: 4 + Math.random() * 4,
      color: i % 2 === 0 ? colors.primary : colors.accent2,
      value: Math.floor(Math.random() * 100),
      label: ["SQL", "Python", "Data", "ML", "AI", "BI", "R", "Analytics", "Visualization", 'LLM'][i],
      vx: (Math.random() - 0.5) * 1,
      vy: (Math.random() - 0.5) * 1,
      pulse: 0,
    }))

    // Create data lines for charts
    const lineData = Array.from({ length: 50 }, (_, i) => ({
      x: i * (canvas.width / 50),
      y: (Math.sin(i * 0.2) * 0.3 + 0.5) * canvas.height * 0.6 + canvas.height * 0.2,
    }))

    // Create bar chart data
    const barData = Array.from({ length: 8 }, () => Math.floor(Math.random() * 80) + 20)

    // Create pie chart data
    const pieData = Array.from({ length: 5 }, () => Math.floor(Math.random() * 80) + 20)
    const pieColors = [colors.primary, colors.accent1, colors.accent2, colors.accent3, colors.accent4]

    // Animation variables
    let animationFrame: number
    let time = 0
    const chartTransition = 0

    // Draw function
    const draw = () => {
      time += 0.005 // Reduced time increment to slow down animations
      colors = getColors() // Update colors if theme changes

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw both charts - pie chart with lower opacity
      drawAnimatedPieChart(ctx, pieData, pieColors, canvas.width, canvas.height, time, colors, 0.2)
      drawAnimatedBarChart(ctx, barData, canvas.width, canvas.height, time, colors, 0.6, theme)

      // Draw futuristic grid
      drawFuturisticGrid(ctx, canvas.width, canvas.height, time, colors)

      // Draw particles and connections
      drawParticles(ctx, particles, canvas.width, canvas.height, time, colors)

      // Draw data nodes
      drawDataNodes(ctx, nodes, canvas.width, canvas.height, time, colors)

      // Draw line chart
      drawFuturisticLineChart(ctx, lineData, canvas.width, canvas.height, time, colors)

      // Draw holographic circles
      drawHolographicCircles(ctx, canvas.width, canvas.height, time, colors)

      // Update particles
      updateParticles(particles, canvas.width, canvas.height)

      // Update nodes
      updateNodes(nodes, canvas.width, canvas.height, time)

      // Update line data
      updateLineData(lineData, canvas.width, canvas.height, time)

      // Update bar data occasionally
      if (Math.random() < 0.01) {
        const index = Math.floor(Math.random() * barData.length)
        barData[index] = Math.floor(Math.random() * 80) + 20
      }

      // Update pie data occasionally
      if (Math.random() < 0.01) {
        const index = Math.floor(Math.random() * pieData.length)
        pieData[index] = Math.floor(Math.random() * 80) + 20
      }

      animationFrame = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrame)
    }
  }, [theme])

  return (
    <div className="relative w-full h-[400px] bg-gradient-to-br from-primary/5 to-background rounded-lg overflow-hidden border border-primary/10">
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Floating data elements with improved positioning */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-primary font-mono text-xs md:text-sm"
            style={{
              textShadow: "0 0 10px rgba(113, 176, 35, 0.5)",
            }}
            initial={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              opacity: 0,
            }}
            animate={{
              left: [`${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`],
              top: [`${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 20 + 30, // Increased duration to slow down animations
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              times: [0, 0.5, 1],
              delay: i * 2,
            }}
          >
            {["pandas.DataFrame", "numpy.array", "JOIN data ON", "WHERE value >", "ORDER BY"][i]}
          </motion.div>
        ))}

        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`num-${i}`}
            className="absolute text-primary/80 font-mono text-xs md:text-sm"
            style={{
              textShadow: "0 0 8px rgba(113, 176, 35, 0.4)",
            }}
            initial={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              opacity: 0,
            }}
            animate={{
              left: [`${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`],
              top: [`${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 16 + 20, // Increased duration to slow down animations
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              times: [0, 0.5, 1],
              delay: i * 1.5,
            }}
          >
            {Math.floor(Math.random() * 1000)}
          </motion.div>
        ))}

        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`python-${i}`}
            className="absolute text-primary/80 font-mono text-xs md:text-sm"
            style={{
              textShadow: "0 0 8px rgba(113, 176, 35, 0.4)",
            }}
            initial={{
              left: `${Math.random() * 80 + 10}%`,
              top: `${Math.random() * 80 + 10}%`,
              opacity: 0,
            }}
            animate={{
              left: [`${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`],
              top: [`${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`, `${Math.random() * 80 + 10}%`],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 16 + 20, // Increased duration to slow down animations
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              times: [0, 0.5, 1],
              delay: i * 1.5 + 4,
            }}
          >
            {["scikit-learn", "matplotlib.pyplot"][i]}
          </motion.div>
        ))}

        {/* Futuristic data elements */}
        <motion.div
          className="absolute text-primary font-bold text-xl md:text-xl"
          style={{
            textShadow: "0 0 15px rgba(113, 176, 35, 0.7)",
          }}
          initial={{
            left: "50%",
            top: "50%",
            x: "-50%",
            y: "-50%",
            opacity: 0,
            scale: 0.5,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0.5, 1.2, 0.5],
          }}
          transition={{
            duration: 16, // Increased duration to slow down animations
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "loop",
            times: [0, 0.5, 1],
          }}
        >
          DATA ANALYSIS
        </motion.div>
      </div>
    </div>
  )
}

// Helper functions for drawing visualizations
function drawFuturisticGrid(ctx: CanvasRenderingContext2D, width: number, height: number, time: number, colors: any) {
  // Perspective grid
  const horizonY = height * 0.5
  const gridSpacing = 40
  const perspectiveStrength = 0.2 + Math.sin(time * 0.1) * 0.05 // Reduced time multiplier

  ctx.strokeStyle = colors.grid
  ctx.lineWidth = 0.5

  // Horizontal lines with perspective
  for (let y = horizonY; y <= height; y += gridSpacing) {
    const perspectiveFactor = (y - horizonY) / (height - horizonY)

    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.globalAlpha = 0.3 * perspectiveFactor
    ctx.stroke()
  }

  // Vertical lines with perspective
  const vanishingPointX = width * 0.5 + Math.sin(time * 0.15) * width * 0.1 // Reduced time multiplier

  for (let x = 0; x <= width; x += gridSpacing) {
    ctx.beginPath()
    ctx.moveTo(x, height)

    const targetX = vanishingPointX + (x - vanishingPointX) * perspectiveStrength
    ctx.lineTo(targetX, horizonY)

    const perspectiveFactor = 1 - Math.abs(x - vanishingPointX) / width
    ctx.globalAlpha = 0.3 * perspectiveFactor
    ctx.stroke()
  }

  ctx.globalAlpha = 1

  // Horizon line
  ctx.beginPath()
  ctx.moveTo(0, horizonY)
  ctx.lineTo(width, horizonY)
  ctx.strokeStyle = colors.primary
  ctx.globalAlpha = 0.5
  ctx.lineWidth = 1
  ctx.stroke()
  ctx.globalAlpha = 1
}

function drawParticles(
  ctx: CanvasRenderingContext2D,
  particles: any[],
  width: number,
  height: number,
  time: number,
  colors: any,
) {
  // Draw connections first
  ctx.strokeStyle = colors.primary
  ctx.lineWidth = 0.3

  for (let i = 0; i < particles.length; i++) {
    const p1 = particles[i]

    // Find nearby particles
    p1.connected = []

    for (let j = i + 1; j < particles.length; j++) {
      const p2 = particles[j]
      const dx = p1.x - p2.x
      const dy = p1.y - p2.y
      const distance = Math.sqrt(dx * dx + dy * dy)

      if (distance < 50) {
        p1.connected.push(j)

        ctx.beginPath()
        ctx.moveTo(p1.x, p1.y)
        ctx.lineTo(p2.x, p2.y)
        ctx.globalAlpha = 0.2 * (1 - distance / 50)
        ctx.stroke()
      }
    }
  }

  ctx.globalAlpha = 1

  // Draw particles
  particles.forEach((p) => {
    ctx.fillStyle = p.color
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2)
    ctx.fill()

    // Draw glow
    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4)
    glow.addColorStop(0, `${p.color}40`)
    glow.addColorStop(1, `${p.color}00`)

    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2)
    ctx.fill()
  })
}

function updateParticles(particles: any[], width: number, height: number) {
  particles.forEach((p) => {
    p.x += p.vx * 0.5 // Reduced velocity multiplier
    p.y += p.vy * 0.5 // Reduced velocity multiplier

    // Bounce off edges with some damping
    if (p.x < 0 || p.x > width) {
      p.vx *= -0.8
      p.x = p.x < 0 ? 0 : width
    }

    if (p.y < 0 || p.y > height) {
      p.vy *= -0.8
      p.y = p.y < 0 ? 0 : height
    }

    // Slow down over time
    p.vx *= 0.995 // Increased damping to slow down particles
    p.vy *= 0.995 // Increased damping to slow down particles

    // Add some random movement
    p.vx += (Math.random() - 0.5) * 0.025 // Reduced random movement
    p.vy += (Math.random() - 0.5) * 0.025 // Reduced random movement
  })
}

function drawDataNodes(
  ctx: CanvasRenderingContext2D,
  nodes: any[],
  width: number,
  height: number,
  time: number,
  colors: any,
) {
  nodes.forEach((node) => {
    // Draw node connection lines
    nodes.forEach((otherNode) => {
      if (node !== otherNode) {
        const dx = node.x - otherNode.x
        const dy = node.y - otherNode.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < width * 0.3) {
          ctx.beginPath()
          ctx.moveTo(node.x, node.y)
          ctx.lineTo(otherNode.x, otherNode.y)

          const gradient = ctx.createLinearGradient(node.x, node.y, otherNode.x, otherNode.y)
          gradient.addColorStop(0, `${node.color}40`)
          gradient.addColorStop(1, `${otherNode.color}40`)

          ctx.strokeStyle = gradient
          ctx.globalAlpha = 0.3 * (1 - distance / (width * 0.3))
          ctx.lineWidth = 3
          ctx.stroke()
        }
      }
    })

    ctx.globalAlpha = 1

    // Draw pulse effect
    const pulseRadius = node.radius * (3 + Math.sin(node.pulse * 0.5) * 2) // Reduced time multiplier
    const pulseOpacity = Math.max(0, 0.5 - node.pulse / 5)

    ctx.beginPath()
    ctx.arc(node.x, node.y, pulseRadius, 0, Math.PI * 2)
    ctx.fillStyle = `${node.color}${Math.floor(pulseOpacity * 255)
      .toString(16)
      .padStart(2, "0")}`
    ctx.fill()

    // Draw node
    ctx.beginPath()
    ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2)
    ctx.fillStyle = node.color
    ctx.fill()

    // Draw node value
    ctx.fillStyle = colors.text
    ctx.font = "10px monospace"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(node.value.toString(), node.x, node.y)

    // Draw node label
    ctx.fillStyle = colors.text
    ctx.font = "bold 10px monospace"
    ctx.fillText(node.label, node.x, node.y + node.radius + 12)
  })
}

function updateNodes(nodes: any[], width: number, height: number, time: number) {
  nodes.forEach((node) => {
    // Update position
    node.x += node.vx * 0.5 // Reduced velocity multiplier
    node.y += node.vy * 0.5 // Reduced velocity multiplier

    // Bounce off edges
    if (node.x < node.radius || node.x > width - node.radius) {
      node.vx *= -1
      node.x = node.x < node.radius ? node.radius : width - node.radius
      node.pulse = 0 // Trigger pulse on collision
    }

    if (node.y < node.radius || node.y > height - node.radius) {
      node.vy *= -1
      node.y = node.y < node.radius ? node.radius : height - node.radius
      node.pulse = 0 // Trigger pulse on collision
    }

    // Update pulse
    node.pulse += 0.025 // Reduced pulse increment
    if (node.pulse > Math.PI * 2) {
      node.pulse = 0
    }

    // Slowly change value
    if (Math.random() < 0.005) { // Reduced frequency of value change
      node.value = Math.floor(Math.random() * 100)
    }

    // Add some random movement
    node.vx += (Math.random() - 0.5) * 0.01 // Reduced random movement
    node.vy += (Math.random() - 0.5) * 0.01 // Reduced random movement

    // Limit velocity
    const maxVel = 0.5 // Reduced max velocity
    const vel = Math.sqrt(node.vx * node.vx + node.vy * node.vy)

    if (vel > maxVel) {
      node.vx = (node.vx / vel) * maxVel
      node.vy = (node.vy / vel) * maxVel
    }
  })
}

function drawFuturisticLineChart(
  ctx: CanvasRenderingContext2D,
  data: any[],
  width: number,
  height: number,
  time: number,
  colors: any,
) {
  // Draw line
  ctx.beginPath()
  ctx.moveTo(data[0].x, data[0].y)

  for (let i = 1; i < data.length; i++) {
    ctx.lineTo(data[i].x, data[i].y)
  }

  // Create gradient
  const gradient = ctx.createLinearGradient(0, height * 0.2, 0, height * 0.8)
  gradient.addColorStop(0, `${colors.primary}80`)
  gradient.addColorStop(1, `${colors.primary}00`)

  ctx.strokeStyle = colors.primary
  ctx.lineWidth = 2
  ctx.stroke()

  // Fill area under line
  ctx.lineTo(data[data.length - 1].x, height)
  ctx.lineTo(data[0].x, height)
  ctx.closePath()
  ctx.fillStyle = gradient
  ctx.globalAlpha = 0.3
  ctx.fill()
  ctx.globalAlpha = 1

  // Draw data points with glow
  for (let i = 0; i < data.length; i += 5) {
    const point = data[i]

    // Glow
    const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, 10)
    glow.addColorStop(0, `${colors.primary}60`)
    glow.addColorStop(1, `${colors.primary}00`)

    ctx.fillStyle = glow
    ctx.beginPath()
    ctx.arc(point.x, point.y, 10, 0, Math.PI * 2)
    ctx.fill()

    // Point
    ctx.fillStyle = colors.primary
    ctx.beginPath()
    ctx.arc(point.x, point.y, 2, 0, Math.PI * 2)
    ctx.fill()
  }
}

function updateLineData(data: any[], width: number, height: number, time: number) {
  for (let i = 0; i < data.length; i++) {
    const point = data[i]
    const normalizedX = i / data.length

    // Create a smooth wave pattern that changes over time
    point.y =
      (Math.sin(normalizedX * 10 + time * 0.5) * 0.2 + // Reduced time multiplier
        Math.sin(normalizedX * 5 - time * 0.25) * 0.1 + // Reduced time multiplier
        Math.sin(normalizedX * 15 + time * 0.1) * 0.05 + // Reduced time multiplier
        0.5) *
        height *
        0.6 +
      height * 0.2
  }
}

function drawHolographicCircles(
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  time: number,
  colors: any,
) {
  const centerX = width * 0.75
  const centerY = height * 0.3
  const maxRadius = height * 0.15

  // Draw multiple circles with different rotation speeds
  for (let i = 0; i < 3; i++) {
    const rotationSpeed = 0.25 + i * 0.15 // Reduced rotation speed
    const radius = maxRadius * (0.6 + i * 0.2)
    const segments = 12 + i * 4

    ctx.beginPath()

    for (let j = 0; j <= segments; j++) {
      const angle = (j / segments) * Math.PI * 2
      const segmentRadius = radius * (0.9 + Math.sin(angle * 3 + time * rotationSpeed) * 0.1)

      const x = centerX + Math.cos(angle) * segmentRadius
      const y = centerY + Math.sin(angle) * segmentRadius

      if (j === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    }

    ctx.closePath()
    ctx.strokeStyle = i === 1 ? colors.primary : colors.accent2
    ctx.lineWidth = 1.5 - i * 0.3
    ctx.globalAlpha = 0.5 - i * 0.1
    ctx.stroke()
  }

  ctx.globalAlpha = 1

  // Draw center point
  ctx.beginPath()
  ctx.arc(centerX, centerY, 3, 0, Math.PI * 2)
  ctx.fillStyle = colors.primary
  ctx.fill()

  // Draw data points along the circle
  const dataPoints = 6
  for (let i = 0; i < dataPoints; i++) {
    const angle = (i / dataPoints) * Math.PI * 2 + time * 0.1 // Reduced time multiplier
    const radius = maxRadius * 0.8

    const x = centerX + Math.cos(angle) * radius
    const y = centerY + Math.sin(angle) * radius

    ctx.beginPath()
    ctx.arc(x, y, 4, 0, Math.PI * 2)
    ctx.fillStyle = i % 2 === 0 ? colors.primary : colors.accent2
    ctx.fill()

    // Draw value
    const value = Math.floor(Math.sin(time * 0.5 + i) * 50 + 50) // Reduced time multiplier
    ctx.fillStyle = colors.text
    ctx.font = "10px monospace"
    ctx.textAlign = "center"
    ctx.textBaseline = "middle"
    ctx.fillText(value.toString(), x, y - 12)
  }
}

// New function for animated bar chart
function drawAnimatedBarChart(
  ctx: CanvasRenderingContext2D,
  data: number[],
  width: number,
  height: number,
  time: number,
  colors: any,
  opacity: number,
  theme: string | undefined,
) {
  const chartWidth = width * 0.4
  const chartHeight = height * 0.3
  const startX = width * 0.1
  const startY = height * 0.5 // Positioned higher on the canvas
  const barWidth = (chartWidth / data.length) * 0.7
  const spacing = (chartWidth / data.length) * 0.3

  const isDark = theme === "dark"

  ctx.globalAlpha = opacity

  // Draw background grid
  ctx.strokeStyle = colors.grid
  ctx.lineWidth = 0.5

  for (let i = 0; i <= 5; i++) {
    const y = startY - (chartHeight / 5) * i
    ctx.beginPath()
    ctx.moveTo(startX, y)
    ctx.lineTo(startX + chartWidth, y)
    ctx.stroke()

    // Draw value labels
    ctx.fillStyle = colors.text
    ctx.font = "8px monospace"
    ctx.textAlign = "right"
    ctx.textBaseline = "middle"
    ctx.fillText((i * 20).toString(), startX - 5, y)
  }

  // Store previous bar heights for smooth animation
  if (!window.prevBarHeights) {
    window.prevBarHeights = data.map((value) => (value / 100) * chartHeight)
  }

  // Draw bars with smooth animation
  data.forEach((value, i) => {
    const x = startX + i * (barWidth + spacing)
    const targetHeight = (value / 100) * chartHeight

    // Smooth transition between heights
    let currentHeight = window.prevBarHeights[i]
    // Ease towards target height
    currentHeight += (targetHeight - currentHeight) * 0.025 // Reduced easing factor
    window.prevBarHeights[i] = currentHeight

    // Apply subtle wave effect
    const animatedHeight = currentHeight * (0.98 + Math.sin(time * 1 + i) * 0.01) // Reduced time multiplier

    // Bar gradient
    const barGradient = ctx.createLinearGradient(0, startY, 0, startY - animatedHeight)
    barGradient.addColorStop(0, i % 2 === 0 ? colors.primary : '#3b82f6')
    barGradient.addColorStop(1, isDark ? "rgb(10, 10, 10, 0.17)" : "rgb(240, 240, 240)") // Changed to lighter gray

    ctx.fillStyle = barGradient
    ctx.fillRect(x, startY - animatedHeight, barWidth, animatedHeight)

    // Bar outline
    ctx.strokeStyle = colors.primary
    ctx.lineWidth = 1
    ctx.strokeRect(x, startY - animatedHeight, barWidth, animatedHeight)

    // Bar label
    ctx.fillStyle = colors.text
    ctx.font = "8px monospace"
    ctx.textAlign = "center"
    ctx.textBaseline = "top"
    ctx.fillText(["SQL", "Python", "R", "BI", "ML", "AI", "Data", "Excel"][i], x + barWidth / 2, startY + 5)
  })


  ctx.globalAlpha = 1
}

// New function for animated pie chart
function drawAnimatedPieChart(
  ctx: CanvasRenderingContext2D,
  data: number[],
  colors: string[],
  width: number,
  height: number,
  time: number,
  colorScheme: any,
  opacity: number,
) {
  const centerX = width * 0.25
  const centerY = height * 0.3 // Keep this position as it was
  const radius = Math.min(width, height) * 0.2

  ctx.globalAlpha = opacity

  const total = data.reduce((sum, value) => sum + value, 0)
  let startAngle = time * 0.1 // Reduced time multiplier

  // Draw pie segments with animation
  data.forEach((value, i) => {
    const sliceAngle = (value / total) * Math.PI * 2
    const endAngle = startAngle + sliceAngle
    const midAngle = startAngle + sliceAngle / 2

    // Animated radius for 3D effect
    const animatedRadius = radius * (1 + Math.sin(time * 1.5 + i) * 0.025) // Reduced time multiplier

    // Draw slice
    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.arc(centerX, centerY, animatedRadius, startAngle, endAngle)
    ctx.closePath()

    ctx.fillStyle = colors[i % colors.length]
    ctx.fill()

    ctx.strokeStyle = colorScheme.background
    ctx.lineWidth = 1
    ctx.stroke()

    // Draw label line and text for larger segments
    if (value / total > 0.1) {
      const labelRadius = animatedRadius * 1.3
      const labelX = centerX + Math.cos(midAngle) * labelRadius
      const labelY = centerY + Math.sin(midAngle) * labelRadius

      ctx.beginPath()
      ctx.moveTo(centerX + Math.cos(midAngle) * animatedRadius, centerY + Math.sin(midAngle) * animatedRadius)
      ctx.lineTo(labelX, labelY)
      ctx.strokeStyle = colorScheme.text
      ctx.lineWidth = 0.5
      ctx.stroke()

      ctx.fillStyle = colorScheme.text
      ctx.font = "8px monospace"
      ctx.textAlign = midAngle < Math.PI ? "left" : "right"
      ctx.textBaseline = "middle"
      ctx.fillText(`${Math.round((value / total) * 100)}%`, labelX + (midAngle < Math.PI ? 5 : -5), labelY)
    }

    startAngle = endAngle
  })

  // Chart title
  ctx.fillStyle = colorScheme.text
  ctx.font = "bold 10px monospace"
  ctx.textAlign = "center"
  ctx.textBaseline = "bottom"

  ctx.globalAlpha = 1
}
