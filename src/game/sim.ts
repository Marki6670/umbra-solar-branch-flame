import type { AABB, Memory } from "@/game/levels";

const PLAYER_H = 1.62;
const RADIUS = 0.32;
const STEP = 0.46;

export type ControlsProbe = {
  getYaw: () => number;
  getSpeed: () => number;
  getPos: () => { x: number; y: number; z: number };
  setKeys: (codes: string[]) => void;
  reset: () => void;
};

declare global {
  interface Window {
    __controlsTest?: ControlsProbe;
    __dreamGoto?: (id: string) => void;
  }
}

export const sim = {
  x: 0,
  y: 0.05,
  z: 7.2,
  vx: 0,
  vy: 0,
  vz: 0,
  yaw: 0,
  pitch: 0,
  speed: 0,
  grounded: false,
  playing: false,
  transitioning: false,
  keys: new Set<string>(),
  joyX: 0,
  joyY: 0,
  sprintToggle: false,
  interactHeld: false,
  jumpHeld: false,
  prevE: false,
  prevJ: false,
  useLock: 0,
  portalLock: 2,
  sens: 0.00215,
  invertY: false,
  invertX: false,
  boxes: [] as AABB[],
  memories: [] as Memory[],
  nearId: null as string | null,
  portalX: 0,
  portalZ: -9,
  portalTo: "utca",
  portalLabel: "",
  levelId: "medence",
  playSeconds: 0,
  stepCool: 0,
  bob: 0,
  onUse: undefined as (() => void) | undefined,
  onPortal: undefined as ((to: string) => void) | undefined,
  onPrompt: undefined as ((text: string) => void) | undefined,
  onStep: undefined as (() => void) | undefined,
};

let acc = 0;
let lastPrompt = "";

function reducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function overlap(b: AABB) {
  const minX = sim.x - RADIUS;
  const maxX = sim.x + RADIUS;
  const minY = sim.y;
  const maxY = sim.y + PLAYER_H;
  const minZ = sim.z - RADIUS;
  const maxZ = sim.z + RADIUS;
  const ox = Math.min(maxX, b.maxX) - Math.max(minX, b.minX);
  const oy = Math.min(maxY, b.maxY) - Math.max(minY, b.minY);
  const oz = Math.min(maxZ, b.maxZ) - Math.max(minZ, b.minZ);
  if (ox > 0 && oy > 0 && oz > 0) return { ox, oy, oz };
  return null;
}

function collide(axis: "x" | "y" | "z") {
  for (let iter = 0; iter < 4; iter++) {
    let hit = false;
    for (const b of sim.boxes) {
      const o = overlap(b);
      if (!o) continue;
      if (axis === "y") {
        const mid = (b.minY + b.maxY) / 2;
        if (sim.y + PLAYER_H * 0.5 < mid) {
          sim.y -= o.oy;
          if (sim.vy > 0) sim.vy = 0;
        } else {
          sim.y += o.oy;
          if (sim.vy < 0) sim.vy = 0;
          sim.grounded = true;
        }
        hit = true;
      } else if (axis === "x") {
        const rise = b.maxY - sim.y;
        if (b.maxY - b.minY <= 0.55 && rise > 0.001 && rise <= STEP) {
          sim.y = b.maxY;
          sim.grounded = true;
          if (sim.vy < 0) sim.vy = 0;
          continue;
        }
        const mid = (b.minX + b.maxX) / 2;
        sim.x += sim.x < mid ? -o.ox : o.ox;
        sim.vx = 0;
        hit = true;
      } else {
        const rise = b.maxY - sim.y;
        if (b.maxY - b.minY <= 0.55 && rise > 0.001 && rise <= STEP) {
          sim.y = b.maxY;
          sim.grounded = true;
          if (sim.vy < 0) sim.vy = 0;
          continue;
        }
        const mid = (b.minZ + b.maxZ) / 2;
        sim.z += sim.z < mid ? -o.oz : o.oz;
        sim.vz = 0;
        hit = true;
      }
    }
    if (!hit) break;
  }
}

export function resolveAll() {
  for (let i = 0; i < 8; i++) {
    collide("y");
    collide("x");
    collide("z");
  }
}

