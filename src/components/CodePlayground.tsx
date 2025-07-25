import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Loader2,
  Play,
  Download,
  Share2,
  Copy,
  RotateCcw,
  Eye,
  EyeOff,
} from "lucide-react";

interface ShaderExample {
  id: string;
  name: string;
  description: string;
  code: string;
}

const vertexShaderTemplate = `
attribute vec4 a_position;
void main() {
    gl_Position = a_position;
}
`.trim();

const shaderExamples: ShaderExample[] = [
  {
    id: "waves",
    name: "Color Waves",
    description: "Flowing color waves with mouse interaction",
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    vec3 color = vec3(0.0);

    // Simple animated gradient
    color.r = sin(u_time * 2.0 + st.x * 3.14159) * 0.5 + 0.5;
    color.g = cos(u_time * 1.5 + st.y * 3.14159) * 0.5 + 0.5;
    color.b = sin(u_time + length(st - 0.5) * 6.28318) * 0.5 + 0.5;

    // Add some mouse interaction
    float dist = distance(st, u_mouse / u_resolution);
    color *= 1.0 - smoothstep(0.0, 0.3, dist);

    gl_FragColor = vec4(color, 1.0);
}`,
  },
  {
    id: "raymarching",
    name: "Ray Marching",
    description: "3D ray marched scene with spheres and boxes",
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

// Distance function for a sphere
float sdSphere(vec3 p, float r) {
    return length(p) - r;
}

// Distance function for a box
float sdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

// Scene SDF
float map(vec3 p) {
    vec3 p1 = p;
    p1.x = mod(p1.x, 2.0) - 1.0;
    p1.z = mod(p1.z, 2.0) - 1.0;

    float sphere = sdSphere(p1, 0.3);
    float box = sdBox(p - vec3(0, sin(u_time) * 0.5, 0), vec3(0.5));

    return min(sphere, box);
}

// Ray marching
float rayMarch(vec3 ro, vec3 rd) {
    float t = 0.0;
    for (int i = 0; i < 64; i++) {
        vec3 p = ro + rd * t;
        float d = map(p);
        if (d < 0.001) break;
        t += d;
        if (t > 100.0) break;
    }
    return t;
}

// Calculate normal
vec3 calcNormal(vec3 p) {
    const float eps = 0.001;
    return normalize(vec3(
        map(p + vec3(eps, 0, 0)) - map(p - vec3(eps, 0, 0)),
        map(p + vec3(0, eps, 0)) - map(p - vec3(0, eps, 0)),
        map(p + vec3(0, 0, eps)) - map(p - vec3(0, 0, eps))
    ));
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

    // Camera
    vec3 ro = vec3(0, 0, 3);
    vec3 rd = normalize(vec3(uv, -1));

    // Mouse rotation
    vec2 mouse = (u_mouse / u_resolution.xy - 0.5) * 2.0;
    float cx = cos(mouse.y);
    float sx = sin(mouse.y);
    float cy = cos(mouse.x);
    float sy = sin(mouse.x);

    mat3 rotX = mat3(1, 0, 0, 0, cx, -sx, 0, sx, cx);
    mat3 rotY = mat3(cy, 0, sy, 0, 1, 0, -sy, 0, cy);
    rd = rotY * rotX * rd;

    // Ray march
    float t = rayMarch(ro, rd);

    vec3 color = vec3(0.1);
    if (t < 100.0) {
        vec3 p = ro + rd * t;
        vec3 n = calcNormal(p);

        // Lighting
        vec3 lightDir = normalize(vec3(1, 1, 1));
        float diff = max(dot(n, lightDir), 0.0);

        color = vec3(0.2, 0.7, 1.0) * diff;
        color += vec3(0.1, 0.2, 0.4) * (n.y * 0.5 + 0.5);
    }

    gl_FragColor = vec4(color, 1.0);
}`,
  },
  {
    id: "mandelbrot",
    name: "Mandelbrot Set",
    description: "Classic fractal with zoom and pan controls",
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

    // Mouse controls zoom and pan
    float zoom = 1.0 + (u_mouse.y / u_resolution.y) * 3.0;
    vec2 offset = (u_mouse / u_resolution.xy - 0.5) * 2.0;

    vec2 c = uv * zoom + offset;
    vec2 z = vec2(0.0);

    int maxIter = 100;
    int iter = 0;

    for (int i = 0; i < 100; i++) {
        if (length(z) > 2.0) break;
        z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
        iter++;
    }

    if (iter == maxIter) {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    } else {
        float t = float(iter) / float(maxIter);
        vec3 color = hsv2rgb(vec3(t * 6.0 + u_time * 0.5, 0.8, 1.0));
        gl_FragColor = vec4(color, 1.0);
    }
}`,
  },
  {
    id: "plasma",
    name: "Plasma Effect",
    description: "Retro plasma effect with animated colors",
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    uv = uv * 2.0 - 1.0;
    uv.x *= u_resolution.x / u_resolution.y;

    // Mouse influence
    vec2 mouse = (u_mouse / u_resolution.xy - 0.5) * 2.0;

    float v = 0.0;
    v += sin((uv.x + u_time) * 10.0);
    v += sin((uv.y + u_time) * 10.0);
    v += sin((uv.x + uv.y + u_time) * 10.0);

    vec2 c = uv + vec2(sin(u_time * 3.0) * 0.5, cos(u_time * 2.0) * 0.5);
    v += sin(sqrt(c.x * c.x + c.y * c.y + 1.0) * 10.0 + u_time * 2.0);

    // Mouse interaction
    v += length(uv - mouse) * 2.0;

    v *= 0.5;

    vec3 color = vec3(
        sin(v + u_time),
        sin(v + u_time + 2.094),
        sin(v + u_time + 4.188)
    ) * 0.5 + 0.5;

    gl_FragColor = vec4(color, 1.0);
}`,
  },
  {
    id: "tunnel",
    name: "Infinite Tunnel",
    description: "3D tunnel effect with perspective distortion",
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;

    // Convert to polar coordinates
    float radius = length(uv);
    float angle = atan(uv.y, uv.x);

    // Create tunnel effect
    float tunnel = 1.0 / radius;

    // Mouse influence on tunnel speed and twist
    float mouseInfluence = (u_mouse.x / u_resolution.x) * 2.0;
    float time = u_time + mouseInfluence;

    // Texture coordinates
    vec2 texCoord = vec2(
        angle / (2.0 * 3.14159) + time * 0.1,
        tunnel + time * 0.5
    );

    // Create striped pattern
    float stripes = sin(texCoord.x * 20.0) * sin(texCoord.y * 10.0);

    // Color based on distance and pattern
    vec3 color = vec3(0.5 + 0.5 * stripes);
    color *= vec3(
        1.0 + sin(time + texCoord.y * 5.0),
        1.0 + cos(time * 1.3 + texCoord.y * 7.0),
        1.0 + sin(time * 0.7 + texCoord.y * 3.0)
    ) * 0.3;

    // Fade at edges
    color *= smoothstep(2.0, 0.5, radius);

    gl_FragColor = vec4(color, 1.0);
}`,
  },
  {
    id: "voronoi",
    name: "Voronoi Diagram",
    description: "Animated cellular patterns",
    code: `precision mediump float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

