import { Environment, Lightformer, MeshReflectorMaterial } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { Bloom, ChromaticAberration, EffectComposer, Noise, Vignette } from "@react-three/postprocessing";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { getLevel, type Level, type Prop, type WaterVol } from "@/game/levels";
import { frame, sim } from "@/game/sim";
import {
  classifySurface,
  envIntensityFor,
  floorSurface,
  normalScaleFor,
  repeatScale,
  surfaceTextures,
  type SurfaceKind,
} from "@/game/surfaces";
import { useGame, type Quality } from "@/game/store";

const CHROMA = new THREE.Vector2(0.00065, 0.00105);
const CHROMA_SOFT = new THREE.Vector2(0.0002, 0.0003);

const SKY_VERT = `
  varying vec3 vP;
  void main() {
    vP = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SKY_FRAG = `
  varying vec3 vP;
  uniform vec3 zenith;
  uniform vec3 horizon;
  uniform vec3 ground;
  void main() {
    vec3 d = normalize(vP);
    float h = d.y;
    vec3 col = mix(ground, horizon, smoothstep(-0.4, 0.05, h));
    col = mix(col, zenith, smoothstep(0.0, 0.72, h));
    gl_FragColor = vec4(col, 1.0);
  }
`;

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function Sky({ level }: { level: Level }) {
  const uniforms = useMemo(
    () => ({
      zenith: { value: new THREE.Color(level.sky.zenith) },
      horizon: { value: new THREE.Color(level.sky.horizon) },
      ground: { value: new THREE.Color(level.sky.ground) },
    }),
    [level.sky.zenith, level.sky.horizon, level.sky.ground],
  );
  return (
    <mesh frustumCulled={false} renderOrder={-1}>
      <sphereGeometry args={[170, 24, 16]} />
      <shaderMaterial
        side={THREE.BackSide}
        depthWrite={false}
        vertexShader={SKY_VERT}
        fragmentShader={SKY_FRAG}
        uniforms={uniforms}
      />
    </mesh>
  );
}

function Exposure({ value }: { value: number }) {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    gl.toneMappingExposure = value;
  }, [gl, value]);
  return null;
}

function Rig() {
  const cam = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  useFrame((state, dt) => {
    const step = Math.min(dt, 0.1);
    frame(step);
    const mode = useGame.getState().mode;
    const level = getLevel(useGame.getState().levelId);
    if (mode === "title") {
      const t = reducedMotion() ? 0.8 : state.clock.elapsedTime;
      if (level.id === "folyoso") {
        const z = 9 + Math.sin(t * 0.16) * 2.4;
        cam.position.set(0.15, 1.55, z);
        cam.lookAt(0, 1.25, z + 7);
      } else if (level.id === "szoba") {
        const z = 2.4 + Math.sin(t * 0.14) * 0.45;
        cam.position.set(0.35, 1.52, z);
        cam.lookAt(-1.3, 1.15, -1.2);
      } else if (level.id === "poolrooms") {
        const z = 4 + Math.sin(t * 0.1) * 2.2;
        cam.position.set(0.35, 1.35, z);
        cam.lookAt(0, 0.35, z - 7);
      } else {
        const [ox, oz] = level.orbit;
        cam.position.set(
          ox + Math.sin(t * 0.12) * level.orbitR,
          level.orbitY,
          oz + Math.cos(t * 0.1) * level.orbitR * 0.72,
        );
        cam.lookAt(ox, 1.1, oz - 0.2);
      }
      return;
    }
    const calm = reducedMotion();
    const bob = calm ? 0 : Math.sin(sim.bob) * Math.min(sim.speed, 4.2) * 0.011;
    const eye = sim.y + 1.48 + bob;
    cam.position.set(sim.x, eye, sim.z);
    const cp = Math.cos(sim.pitch);
    cam.lookAt(
      sim.x - Math.sin(sim.yaw) * cp,
      eye + Math.sin(sim.pitch),
      sim.z - Math.cos(sim.yaw) * cp,
    );
    const target = sim.speed > 5.15 ? 75 : 68;
    if (Math.abs(cam.fov - target) > 0.04) {
      cam.fov += (target - cam.fov) * (1 - Math.exp(-5 * step));
      cam.updateProjectionMatrix();
    }
  });
  return null;
}

function Look() {
  const gl = useThree((s) => s.gl);
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      if (document.pointerLockElement == null || !sim.playing) return;
      const xSign = sim.invertX ? -1 : 1;
      const ySign = sim.invertY ? -1 : 1;
      sim.yaw -= e.movementX * sim.sens * xSign;
      sim.pitch = Math.max(-1.15, Math.min(1.15, sim.pitch - e.movementY * sim.sens * ySign));
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  useEffect(() => {
    const el = gl.domElement;
    const onClick = () => {
      if (useGame.getState().mode !== "play") return;
      if (document.pointerLockElement !== el) void el.requestPointerLock();
    };
    el.addEventListener("click", onClick);
    return () => el.removeEventListener("click", onClick);
  }, [gl]);
  return null;
}

function useSignTexture(text: string, color: string) {
  const tex = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    const g = canvas.getContext("2d");
    if (!g) return null;
    g.fillStyle = "#160f13";
    g.fillRect(0, 0, 512, 256);
    const size = text.length > 16 ? 40 : text.length > 9 ? 58 : 92;
    g.font = `700 ${size}px Georgia, "Liberation Serif", serif`;
    g.fillStyle = color;
    g.textAlign = "center";
    g.textBaseline = "middle";
    g.fillText(text, 256, 128);
    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }, [text, color]);
  useEffect(() => () => tex?.dispose(), [tex]);
  return tex;
}

function SignMesh({ p }: { p: Prop }) {
  const tex = useSignTexture(p.sign ?? "", p.c);
  if (!tex) return null;
  return (
    <mesh position={p.p} rotation={p.r ?? [0, 0, 0]}>
      <planeGeometry args={[p.s[0], p.s[1]]} />
      <meshBasicMaterial map={tex} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

function useRepeatedMaps(kind: SurfaceKind, rx: number, ry: number) {
  const base = useMemo(() => surfaceTextures(kind), [kind]);
  const maps = useMemo(() => {
    const tune = (tex: THREE.CanvasTexture) => {
      const copy = tex.clone();
      copy.wrapS = THREE.RepeatWrapping;
      copy.wrapT = THREE.RepeatWrapping;
      copy.repeat.set(Math.max(0.35, rx), Math.max(0.35, ry));
      copy.anisotropy = 8;
      copy.needsUpdate = true;
      return copy;
    };
    return {
      map: tune(base.map),
      roughnessMap: tune(base.roughnessMap),
      normalMap: tune(base.normalMap),
    };
  }, [base, rx, ry]);
  useEffect(
    () => () => {
      maps.map.dispose();
      maps.roughnessMap.dispose();
      maps.normalMap.dispose();
    },
    [maps],
  );
  return maps;
}

function SolidMesh({ p, shadows }: { p: Prop; shadows: boolean }) {
  const rot = p.r ?? [0, 0, 0];
  const cast = shadows && p.cast !== false && p.solid !== false;
  const kind = classifySurface(p);
  const unit = repeatScale(kind);
  const rx = Math.max(p.s[0], p.t === "cyl" || p.t === "sphere" ? p.s[0] * 2 : 0.4) / unit;
  const ry = Math.max(p.s[1], 0.4) / unit;
  const maps = useRepeatedMaps(kind, rx, ry);
  const normalScale = useMemo(() => {
    const n = normalScaleFor(kind);
    return new THREE.Vector2(n, n);
  }, [kind]);
  useFrame((_, dt) => {
    if (kind !== "water") return;
    maps.normalMap.offset.x += dt * 0.025;
    maps.normalMap.offset.y += dt * 0.018;
  });
  const geo = (() => {
    if (p.t === "cyl") return <cylinderGeometry args={[p.s[0], p.s[0], p.s[1], 20]} />;
    if (p.t === "sphere") return <sphereGeometry args={[p.s[0], 24, 16]} />;
    if (p.t === "plane") return <planeGeometry args={[p.s[0], p.s[1]]} />;
    if (p.t === "torus") return <torusGeometry args={[p.s[0], p.s[1], 12, 24]} />;
    return <boxGeometry args={[p.s[0], p.s[1], p.s[2]]} />;
  })();
  const common = {
    color: p.c,
    map: maps.map,
    roughnessMap: maps.roughnessMap,
    normalMap: maps.normalMap,
    normalScale,
    roughness: p.rg ?? (p.trans != null ? 0.06 : 0.6),
    metalness: p.m ?? (p.trans != null ? 0.04 : 0.05),
    envMapIntensity: envIntensityFor(kind),
    emissive: p.e ?? "#000000",
    emissiveIntensity: p.ei ?? 0,
  };
  return (
    <mesh position={p.p} rotation={rot} castShadow={cast} receiveShadow={shadows}>
      {geo}
      {p.trans != null ? (
        <meshPhysicalMaterial {...common} transmission={p.trans} thickness={0.6} ior={1.33} transparent />
      ) : (
        <meshStandardMaterial {...common} />
      )}
    </mesh>
  );
}

function PropView({ p, shadows }: { p: Prop; shadows: boolean }) {
  if (p.sign) return <SignMesh p={p} />;
  return <SolidMesh p={p} shadows={shadows} />;
}

function Floor({ level, quality }: { level: Level; quality: Quality }) {
  const f = level.floor;
  const kind = floorSurface(level.id);
  const unit = repeatScale(kind);
  const maps = useRepeatedMaps(kind, f.w / unit, f.d / unit);
  const normalScale = useMemo(() => {
    const n = normalScaleFor(kind) * (f.mirror > 0.7 ? 0.65 : 1);
    return new THREE.Vector2(n, n);
  }, [kind, f.mirror]);
  const calm = level.id === "poolrooms";
  const wet = f.mirror >= 0.7;
  const blur: [number, number] = calm
    ? [4, 2]
    : quality === "max"
      ? wet
        ? [16, 8]
        : [70, 32]
      : wet
        ? [36, 18]
        : [110, 50];
  useFrame((_, dt) => {
    if (kind !== "water" || reducedMotion()) return;
    maps.normalMap.offset.y += dt * 0.012;
    maps.normalMap.offset.x += dt * 0.008;
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[f.cx, f.y, f.cz]} receiveShadow>
      <planeGeometry args={[f.w, f.d]} />
      {quality === "low" ? (
        <meshStandardMaterial
          color={f.color}
          map={maps.map}
          roughnessMap={maps.roughnessMap}
          normalMap={maps.normalMap}
          normalScale={normalScale}
          roughness={calm ? 0.12 : 0.55}
          metalness={calm ? 0.55 : 0.18}
        />
      ) : (
        <MeshReflectorMaterial
          resolution={quality === "max" ? (calm ? 1024 : 1024) : 640}
          blur={blur}
          mixBlur={calm ? 0.12 : wet ? 0.35 : 0.85}
          mixStrength={calm ? Math.max(f.strength, 1.45) : f.strength}
          mirror={calm ? 0.98 : Math.min(0.96, f.mirror + (wet ? 0.08 : 0))}
          roughness={calm ? 0.06 : f.roughness}
          metalness={calm ? 0.78 : Math.max(f.metalness, wet ? 0.62 : 0.35)}
          color={f.color}
          map={maps.map}
          roughnessMap={maps.roughnessMap}
          normalMap={maps.normalMap}
          normalScale={normalScale}
          envMapIntensity={calm ? 1.35 : wet ? 1.15 : 0.7}
          distortion={calm ? 0.035 : f.distortion}
          depthScale={0}
          minDepthThreshold={0.2}
          maxDepthThreshold={1.3}
          reflectorOffset={0.03}
        />
      )}
    </mesh>
  );
}

const FLOW_VERT = `
  uniform float uTime;
  uniform vec2 uFlow;
  varying vec2 vUv;
  varying float vH;
  void main() {
    vUv = uv;
    vec3 p = position;
    float flow = uTime * 1.35;
    p.z += sin(p.x * 1.5 + flow * (1.1 + abs(uFlow.x)) + p.y * 0.35) * 0.05;
    p.z += sin(p.y * 2.1 - flow * (1.2 + abs(uFlow.y)) + uFlow.x) * 0.035;
    vH = p.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FLOW_FRAG = `
  uniform vec3 uColor;
  uniform float uTime;
  uniform vec2 uFlow;
  varying vec2 vUv;
  varying float vH;
  void main() {
    vec2 dir = normalize(uFlow + vec2(0.2, 0.08));
    float along = vUv.x * dir.y + vUv.y * dir.x;
    float streak = sin(along * 52.0 - uTime * 2.6);
    streak = smoothstep(0.45, 1.0, streak);
    float fine = sin((vUv.x * dir.x - vUv.y * dir.y) * 90.0 - uTime * 3.4);
    fine = smoothstep(0.72, 1.0, fine);
    float alpha = 0.28 + streak * 0.42 + fine * 0.3;
    vec3 col = mix(uColor, vec3(1.0), streak * 0.7 + fine * 0.4);
    gl_FragColor = vec4(col, alpha);
  }
`;

function WaterBody({ vol, quality }: { vol: WaterVol; quality: Quality }) {
  const w = vol.maxX - vol.minX;
  const d = vol.maxZ - vol.minZ;
  const cx = (vol.minX + vol.maxX) / 2;
  const cz = (vol.minZ + vol.maxZ) / 2;
  const bottom = vol.surface - vol.sink - 0.85;
  const midY = (bottom + vol.surface) / 2;
  const wallH = vol.surface - bottom;
  const maps = useRepeatedMaps("tile", Math.max(1, w / 0.7), Math.max(1, d / 0.7));
  const flowMat = useRef<THREE.ShaderMaterial>(null);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color(vol.color) },
      uFlow: { value: new THREE.Vector2(vol.flow[0], vol.flow[1]) },
    }),
    [vol],
  );
  useFrame((_, dt) => {
    if (flowMat.current) flowMat.current.uniforms.uTime.value += dt;
  });
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cx, bottom, cz]} receiveShadow>
        <planeGeometry args={[w, d]} />
        <meshStandardMaterial
          color="#c9d7c4"
          map={maps.map}
          roughnessMap={maps.roughnessMap}
          normalMap={maps.normalMap}
          roughness={0.42}
          metalness={0.06}
        />
      </mesh>
      <mesh position={[cx, midY, vol.minZ]}>
        <boxGeometry args={[w, wallH, 0.12]} />
        <meshStandardMaterial color="#d5e0cc" map={maps.map} roughness={0.4} metalness={0.06} />
      </mesh>
      <mesh position={[cx, midY, vol.maxZ]}>
        <boxGeometry args={[w, wallH, 0.12]} />
        <meshStandardMaterial color="#d5e0cc" map={maps.map} roughness={0.4} metalness={0.06} />
      </mesh>
      <mesh position={[vol.minX, midY, cz]}>
        <boxGeometry args={[0.12, wallH, d]} />
        <meshStandardMaterial color="#d5e0cc" map={maps.map} roughness={0.4} metalness={0.06} />
      </mesh>
      <mesh position={[vol.maxX, midY, cz]}>
        <boxGeometry args={[0.12, wallH, d]} />
        <meshStandardMaterial color="#d5e0cc" map={maps.map} roughness={0.4} metalness={0.06} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cx, vol.surface - 0.01, cz]}>
        <planeGeometry args={[w, d]} />
        {quality === "low" ? (
          <meshPhysicalMaterial
            color={vol.color}
            transmission={0.55}
            thickness={1.4}
            roughness={0.08}
            metalness={0.04}
            transparent
            opacity={0.78}
            ior={1.33}
          />
        ) : (
          <MeshReflectorMaterial
            resolution={quality === "max" ? 768 : 480}
            blur={quality === "max" ? [12, 6] : [28, 14]}
            mixBlur={0.22}
            mixStrength={1.35}
            mirror={0.86}
            roughness={0.08}
            metalness={0.55}
            color={vol.color}
            envMapIntensity={1.2}
            distortion={0.22}
            depthScale={0}
            minDepthThreshold={0.15}
            maxDepthThreshold={1.2}
            reflectorOffset={0.02}
          />
        )}
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[cx, vol.surface + 0.03, cz]}>
        <planeGeometry args={[w, d, 28, 28]} />
        <shaderMaterial
          ref={flowMat}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
          uniforms={uniforms}
          vertexShader={FLOW_VERT}
          fragmentShader={FLOW_FRAG}
        />
      </mesh>
    </group>
  );
}