function tick(dt: number) {
  let f = 0;
  let r = 0;
  if (sim.keys.has("KeyW") || sim.keys.has("ArrowUp")) f += 1;
  if (sim.keys.has("KeyS") || sim.keys.has("ArrowDown")) f -= 1;
  if (sim.keys.has("KeyD") || sim.keys.has("ArrowRight")) r += 1;
  if (sim.keys.has("KeyA") || sim.keys.has("ArrowLeft")) r -= 1;
  f += sim.joyY;
  r += sim.joyX;
  const len = Math.hypot(f, r);
  if (len > 1) {
    f /= len;
    r /= len;
  }
  const sprint =
    sim.keys.has("ShiftLeft") || sim.keys.has("ShiftRight") || sim.sprintToggle;
  const max = sprint ? 6.15 : 3.35;
  const fx = -Math.sin(sim.yaw);
  const fz = -Math.cos(sim.yaw);
  const rx = Math.cos(sim.yaw);
  const rz = -Math.sin(sim.yaw);
  const tx = (fx * f + rx * r) * max;
  const tz = (fz * f + rz * r) * max;
  const k = 1 - Math.exp(-14 * dt);
  sim.vx += (tx - sim.vx) * k;
  sim.vz += (tz - sim.vz) * k;

  sim.vy += -22 * dt;
  if (sim.vy < -18) sim.vy = -18;
  const jump = sim.keys.has("Space") || sim.jumpHeld;
  if (jump && !sim.prevJ && sim.grounded) sim.vy = 5.15;
  sim.prevJ = jump;

  sim.grounded = false;
  sim.y += sim.vy * dt;
  collide("y");
  sim.x += sim.vx * dt;
  collide("x");
  sim.z += sim.vz * dt;
  collide("z");
  sim.speed = Math.hypot(sim.vx, sim.vz);

  const moving = sim.grounded && sim.speed > 0.4 && !reducedMotion();
  sim.bob += moving ? sim.speed * dt * 2.1 : dt * 0.6;

  sim.playSeconds += dt;
  sim.portalLock = Math.max(0, sim.portalLock - dt);
  sim.useLock = Math.max(0, sim.useLock - dt);

  sim.stepCool -= dt;
  if (sim.grounded && sim.speed > 1.25 && sim.stepCool <= 0) {
    sim.stepCool = sim.speed > 5 ? 0.32 : 0.46;
    sim.onStep?.();
  }

  let near: string | null = null;
  let best = 1.85 * 1.85;
  for (const m of sim.memories) {
    const dx = sim.x - m.p[0];
    const dz = sim.z - m.p[2];
    const d = dx * dx + dz * dz;
    if (d < best) {
      best = d;
      near = m.id;
    }
  }
  sim.nearId = near;
  const pdx = sim.x - sim.portalX;
  const pdz = sim.z - sim.portalZ;
  const nearPortal = pdx * pdx + pdz * pdz < 2.5 * 2.5;
  const prompt = near ? "E  ·  emlék" : nearPortal ? `Belépés  ·  ${sim.portalLabel}` : "";
  if (prompt !== lastPrompt) {
    lastPrompt = prompt;
    sim.onPrompt?.(prompt);
  }

  const useDown = sim.keys.has("KeyE") || sim.interactHeld;
  if (useDown && !sim.prevE && sim.useLock <= 0 && near) sim.onUse?.();
  sim.prevE = useDown;

  if (!sim.transitioning && sim.portalLock <= 0 && pdx * pdx + pdz * pdz < 1.2 * 1.2) {
    sim.onPortal?.(sim.portalTo);
  }
}

export function frame(dt: number) {
  if (!sim.playing) {
    sim.speed = 0;
    acc = 0;
    return;
  }
  acc += Math.min(dt, 0.1);
  const h = 1 / 60;
  let n = 0;
  while (acc >= h && n < 6) {
    tick(h);
    acc -= h;
    n += 1;
  }
}

export function syncSettings(s: { sensitivity: number; invertY: boolean; invertX?: boolean }) {
  sim.sens = 0.00215 * s.sensitivity;
  sim.invertY = s.invertY;
  sim.invertX = Boolean(s.invertX);
}

export function installProbe() {
  if (typeof window === "undefined") return;
  window.__controlsTest = {
    getYaw: () => sim.yaw,
    getSpeed: () => sim.speed,
    getPos: () => ({ x: sim.x, y: sim.y, z: sim.z }),
    setKeys: (codes: string[]) => {
      sim.keys = new Set(codes);
    },
    reset: () => {
      sim.x = 0;
      sim.y = 0.05;
      sim.z = 0;
      sim.yaw = 0;
      sim.pitch = 0;
      sim.vx = 0;
      sim.vy = 0;
      sim.vz = 0;
      sim.playing = true;
      sim.transitioning = false;
    },
  };
}
