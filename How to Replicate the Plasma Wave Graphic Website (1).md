# How to Replicate the Plasma Wave Graphic Website

This guide will walk you through the exact steps to create and deploy a React website featuring the plasma wave graphic, similar to the one found on reactbits.dev.

## Prerequisites
Before you begin, ensure you have the following installed on your system:
-   **Node.js**: Version 18 or higher.
-   **pnpm**: A fast, disk-space efficient package manager. If you don't have it, you can install it via npm: `npm install -g pnpm`

## Step 1: Create a New React Application
First, create a new React project using `manus-create-react-app` (or `vite` if you are not in the Manus environment):

```bash
manus-create-react-app plasma-wave-site
cd plasma-wave-site
```

## Step 2: Install Dependencies
Navigate into your new project directory and install the `ogl` library, which is used for the WebGL rendering of the plasma wave:

```bash
pnpm add ogl
```

## Step 3: Create the PlasmaWaveV2 Component
Create a new file named `src/components/PlasmaWaveV2.jsx` and paste the following code into it. This code contains the React component that renders the plasma wave using WebGL shaders.

```jsx
import { useRef, useEffect, useState } from 'react';
import { Renderer, Camera, Transform, Program, Mesh, Geometry } from 'ogl';

const vertex = /* glsl */ `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
precision mediump float;
uniform float iTime;
uniform vec2  iResolution;
uniform vec2  uOffset;
uniform float uRotation;
uniform float focalLength;
uniform float speed1;
uniform float speed2;
uniform float dir2;
uniform float bend1;
uniform float bend2;
uniform float bendAdj1;
uniform float bendAdj2;
uniform float uOpacity;

const float lt   = 0.05;
const float pi   = 3.141592653589793;
const float pi2  = pi * 2.0;
const float pi_2 = pi * 0.5;
#define MAX_STEPS 15
#define A(v) mat2(cos(m.v + radians(vec4(0.0,-90.0,90.0,0.0))))

void mainImage(out vec4 C, in vec2 U) {
  float t = iTime * pi;
  float s = 1.0;
  float d = 0.0;
  vec2  R = iResolution;
  vec2  m = vec2(0.0);

  vec3 o = vec3(0.0, 0.0, -7.0);
  vec3 u = normalize(vec3((U - 0.5 * R) / R.y, focalLength));
  vec3 k = vec3(0.0);
  vec3 p;

  mat2 v = A(y), h = A(x);

  float t1 = t * 0.7;
  float t2 = t * 0.9;
  float tSpeed1 = t * speed1;
  float tSpeed2 = t * speed2 * dir2;

  for (int step = 0; step < MAX_STEPS; ++step) {
    p = o + u * d;
    p.yz *= v;
    p.xz *= h;
    p.x  -= 15.0;

    float px = p.x;
    float wob1 = bend1 + bendAdj1 + sin(t1 + px * 0.8) * 0.1;
    float wob2 = bend2 + bendAdj2 + cos(t2 + px * 1.1) * 0.1;

    vec2 baseOffset = vec2(px, px + pi_2);
    vec2 sinOffset  = sin(baseOffset + tSpeed1) * wob1;
    vec2 cosOffset  = cos(baseOffset + tSpeed2) * wob2;

    float wSin = length(p.yz - sinOffset) - lt;
    float wCos = length(p.yz - cosOffset) - lt;

    k.x = max(px + lt, wSin);
    k.y = max(px + lt, wCos);

    s = min(s, min(k.x, k.y));
    if (s < 0.001 || d > 400.0) break;
    d += s * 0.7;
  }

  vec3 c = max(cos(d * pi2) - s * sqrt(d) - k, 0.0);
  c.gb += 0.1;
  if (max(c.r, max(c.g, c.b)) < 0.15) discard;
  C = vec4(c * 0.4 + c.brg * 0.6 + c * c, uOpacity);
}