function Waters({ level, quality }: { level: Level; quality: Quality }) {
  if (level.waters.length === 0) return null;
  return (
    <>
      {level.waters.map((vol, i) => (
        <WaterBody key={`${level.id}-${i}`} vol={vol} quality={quality} />
      ))}
    </>
  );
}

function MemoryOrb({ position, got }: { position: [number, number, number]; got: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const glow = useMemo(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const g = canvas.getContext("2d");
    if (!g) return null;
    const rad = g.createRadialGradient(128, 118, 8, 128, 128, 126);
    rad.addColorStop(0, "#ffffff");
    rad.addColorStop(0.35, "#f4fbff");
    rad.addColorStop(0.7, "#d5e7f2");
    rad.addColorStop(1, "#9eb4c4");
    g.fillStyle = rad;
    g.fillRect(0, 0, 256, 256);
    g.globalAlpha = 0.35;
    for (let i = 0; i < 18; i++) {
      g.strokeStyle = i % 2 ? "#ffffff" : "#e7f4ff";
      g.lineWidth = 1 + (i % 3);
      g.beginPath();
      g.arc(128, 128, 18 + i * 6, i * 0.4, i * 0.4 + 1.4);
      g.stroke();
    }
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.needsUpdate = true;
    return tex;
  }, []);
  useEffect(() => () => glow?.dispose(), [glow]);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * 1.4 + position[0]) * 0.12;
    ref.current.rotation.y = t * 0.45;
  });
  return (
    <group ref={ref} position={position}>
      <mesh>
        <icosahedronGeometry args={[got ? 0.16 : 0.22, 1]} />
        <meshPhysicalMaterial
          color="#f7fbff"
          map={glow}
          emissive="#ffffff"
          emissiveIntensity={got ? 0.35 : 1.7}
          roughness={0.12}
          metalness={0.04}
          transmission={0.62}
          thickness={0.45}
          transparent
          envMapIntensity={1.4}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[got ? 0.3 : 0.38, 20, 16]} />
        <meshBasicMaterial map={glow} color="#ffffff" transparent opacity={got ? 0.18 : 0.42} depthWrite={false} toneMapped={false} />
      </mesh>
      {got ? null : <pointLight color="#f4fbff" intensity={1.6} distance={3.4} decay={2} />}
    </group>
  );
}

