import { gsap } from "gsap"
import { Mesh, Program, Renderer, Texture, Triangle } from "ogl"
import { useCallback, useEffect, useRef, useState } from "react"

import "./morph-slider.css"

const TRANSITIONS = { melt: 0, ripple: 1, shear: 2, swirl: 3 }

const vertexShader = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`

const fragmentShader = `
precision highp float;
uniform sampler2D tCurrent;
uniform sampler2D tNext;
uniform vec2 uResolution;
uniform vec2 uCurrentSize;
uniform vec2 uNextSize;
uniform float uProgress;
uniform float uDir;
uniform int uMode;
uniform float uIntensity;
uniform float uScale;
uniform float uAberration;
uniform float uDrift;
uniform float uTime;
uniform float uReduce;
uniform vec2 uPointer;
uniform vec3 uOverlay;
varying vec2 vUv;
const float PI = 3.14159265359;

float hash11(float p) {
  p = fract(p * 0.1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

float hash21(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

mat2 rot(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

vec2 coverUV(vec2 uv, vec2 res, vec2 img) {
  float rA = res.x / max(res.y, 1.0);
  float iA = img.x / max(img.y, 1.0);
  vec2 s = vec2(1.0);
  float ratio = rA / max(iA, 0.0001);
  if (ratio > 1.0) s.y = 1.0 / ratio;
  else s.x = ratio;
  return (uv - 0.5) * s + 0.5;
}

void main() {
  float p = clamp(uProgress, 0.0, 1.0);
  float env = sin(p * PI);
  vec2 uv = vUv;
  uv += vec2(sin(uTime * 0.25 + uv.y * 4.0), cos(uTime * 0.22 + uv.x * 4.0)) * uDrift * 0.008;
  uv = (uv - 0.5) * (1.0 - uDrift * 0.02 * sin(uTime * 0.4)) + 0.5;
  vec2 uvC = uv;
  vec2 uvN = uv;
  float m = smoothstep(0.0, 1.0, p);

  if (uReduce < 0.5) {
    if (uMode == 3) {
      vec2 c = uv - 0.5;
      float r = length(c);
      float ang = env * uIntensity * 3.5 * (1.0 - r);
      uvC = rot(ang) * c + 0.5;
      uvN = rot(-ang) * c + 0.5;
    } else if (uMode == 1) {
      float d = distance(uv, uPointer);
      float ring = p * 1.6;
      float wave = sin((d - ring) * 30.0) * env;
      vec2 dir = normalize(uv - uPointer + 1e-4);
      vec2 disp = dir * wave * uIntensity * 0.25;
      uvC = uv + disp;
      uvN = uv + disp * 0.6;
      m = 1.0 - smoothstep(ring - 0.03, ring + 0.03, d);
    } else if (uMode == 2) {
      float row = floor(uv.y * 14.0);
      float rnd = hash11(row);
      vec2 disp = vec2((rnd - 0.5) * env * uIntensity * 0.6, 0.0);
      uvC = uv + disp;
      uvN = uv + disp;
      float localX = uDir > 0.0 ? uv.x : 1.0 - uv.x;
      float th = p * 1.5 - 0.25 + (rnd - 0.5) * 0.25;
      m = 1.0 - smoothstep(th - 0.06, th + 0.06, localX);
    } else {
      float nn = fbm(uv * uScale + uTime * 0.03);
      float warp = fbm(uv * uScale * 1.7 - uTime * 0.02);
      vec2 g = vec2(nn, warp) - 0.5;
      uvC = uv + g * uIntensity * 0.5 * p;
      uvN = uv - g * uIntensity * 0.5 * (1.0 - p);
      m = smoothstep(nn - 0.15, nn + 0.15, p);
    }
  }

  vec2 sC = coverUV(uvC, uResolution, uCurrentSize);
  vec2 sN = coverUV(uvN, uResolution, uNextSize);
  float ca = uReduce < 0.5 ? uAberration * env * 0.03 : 0.0;
  vec3 colC = vec3(
    texture2D(tCurrent, sC + vec2(ca, 0.0)).r,
    texture2D(tCurrent, sC).g,
    texture2D(tCurrent, sC - vec2(ca, 0.0)).b
  );
  vec3 colN = vec3(
    texture2D(tNext, sN + vec2(ca, 0.0)).r,
    texture2D(tNext, sN).g,
    texture2D(tNext, sN - vec2(ca, 0.0)).b
  );
  vec3 col = mix(colC, colN, m);
  float vig = smoothstep(1.25, 0.25, length(uv - 0.5));
  col = mix(col, uOverlay, (1.0 - vig) * 0.28);
  gl_FragColor = vec4(col, 1.0);
}
`

function fallbackTexture(gl) {
  const data = new Uint8Array(4 * 4 * 4)
  for (let index = 0; index < 16; index += 1) {
    data[index * 4] = 24
    data[index * 4 + 1] = 24
    data[index * 4 + 2] = 28
    data[index * 4 + 3] = 255
  }
  return new Texture(gl, {
    image: data,
    width: 4,
    height: 4,
    generateMipmaps: false,
  })
}

function hexToRgb(hex) {
  let value = (hex || "#000000").replace("#", "")
  if (value.length === 3) value = [...value].map((part) => part + part).join("")
  const number = Number.parseInt(value, 16)
  return [
    ((number >> 16) & 255) / 255,
    ((number >> 8) & 255) / 255,
    (number & 255) / 255,
  ]
}

class MorphEngine {
  constructor(container, options) {
    this.container = container
    this.items = options.items
    this.getOptions = options.getOptions
    this.onIndexChange = options.onIndexChange
    this.reducedMotion = options.reducedMotion
    this.current = options.startIndex
    this.animating = false
    this.tween = null
    this.renderer = new Renderer({
      alpha: false,
      antialias: true,
      dpr: Math.min(window.devicePixelRatio || 1, 2),
    })
    this.gl = this.renderer.gl
    this.gl.clearColor(0.05, 0.05, 0.06, 1)
    this.canvas = this.gl.canvas
    this.canvas.className = "morph-slider-canvas"
    container.appendChild(this.canvas)
    this.textures = this.items.map(() => fallbackTexture(this.gl))
    this.sizes = this.items.map(() => [1, 1])
    const settings = this.getOptions()
    this.program = new Program(this.gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        tCurrent: { value: this.textures[this.current] },
        tNext: { value: this.textures[this.current] },
        uResolution: { value: [1, 1] },
        uCurrentSize: { value: this.sizes[this.current] },
        uNextSize: { value: this.sizes[this.current] },
        uProgress: { value: 0 },
        uDir: { value: 1 },
        uMode: { value: TRANSITIONS[settings.transition] ?? 0 },
        uIntensity: { value: settings.intensity },
        uScale: { value: settings.scale },
        uAberration: { value: settings.aberration },
        uDrift: { value: settings.drift },
        uTime: { value: 0 },
        uReduce: { value: this.reducedMotion ? 1 : 0 },
        uPointer: { value: [0.5, 0.5] },
        uOverlay: { value: hexToRgb(settings.overlayColor) },
      },
    })
    this.mesh = new Mesh(this.gl, {
      geometry: new Triangle(this.gl),
      program: this.program,
    })
    this.resizeObserver = new ResizeObserver(() => this.resize())
    this.resizeObserver.observe(container)
    this.resize()
    this.loadTextures()
    this.loop = this.loop.bind(this)
    this.raf = requestAnimationFrame(this.loop)
  }

  loadTextures() {
    this.items.forEach((item, index) => {
      const image = new Image()
      image.crossOrigin = "anonymous"
      image.src = item.image
      image.onload = () => {
        const texture = new Texture(this.gl, { generateMipmaps: false })
        texture.image = image
        this.textures[index] = texture
        this.sizes[index] = [image.naturalWidth || 1, image.naturalHeight || 1]
        if (index === this.current) {
          this.program.uniforms.tCurrent.value = texture
          this.program.uniforms.uCurrentSize.value = this.sizes[index]
        }
      }
    })
  }

  resize() {
    const { width, height } = this.container.getBoundingClientRect()
    this.renderer.setSize(Math.max(width, 1), Math.max(height, 1))
    this.program.uniforms.uResolution.value = [
      this.gl.canvas.width,
      this.gl.canvas.height,
    ]
  }

  syncOptions() {
    const settings = this.getOptions()
    this.program.uniforms.uMode.value = TRANSITIONS[settings.transition] ?? 0
    this.program.uniforms.uIntensity.value = settings.intensity
    this.program.uniforms.uScale.value = settings.scale
    this.program.uniforms.uAberration.value = settings.aberration
    this.program.uniforms.uDrift.value = settings.drift
    this.program.uniforms.uOverlay.value = hexToRgb(settings.overlayColor)
  }

  loop(time) {
    this.program.uniforms.uTime.value = time * 0.001
    if (!this.animating) this.syncOptions()
    this.renderer.render({ scene: this.mesh })
    this.raf = requestAnimationFrame(this.loop)
  }

  goTo(target) {
    if (this.animating || target === this.current || this.items.length < 2)
      return
    const settings = this.getOptions()
    const direction = target > this.current ? 1 : -1
    this.syncOptions()
    this.program.uniforms.tCurrent.value = this.textures[this.current]
    this.program.uniforms.uCurrentSize.value = this.sizes[this.current]
    this.program.uniforms.tNext.value = this.textures[target]
    this.program.uniforms.uNextSize.value = this.sizes[target]
    this.program.uniforms.uDir.value = direction
    this.animating = true
    this.onIndexChange(target)
    this.tween = gsap.fromTo(
      this.program.uniforms.uProgress,
      { value: 0 },
      {
        value: 1,
        duration: this.reducedMotion
          ? Math.min(settings.duration, 0.4)
          : settings.duration,
        ease: settings.ease,
        onComplete: () => {
          this.current = target
          this.program.uniforms.tCurrent.value = this.textures[target]
          this.program.uniforms.uCurrentSize.value = this.sizes[target]
          this.program.uniforms.uProgress.value = 0
          this.animating = false
          this.tween = null
        },
      }
    )
  }

  step(direction) {
    const settings = this.getOptions()
    const raw = this.current + direction
    if (!settings.loop && (raw < 0 || raw >= this.items.length)) return
    this.goTo((raw + this.items.length) % this.items.length)
  }

  setPointer(x, y) {
    this.program.uniforms.uPointer.value = [x, y]
  }

  destroy() {
    cancelAnimationFrame(this.raf)
    this.tween?.kill()
    this.resizeObserver.disconnect()
    this.textures.forEach((texture) => {
      if (texture?.texture) this.gl.deleteTexture(texture.texture)
    })
    if (this.program?.program) this.gl.deleteProgram(this.program.program)
    this.gl.getExtension("WEBGL_lose_context")?.loseContext()
    this.canvas.remove()
  }
}

const DEFAULT_ITEMS = [
  { image: "https://images.unsplash.com/photo-1770478518850-ba0d2fc3d947" },
  { image: "https://images.unsplash.com/photo-1756574747685-257ddaebe519" },
  { image: "https://images.unsplash.com/photo-1629157247277-48f870757026" },
]

export default function MorphSlider({
  items = DEFAULT_ITEMS,
  startIndex = 0,
  transition = "melt",
  duration = 1.1,
  ease = "power2.inOut",
  intensity = 0.55,
  scale = 2.4,
  aberration = 0.35,
  drift = 0.4,
  autoplay = false,
  autoplayDelay = 4,
  loop = true,
  radius = 16,
  overlayColor = "#000000",
  showCaptions = true,
  showControls = true,
  showIndicators = true,
  className = "",
  ...props
}) {
  const containerRef = useRef(null)
  const engineRef = useRef(null)
  const optionsRef = useRef(null)
  const [index, setIndex] = useState(startIndex)
  const [hovering, setHovering] = useState(false)
  optionsRef.current = {
    transition,
    duration,
    ease,
    intensity,
    scale,
    aberration,
    drift,
    overlayColor,
    loop,
  }

  useEffect(() => {
    if (!containerRef.current || items.length === 0) return undefined
    const engine = new MorphEngine(containerRef.current, {
      items,
      startIndex: Math.min(Math.max(startIndex, 0), items.length - 1),
      reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)")
        .matches,
      getOptions: () => optionsRef.current,
      onIndexChange: setIndex,
    })
    engineRef.current = engine
    return () => {
      engine.destroy()
      engineRef.current = null
    }
  }, [items, startIndex])

  const next = useCallback(() => engineRef.current?.step(1), [])
  const previous = useCallback(() => engineRef.current?.step(-1), [])

  useEffect(() => {
    if (!autoplay || hovering) return undefined
    const timer = window.setTimeout(next, Math.max(autoplayDelay, 1) * 1000)
    return () => window.clearTimeout(timer)
  }, [autoplay, autoplayDelay, hovering, index, next])

  const handlePointer = useCallback((event) => {
    const bounds = event.currentTarget.getBoundingClientRect()
    engineRef.current?.setPointer(
      (event.clientX - bounds.left) / bounds.width,
      1 - (event.clientY - bounds.top) / bounds.height
    )
  }, [])

  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === "ArrowRight") {
        event.preventDefault()
        next()
      } else if (event.key === "ArrowLeft") {
        event.preventDefault()
        previous()
      }
    },
    [next, previous]
  )

  return (
    <div
      className={`morph-slider ${className}`.trim()}
      style={{
        borderRadius: `${radius}px`,
        "--ms-swap": `${(duration * 0.66).toFixed(3)}s`,
        "--ms-dot": `${(duration * 0.45).toFixed(3)}s`,
      }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      {...props}
    >
      <div
        ref={containerRef}
        className="morph-slider-stage"
        role="group"
        aria-roledescription="carousel"
        aria-label="Basil flower image slider"
        tabIndex={showControls || showIndicators ? 0 : -1}
        onKeyDown={handleKeyDown}
        onPointerDown={handlePointer}
      />

      {showCaptions && items.some((item) => item.caption) ? (
        <div className="morph-slider-caption" aria-live="polite">
          {items.map((item, itemIndex) =>
            item.caption ? (
              <span
                key={item.image}
                aria-hidden={itemIndex === index ? undefined : true}
                className={`morph-slider-caption-text ${itemIndex === index ? "is-active" : ""}`}
              >
                {item.caption}
              </span>
            ) : null
          )}
        </div>
      ) : null}

      {showControls ? (
        <div className="morph-slider-controls">
          <button
            type="button"
            className="morph-slider-btn"
            aria-label="Previous slide"
            onClick={previous}
          >
            ‹
          </button>
          <button
            type="button"
            className="morph-slider-btn"
            aria-label="Next slide"
            onClick={next}
          >
            ›
          </button>
        </div>
      ) : null}

      {showIndicators ? (
        <div
          className="morph-slider-indicators"
          role="tablist"
          aria-label="Slides"
        >
          {items.map((item, itemIndex) => (
            <button
              key={item.image}
              type="button"
              role="tab"
              aria-selected={itemIndex === index}
              aria-label={`Go to slide ${itemIndex + 1}`}
              className={`morph-slider-dot ${itemIndex === index ? "is-active" : ""}`}
              onClick={() => engineRef.current?.goTo(itemIndex)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
