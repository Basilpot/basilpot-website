import { useCallback, useEffect, useRef, useState } from "react"

import "./line-sidebar.css"

const curves = {
  linear: (value) => value,
  smooth: (value) => value * value * (3 - 2 * value),
  sharp: (value) => value * value * value,
}

/**
 * @param {{
 *   items?: string[], accentColor?: string, textColor?: string, markerColor?: string,
 *   showIndex?: boolean, showMarker?: boolean, proximityRadius?: number, maxShift?: number,
 *   falloff?: string, markerLength?: number, markerGap?: number, tickScale?: number,
 *   scaleTick?: boolean, itemGap?: number, fontSize?: number, smoothing?: number,
 *   defaultActive?: number | null, onItemClick?: (index: number, label: string) => void,
 *   className?: string
 * }} props
 */
export default function LineSidebar({
  items = [],
  accentColor = "#A855F7",
  textColor = "#c4c4c4",
  markerColor = "#6c6c6c",
  showIndex = true,
  showMarker = true,
  proximityRadius = 100,
  maxShift = 30,
  falloff = "smooth",
  markerLength = 60,
  markerGap = 0,
  tickScale = 0.5,
  scaleTick = true,
  itemGap = 20,
  fontSize = 1.1,
  smoothing = 100,
  defaultActive = null,
  onItemClick,
  className = "",
}) {
  const listRef = useRef(null)
  const itemRefs = useRef([])
  const targets = useRef([])
  const values = useRef([])
  const frame = useRef(null)
  const lastTime = useRef(0)
  const [active, setActive] = useState(defaultActive)

  const runFrame = useCallback(
    (now) => {
      const delta = Math.min((now - lastTime.current) / 1000, 0.05)
      lastTime.current = now
      const factor = 1 - Math.exp((-delta / Math.max(smoothing, 1)) * 1000)
      let moving = false
      itemRefs.current.forEach((element, index) => {
        if (!element) return
        const target = Math.max(
          targets.current[index] || 0,
          active === index ? 1 : 0
        )
        const current = values.current[index] || 0
        const next = current + (target - current) * factor
        values.current[index] = next
        element.style.setProperty("--effect", next.toFixed(4))
        if (Math.abs(target - next) > 0.0015) moving = true
      })
      frame.current = moving ? requestAnimationFrame(runFrame) : null
    },
    [active, smoothing]
  )

  const startFrame = useCallback(() => {
    if (frame.current !== null) cancelAnimationFrame(frame.current)
    lastTime.current = performance.now()
    frame.current = requestAnimationFrame(runFrame)
  }, [runFrame])

  const handleMove = useCallback(
    (event) => {
      const list = listRef.current
      if (!list) return
      const bounds = list.getBoundingClientRect()
      const pointer = event.clientY - bounds.top
      const ease = curves[falloff] || curves.linear
      itemRefs.current.forEach((element, index) => {
        if (!element) return
        const center = element.offsetTop + element.offsetHeight / 2
        targets.current[index] = ease(
          Math.max(0, 1 - Math.abs(pointer - center) / proximityRadius)
        )
      })
      startFrame()
    },
    [falloff, proximityRadius, startFrame]
  )

  const handleClick = (index, label) => {
    setActive(index)
    onItemClick?.(index, label)
    const target = [...document.querySelectorAll("h1, h2, h3")].find(
      (heading) => heading.textContent?.trim() === label
    )
    target?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  useEffect(() => {
    startFrame()
    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [startFrame])

  return (
    <nav
      className={`line-sidebar${showMarker ? " line-sidebar--markers" : ""}${scaleTick ? " line-sidebar--scale-tick" : ""}${className ? ` ${className}` : ""}`}
      style={{
        "--accent-color": accentColor,
        "--text-color": textColor,
        "--marker-color": markerColor,
        "--marker-length": `${markerLength}px`,
        "--marker-gap": `${markerGap}px`,
        "--tick-scale": tickScale,
        "--max-shift": `${maxShift}px`,
        "--item-gap": `${itemGap}px`,
        "--font-size": `${fontSize}rem`,
      }}
      aria-label="Page contents"
    >
      <ul
        ref={listRef}
        className="line-sidebar__list"
        onPointerMove={handleMove}
        onPointerLeave={() => {
          targets.current = []
          startFrame()
        }}
      >
        {items.map((label, index) => (
          <li
            key={`${label}-${index}`}
            ref={(element) => {
              itemRefs.current[index] = element
            }}
            className="line-sidebar__item"
            aria-current={active === index ? "true" : undefined}
            onClick={() => handleClick(index, label)}
          >
            {showMarker ? (
              <span className="line-sidebar__marker" aria-hidden="true" />
            ) : null}
            <span className="line-sidebar__label">
              {showIndex ? (
                <span className="line-sidebar__index">
                  {String(index + 1).padStart(2, "0")}
                </span>
              ) : null}
              <span className="line-sidebar__text">{label}</span>
            </span>
          </li>
        ))}
      </ul>
    </nav>
  )
}