function Memories({ level }: { level: Level }) {
  const collected = useGame((s) => s.collected);
  return (
    <>
      {level.memories.map((m) => (
        <MemoryOrb key={m.id} position={m.p} got={collected.includes(m.id)} />
      ))}
    </>
  );
}

function PortalMark({ level }: { level: Level }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current || reducedMotion()) return;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 1.2) * 0.04;
  });
  return (
    <group ref={ref} position={[level.portal.x, 0, level.portal.z]}>
      <mesh position={[-0.62, 1.15, 0]}>
        <boxGeometry args={[0.1, 2.3, 0.1]} />
        <meshStandardMaterial color="#ff7aa2" emissive="#ff7aa2" emissiveIntensity={1.1} />
      </mesh>
      <mesh position={[0.62, 1.15, 0]}>
        <boxGeometry args={[0.1, 2.3, 0.1]} />
        <meshStandardMaterial color="#ff7aa2" emissive="#ff7aa2" emissiveIntensity={1.1} />
      </mesh>
      <mesh position={[0, 2.32, 0]}>
        <boxGeometry args={[1.34, 0.1, 0.1]} />
        <meshStandardMaterial color="#f0c36a" emissive="#f0c36a" emissiveIntensity={0.7} />
      </mesh>
    </group>
  );
}