void main() {
  vec2 coord = gl_FragCoord.xy + uOffset;
  coord -= 0.5 * iResolution;
  float c = cos(uRotation), s = sin(uRotation);
  coord = mat2(c, -s, s, c) * coord;
  coord += 0.5 * iResolution;

  vec4 color;
  mainImage(color, coord);
  gl_FragColor = color;
}
`;

export default function PlasmaWaveV2({
  xOffset = 0,
  yOffset = 0,
  rotationDeg = 0,
  focalLength = 0.8,
  speed1 = 0.1,
  speed2 = 0.1,
  dir2 = 1.0,
  bend1 = 0.9,
  bend2 = 0.6,
  fadeInDuration = 2000
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef(null);
  const uniformOffset = useRef(new Float32Array([xOffset, yOffset]));
  const uniformResolution = useRef(new Float32Array([1, 1]));
  const rendererRef = useRef(null);
  const fadeStartTime = useRef(null);
  const lastTimeRef = useRef(0);
  const pausedTimeRef = useRef(0);

  const propsRef = useRef({
    xOffset, yOffset, rotationDeg, focalLength,
    speed1, speed2, dir2, bend1, bend2, fadeInDuration,
  });
  propsRef.current = {
    xOffset, yOffset, rotationDeg, focalLength,
    speed1, speed2, dir2, bend1, bend2, fadeInDuration,
  };

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);

    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  useEffect(() => {
    if (!containerRef.current || isMobile) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: "50px",
        threshold: 0.1,
      }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    const renderer = new Renderer({
      alpha: true,
      dpr: Math.min(window.devicePixelRatio, 1),
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
    });
    rendererRef.current = renderer;

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    containerRef.current.appendChild(gl.canvas);

    const camera = new Camera(gl);
    const scene = new Transform();

    const geometry = new Geometry(gl, {
      position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
    });

    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: uniformResolution.current },
        uOffset: { value: uniformOffset.current },
        uRotation: { value: 0 },
        focalLength: { value: focalLength },
        speed1: { value: speed1 },
        speed2: { value: speed2 },
        dir2: { value: dir2 },
        bend1: { value: bend1 },
        bend2: { value: bend2 },
        bendAdj1: { value: 0 },
        bendAdj2: { value: 0 },
        uOpacity: { value: 0 },
      },
    });
    new Mesh(gl, { geometry, program }).setParent(scene);

    const resize = () => {
      const { width, height } =
        containerRef.current?.getBoundingClientRect() || { width: 0, height: 0 };
      renderer.setSize(width, height);
      uniformResolution.current[0] = width * renderer.dpr;
      uniformResolution.current[1] = height * renderer.dpr;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.clear(gl.COLOR_BUFFER_BIT);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(containerRef.current);

    let rafId;
    const loop = now => {
      const {
        xOffset: xOff,
        yOffset: yOff,
        rotationDeg: rot,
        focalLength: fLen,
        fadeInDuration: fadeDur,
      } = propsRef.current;

      if (isVisible) {
        if (lastTimeRef.current === 0) {
          lastTimeRef.current = now - pausedTimeRef.current;
        }

        const t = (now - lastTimeRef.current) * 0.001;

        if (fadeStartTime.current === null && t > 0.1) {
          fadeStartTime.current = now;
        }

        let opacity = 0;
        if (fadeStartTime.current !== null) {
          const fadeElapsed = now - fadeStartTime.current;
          opacity = Math.min(fadeElapsed / fadeDur, 1);
          opacity = 1 - Math.pow(1 - opacity, 3);
        }

        uniformOffset.current[0] = xOff;
        uniformOffset.current[1] = yOff;

        program.uniforms.iTime.value = t;
        program.uniforms.uRotation.value = rot * Math.PI / 180;
        program.uniforms.focalLength.value = fLen;
        program.uniforms.uOpacity.value = opacity;

        renderer.render({ scene, camera });
      } else {
        if (lastTimeRef.current !== 0) {
          pausedTimeRef.current = now - lastTimeRef.current;
          lastTimeRef.current = 0;
        }
      }

      rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      renderer.gl.canvas.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile, isVisible]);

  if (isMobile) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        width: "100vw",
        height: "100vh"
      }}
    >
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 200,
          background: "linear-gradient(to top, #060010, transparent)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />
    </div>
  );
}
```

## Step 4: Update `App.jsx`
Modify your `src/App.jsx` file to import and render the `PlasmaWaveV2` component. You can also add some overlay text to confirm it's working.

```jsx
import { useState, useEffect } from 'react';
import PlasmaWaveV2 from './components/PlasmaWaveV2';
import './App.css';

function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <PlasmaWaveV2 />
      <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold">
        Plasma Wave Graphic
      </div>
    </div>
  );
}

export default App;
```

## Step 5: Update `App.css`
Modify your `src/App.css` file to ensure the background is black and the text is visible. You can remove any previous hero-related styles if you only want the plasma graphic.

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);
}

:root {
  --radius: 0.625rem;
  --background: oklch(0.05 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0.145 0 0);
  --popover: oklch(1 0 0);
  --popover-foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  --secondary: oklch(0.97 0 0);
  --secondary-foreground: oklch(0.205 0 0);
  --muted: oklch(0.97 0 0);
  --muted-foreground: oklch(0.556 0 0);
  --accent: oklch(0.97 0 0);
  --accent-foreground: oklch(0.205 0 0);
  --destructive: oklch(0.577 0.245 27.325);
  --border: oklch(0.922 0 0);
  --input: oklch(0.922 0 0);
  --ring: oklch(0.708 0 0);
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  --card: oklch(0.205 0 0);
  --card-foreground: oklch(0.985 0 0);
  --popover: oklch(0.205 0 0);
  --popover-foreground: oklch(0.985 0 0);
  --primary: oklch(0.922 0 0);
  --primary-foreground: oklch(0.205 0 0);
  --secondary: oklch(0.269 0 0);
  --secondary-foreground: oklch(0.985 0 0);
  --muted: oklch(0.269 0 0);
  --muted-foreground: oklch(0.708 0 0);
  --accent: oklch(0.269 0 0);
  --accent-foreground: oklch(0.985 0 0);
  --destructive: oklch(0.704 0.191 22.216);
  --border: oklch(1 0 0 / 10%);
  --input: oklch(1 0 0 / 15%);
  --ring: oklch(0.556 0 0);
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.556 0 0);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

## Step 6: Build and Deploy (Optional)
To build your application for production and deploy it, use the following commands:

```bash
pnpm run build
```

After building, you can deploy the `dist` folder to your preferred hosting service. If you are in the Manus environment, you can use the `service_deploy_frontend` tool:

```bash
service_deploy_frontend(framework="react", project_dir="/home/ubuntu/plasma-wave-site")
```

This will give you a public URL where your plasma wave graphic website is hosted.

Let me know if you have any questions or need further assistance!