vec2 random2(vec2 st) {
    st = vec2(dot(st, vec2(127.1, 311.7)),
              dot(st, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy / u_resolution.xy;
    st.x *= u_resolution.x / u_resolution.y;

    vec3 color = vec3(0.0);

    // Scale
    st *= 5.0;

    // Tile the space
    vec2 i_st = floor(st);
    vec2 f_st = fract(st);

    float m_dist = 1.0;

    for (int y = -1; y <= 1; y++) {
        for (int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = random2(i_st + neighbor);

            // Animate the points
            point = 0.5 + 0.5 * sin(u_time + 6.2831 * point);

            // Mouse influence
            vec2 mouseInfluence = (u_mouse / u_resolution.xy) * 0.1;
            point += mouseInfluence;

            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);

            m_dist = min(m_dist, dist);
        }
    }

    // Add color based on distance
    color += m_dist;
    color += 1.0 - step(0.02, m_dist);

    // Color scheme
    color = vec3(
        color.r,
        color.r * sin(u_time + st.x),
        color.r * cos(u_time + st.y)
    );

    gl_FragColor = vec4(color, 1.0);
}`,
  },
];

// GLSL Runner
const runGLSL = async (
  code: string,
  canvas: HTMLCanvasElement,
): Promise<void> => {
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
  if (!gl) {
    throw new Error("WebGL not supported");
  }

  // Vertex shader (simple quad)
  const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
  gl.shaderSource(vertexShader, vertexShaderTemplate);
  gl.compileShader(vertexShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    throw new Error(
      "Vertex shader error: " + gl.getShaderInfoLog(vertexShader),
    );
  }

  // Fragment shader (user code)
  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
  gl.shaderSource(fragmentShader, code);
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    throw new Error(
      "Fragment shader error: " + gl.getShaderInfoLog(fragmentShader),
    );
  }

  // Create program
  const program = gl.createProgram()!;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error("Program linking error: " + gl.getProgramInfoLog(program));
  }

  gl.useProgram(program);

  // Set up quad vertices
  const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  // Get uniform locations
  const timeLocation = gl.getUniformLocation(program, "u_time");
  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const mouseLocation = gl.getUniformLocation(program, "u_mouse");

  let mouseX = 0,
    mouseY = 0;
  let animationId: number;

  // Mouse tracking
  const handleMouseMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    mouseX = e.clientX - rect.left;
    mouseY = rect.height - (e.clientY - rect.top); // Flip Y coordinate
  };

  canvas.addEventListener("mousemove", handleMouseMove);

  // Animation loop
  const startTime = Date.now();
  const animate = () => {
    const time = (Date.now() - startTime) / 1000;

    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.uniform1f(timeLocation, time);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    gl.uniform2f(mouseLocation, mouseX, mouseY);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    animationId = requestAnimationFrame(animate);
  };

  animate();

  // Cleanup function
  (canvas as any)._cleanup = () => {
    cancelAnimationFrame(animationId);
    canvas.removeEventListener("mousemove", handleMouseMove);
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
  };
};

interface CodePlaygroundProps {
  initialExample?: string;
  className?: string;
}

export default function CodePlayground({
  initialExample = "waves",
  className = "",
}: CodePlaygroundProps) {
  const [currentExample, setCurrentExample] = useState<ShaderExample>(
    shaderExamples.find((e) => e.id === initialExample) || shaderExamples[0],
  );
  const [code, setCode] = useState(currentExample.code);
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const runCode = useCallback(async () => {
    if (!canvasRef.current) return;

    setIsRunning(true);
    setError(null);

    try {
      // Clean up previous execution
      if ((canvasRef.current as any)._cleanup) {
        (canvasRef.current as any)._cleanup();
      }

      // Set canvas size
      const canvas = canvasRef.current;
      const container = canvas.parentElement!;
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;

      await runGLSL(code, canvas);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsRunning(false);
    }
  }, [code]);

  const handleExampleChange = (example: ShaderExample) => {
    setCurrentExample(example);
    setCode(example.code);
    setError(null);
  };

  const resetCode = () => {
    setCode(currentExample.code);
    setError(null);
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const downloadCode = () => {
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentExample.id}_shader.frag`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareCode = async () => {
    const shareData = {
      example: currentExample.id,
      code: btoa(encodeURIComponent(code)),
    };
    const url = new URL(window.location.href);
    url.searchParams.set("shader", JSON.stringify(shareData));

    try {
      await navigator.clipboard.writeText(url.toString());
    } catch (err) {
      console.error("Failed to copy share URL:", err);
    }
  };

  // Auto-run on code change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      if (code.trim()) {
        runCode();
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [code, runCode]);

  // Handle URL parameters for sharing
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const shaderParam = urlParams.get("shader");

    if (shaderParam) {
      try {
        const shareData = JSON.parse(shaderParam);
        const example = shaderExamples.find((e) => e.id === shareData.example);
        if (example) {
          setCurrentExample(example);
          setCode(decodeURIComponent(atob(shareData.code)));
        }
      } catch (err) {
        console.error("Failed to parse shared code:", err);
      }
    }
  }, []);

  return (
    <div
      className={`w-full h-full flex flex-col bg-gray-900 text-white rounded-lg overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">GLSL Shader Playground</h3>
          <select
            value={currentExample.id}
            onChange={(e) => {
              const example = shaderExamples.find(
                (ex) => ex.id === e.target.value,
              );
              if (example) handleExampleChange(example);
            }}
            className="px-3 py-1 text-sm bg-gray-700 text-gray-300 rounded border border-gray-600 focus:outline-none focus:border-blue-500"
          >
            {shaderExamples.map((example) => (
              <option key={example.id} value={example.id}>
                {example.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setIsPreviewVisible(!isPreviewVisible)}
            className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
            title={isPreviewVisible ? "Hide Preview" : "Show Preview"}
          >
            {isPreviewVisible ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
          <button
            onClick={runCode}
            disabled={isRunning}
            className="flex items-center px-3 py-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 rounded transition-colors"
          >
            {isRunning ? (
              <Loader2 size={16} className="animate-spin mr-1" />
            ) : (
              <Play size={16} className="mr-1" />
            )}
            Run
          </button>
          <button
            onClick={resetCode}
            className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
            title="Reset to example"
          >
            <RotateCcw size={16} />
          </button>
          <button
            onClick={copyCode}
            className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
            title="Copy code"
          >
            <Copy size={16} />
          </button>
          <button
            onClick={downloadCode}
            className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
            title="Download shader"
          >
            <Download size={16} />
          </button>
          <button
            onClick={shareCode}
            className="p-2 rounded bg-gray-700 hover:bg-gray-600 transition-colors"
            title="Share shader"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Example description */}
      <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
        <p className="text-sm text-gray-300">{currentExample.description}</p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Code editor */}
        <div className="w-1/2 flex flex-col border-r border-gray-700">
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full h-full p-4 bg-gray-900 text-white font-mono text-sm resize-none focus:outline-none overflow-auto"
              placeholder="Write your GLSL fragment shader here..."
              spellCheck={false}
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#4B5563 #1F2937",
              }}
            />
          </div>

          {/* Error display */}
          {error && (
            <div className="p-3 bg-red-900/50 border-t border-red-500/50 text-red-200 text-sm font-mono">
              <strong>Error:</strong> {error}
            </div>
          )}
        </div>

        {/* Preview */}
        {isPreviewVisible && (
          <div className="w-1/2 flex flex-col">
            <div className="flex-1 relative bg-black">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{ imageRendering: "pixelated" }}
              />
              {isRunning && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <Loader2 className="animate-spin text-white" size={32} />
                </div>
              )}
            </div>

            {/* Info panel */}
            <div className="p-3 bg-gray-800 border-t border-gray-700 text-sm text-gray-300">
              <div className="mb-2">
                <strong>Available Uniforms:</strong>
              </div>
              <div className="text-xs text-gray-400 space-y-1">
                <div>
                  <code>float u_time</code> - Animation time in seconds
                </div>
                <div>
                  <code>vec2 u_resolution</code> - Canvas resolution (width,
                  height)
                </div>
                <div>
                  <code>vec2 u_mouse</code> - Mouse position (x, y)
                </div>
                <div className="mt-2 text-gray-500">
                  Move mouse to interact • Code auto-runs after 1s
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