function Swing() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current || reducedMotion()) return;
    ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.65) * 0.32;
  });
  return (
    <group ref={ref} position={[0, 2.5, -6]}>
      <mesh position={[0, -0.85, 0]}>
        <boxGeometry args={[0.85, 0.06, 0.32]} />
        <meshStandardMaterial color="#f0c36a" roughness={0.45} />
      </mesh>
    </group>
  );
}

function Carousel() {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, dt) => {
    if (!ref.current || reducedMotion()) return;
    ref.current.rotation.y += dt * 0.35;
  });
  return (
    <group ref={ref} position={[0, 0.2, -6.2]}>
      <mesh>
        <cylinderGeometry args={[1.45, 1.45, 0.12, 20]} />
        <meshStandardMaterial color="#f0c36a" metalness={0.35} roughness={0.38} />
      </mesh>
      {[0, 1, 2, 3].map((i) => {
        const a = (i / 4) * Math.PI * 2;
        return (
          <mesh key={i} position={[Math.cos(a) * 1.05, 0.4, Math.sin(a) * 1.05]}>
            <boxGeometry args={[0.08, 0.7, 0.08]} />
            <meshStandardMaterial color="#e24b4b" />
          </mesh>
        );
      })}
    </group>
  );
}

function Dust({ color }: { color: string }) {
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(64 * 3);
    for (let i = 0; i < 64; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = Math.random() * 3.2 + 0.15;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  const ref = useRef<THREE.Points>(null);
  const cam = useThree((s) => s.camera);
  useFrame((_, dt) => {
    if (!ref.current) return;
    ref.current.rotation.y += dt * 0.02;
    ref.current.position.set(cam.position.x, 0, cam.position.z);
  });
  return (
    <points ref={ref} geometry={geo} frustumCulled={false}>
      <pointsMaterial color={color} size={0.05} transparent opacity={0.38} depthWrite={false} />
    </points>
  );
}

function FootShadow({ on }: { on: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.position.set(sim.x, sim.y + 0.28, sim.z);
    ref.current.visible = on && sim.playing;
  });
  return (
    <mesh ref={ref} castShadow>
      <sphereGeometry args={[0.22, 10, 8]} />
      <meshBasicMaterial colorWrite={false} depthWrite={false} />
    </mesh>
  );
}

function RoomTwelve() {
  const screen = useRef<THREE.MeshStandardMaterial>(null);
  const hand = useRef<THREE.Group>(null);
  const drop = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (screen.current) {
      const dead = Math.random() > 0.93;
      screen.current.emissiveIntensity = dead ? 0.12 : 1.15 + Math.sin(t * 19) * 0.35;
    }
    if (hand.current) {
      const twitch = !reducedMotion() && Math.floor(t * 0.4) % 6 === 0 ? Math.sin(t * 9) * 0.55 : 0;
      hand.current.rotation.z = -0.55 + twitch;
    }
    if (drop.current) {
      if (reducedMotion()) {
        drop.current.position.y = 0.62;
        return;
      }
      const cyc = (t % 2.6) / 2.6;
      drop.current.position.y = 2.35 - cyc * 1.7;
      const splash = cyc > 0.94;
      drop.current.scale.set(splash ? 1.8 : 0.45, splash ? 0.2 : 0.7, splash ? 1.8 : 0.45);
    }
  });
  return (
    <group>
      <mesh position={[2.55, 1.06, 2.34]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.92, 0.5]} />
        <meshStandardMaterial
          ref={screen}
          color="#d7f1ff"
          emissive="#9ad7ff"
          emissiveIntensity={1.3}
          toneMapped={false}
        />
      </mesh>
      <group position={[-1.7, 2.05, -4.96]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.36, 0.36, 0.05, 24]} />
          <meshStandardMaterial color="#f6ebe6" roughness={0.4} metalness={0.15} />
        </mesh>
        <mesh position={[0.12, 0.02, 0.04]} rotation={[0, 0, -1.15]}>
          <boxGeometry args={[0.025, 0.2, 0.02]} />
          <meshStandardMaterial color="#2a2328" />
        </mesh>
        <group ref={hand}>
          <mesh position={[0, 0.12, 0.05]}>
            <boxGeometry args={[0.012, 0.24, 0.012]} />
            <meshStandardMaterial color="#e24b4b" emissive="#e24b4b" emissiveIntensity={0.4} />
          </mesh>
        </group>
      </group>
      <mesh ref={drop} position={[3.2, 2.2, -3.5]}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshStandardMaterial color="#d7e7f2" roughness={0.05} metalness={0.2} />
      </mesh>
    </group>
  );
}

export function World() {
  const levelId = useGame((s) => s.levelId);
  const quality = useGame((s) => s.quality);
  const level = getLevel(levelId);
  const shadows = quality !== "low";
  const sunSize = quality === "max" ? 2048 : 1024;
  return (
    <>
      <color attach="background" args={[level.fog.color]} />
      <fog attach="fog" args={[level.fog.color, level.fog.near, level.fog.far]} />
      <Sky level={level} />
      <Exposure value={level.exposure} />
      <Rig />
      <Look />
      <ambientLight intensity={level.ambient} />
      <hemisphereLight args={[level.hemi[0], level.hemi[1], level.hemi[2]]} />
      <directionalLight
        position={level.sun.position}
        intensity={level.sun.intensity}
        color={level.sun.color}
        castShadow={shadows}
        shadow-mapSize-width={sunSize}
        shadow-mapSize-height={sunSize}
        shadow-camera-near={1}
        shadow-camera-far={70}
        shadow-camera-left={-28}
        shadow-camera-right={28}
        shadow-camera-top={28}
        shadow-camera-bottom={-28}
        shadow-bias={-0.00035}
        shadow-normalBias={0.04}
      />
      {level.lights.map((light, i) => (
        <pointLight
          key={i}
          position={light.p}
          color={light.color}
          intensity={light.intensity}
          distance={light.dist}
          decay={2}
        />
      ))}
      <Environment
        key={`${level.id}-${quality}`}
        frames={1}
        resolution={quality === "max" ? 512 : 256}
        environmentIntensity={quality === "low" ? 0.55 : 1.05}
      >
        <Lightformer form="rect" intensity={5.5} color={level.sky.horizon} position={[8, 6, -6]} scale={[14, 6, 1]} />
        <Lightformer form="rect" intensity={3.2} color={level.sun.color} position={[-8, 4, 6]} scale={[8, 5, 1]} />
        <Lightformer form="rect" intensity={4.2} color="#ff7aa2" position={[0, 2.2, -9]} scale={[12, 2.4, 1]} />
        <Lightformer form="rect" intensity={2.4} color="#f0c36a" position={[9, 3, 1]} scale={[3, 7, 1]} />
        <Lightformer form="rect" intensity={1.8} color="#9ad7ff" position={[-7, 2.4, 3]} scale={[3, 4, 1]} />
        <Lightformer form="circle" intensity={2.2} color={level.sky.zenith} position={[0, 10, 0]} scale={[5, 5, 1]} />
      </Environment>
      <Floor level={level} quality={quality} />
      <Waters level={level} quality={quality} />
      {level.props.map((p, i) => (
        <PropView key={`${level.id}-${i}`} p={p} shadows={shadows} />
      ))}
      <Memories level={level} />
      <PortalMark level={level} />
      {level.id === "utca" && <Swing />}
      {level.id === "jatszo" && <Carousel />}
      {level.id === "szoba" && <RoomTwelve />}
      <Dust color={level.sky.horizon} />
      <FootShadow on={shadows} />
      {quality !== "low" && (
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            luminanceThreshold={0.78}
            mipmapBlur
            intensity={quality === "max" ? 0.48 : 0.28}
            luminanceSmoothing={0.25}
          />
          <ChromaticAberration
            offset={quality === "max" ? CHROMA : CHROMA_SOFT}
            radialModulation={false}
            modulationOffset={0}
          />
          <Noise opacity={quality === "max" ? 0.045 : 0.035} />
          <Vignette eskil={false} offset={0.18} darkness={0.55} />
        </EffectComposer>
      )}
    </>
  );
}
