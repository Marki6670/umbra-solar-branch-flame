import * as THREE from "three";

export type SurfaceKind =
  | "plaster"
  | "tile"
  | "wood"
  | "carpet"
  | "asphalt"
  | "metal"
  | "paint"
  | "grass"
  | "water"
  | "glow";

export type SurfaceSet = {
  map: THREE.CanvasTexture;
  roughnessMap: THREE.CanvasTexture;
  normalMap: THREE.CanvasTexture;
};

const SIZE = 512;

function hash(ix: number, iy: number) {
  let n = Math.imul(ix, 374761393) + Math.imul(iy, 668265263);
  n = Math.imul(n ^ (n >>> 13), 1274126177);
  return ((n ^ (n >>> 16)) >>> 0) / 4294967295;
}

function vnoise(x: number, y: number) {
  const x0 = Math.floor(x);
  const y0 = Math.floor(y);
  const fx = x - x0;
  const fy = y - y0;
  const ux = fx * fx * (3 - 2 * fx);
  const uy = fy * fy * (3 - 2 * fy);
  const a = hash(x0, y0);
  const b = hash(x0 + 1, y0);
  const c = hash(x0, y0 + 1);
  const d = hash(x0 + 1, y0 + 1);
  return a + (b - a) * ux + (c - a) * uy + (a - b - c + d) * ux * uy;
}

function fbm(x: number, y: number) {
  let v = 0;
  let a = 0.55;
  let f = 1;
  for (let i = 0; i < 4; i++) {
    v += a * vnoise(x * f, y * f);
    f *= 2.05;
    a *= 0.5;
  }
  return v;
}

function canvasTex(draw: (img: ImageData, size: number) => void, colorSpace: THREE.ColorSpace) {
  const canvas = document.createElement("canvas");
  canvas.width = SIZE;
  canvas.height = SIZE;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas");
  const img = ctx.createImageData(SIZE, SIZE);
  draw(img, SIZE);
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = colorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.anisotropy = 8;
  tex.needsUpdate = true;
  return tex;
}

function build(kind: SurfaceKind): SurfaceSet {
  const height = new Float32Array(SIZE * SIZE);
  const albedo = canvasTex((img, size) => {
    const d = img.data;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = y * size + x;
        const u = x / size;
        const v = y / size;
        let shade = 0.92;
        let rough = 0.85;
        let h = 0.5;
        if (kind === "tile") {
          const ts = 128;
          const gx = x % ts;
          const gy = y % ts;
          const grout = gx < 7 || gy < 7 || gx > ts - 6 || gy > ts - 6;
          const tileN = hash(Math.floor(x / ts), Math.floor(y / ts));
          const edge = Math.min(gx, gy, ts - gx, ts - gy) / 10;
          shade = grout ? 0.28 : 0.72 + tileN * 0.26 + Math.min(edge, 1) * 0.12;
          shade *= 0.9 + fbm(u * 8, v * 8) * 0.16;
          shade += (hash(x >> 1, y >> 1) - 0.5) * 0.08;
          rough = grout ? 1 : 0.28 + tileN * 0.08;
          h = grout ? 0.15 : 0.72 + Math.min(edge, 1) * 0.2;
        } else if (kind === "wood") {
          const plank = 72;
          const py = y % plank;
          const seam = py < 3 || py > plank - 3;
          const grain = 0.5 + 0.5 * Math.sin((x * 0.35 + fbm(u * 2, v * 8) * 18) * 0.7);
          const knot = vnoise(u * 3 + Math.floor(y / plank), v * 2);
          shade = seam ? 0.35 : 0.62 + grain * 0.28 + (knot > 0.82 ? -0.18 : 0);
          rough = seam ? 0.95 : 0.55;
          h = seam ? 0.2 : 0.55 + grain * 0.25;
        } else if (kind === "carpet") {
          const n = fbm(u * 28, v * 22);
          const fiber = 0.5 + 0.5 * Math.sin(x * 1.7 + n * 6);
          shade = 0.62 + n * 0.28 + fiber * 0.08;
          rough = 0.92;
          h = n;
        } else if (kind === "asphalt") {
          const n = fbm(u * 18, v * 18);
          const crack = Math.abs(Math.sin(u * 9 + fbm(u * 3, v * 3) * 4)) < 0.04 ? 0.25 : 1;
          shade = (0.45 + n * 0.4) * crack;
          rough = crack < 1 ? 0.55 : 0.9;
          h = n * crack;
        } else if (kind === "metal") {
          const brush = 0.5 + 0.5 * Math.sin(y * 0.9 + fbm(u * 4, v * 20) * 5);
          const scratch = Math.abs(Math.sin(u * 40 + v * 2)) > 0.985 ? 0.7 : 1;
          shade = (0.72 + brush * 0.22) * scratch;
          rough = scratch < 1 ? 0.75 : 0.35 + (1 - brush) * 0.15;
          h = brush * 0.35 * scratch;
        } else if (kind === "grass") {
          const n = fbm(u * 16, v * 10);
          const blade = 0.5 + 0.5 * Math.sin(x * 2.2 + n * 8);
          shade = 0.55 + n * 0.3 + blade * 0.12;
          rough = 0.88;
          h = blade * 0.7 + n * 0.3;
        } else if (kind === "water") {
          const n = fbm(u * 7, v * 5);
          const rip = 0.5 + 0.5 * Math.sin(u * 22 + n * 9) * Math.sin(v * 18 + n * 6);
          const caustic = Math.pow(Math.abs(Math.sin(u * 30 + n * 12) * Math.sin(v * 26 + n * 8)), 5);
          shade = 0.55 + n * 0.3 + rip * 0.12 + caustic * 0.4;
          rough = 0.16 + (1 - caustic) * 0.12;
          h = n * 0.7 + rip * 0.4 + caustic * 0.25;
        } else if (kind === "glow") {
          shade = 0.9 + fbm(u * 4, v * 4) * 0.08;
          rough = 0.4;
          h = 0.5;
        } else if (kind === "plaster") {
          const n = fbm(u * 9, v * 9);
          const pit = hash(x >> 2, y >> 2);
          const stain = vnoise(u * 2.2, v * 2.2) > 0.78 ? 0.78 : 1;
          shade = (0.7 + n * 0.26 + (pit - 0.5) * 0.08) * stain;
          rough = 0.9;
          h = n * 0.55;
        } else {
          const n = fbm(u * 10, v * 10);
          shade = 0.8 + n * 0.16;
          rough = 0.62;
          h = n * 0.4;
        }
        height[i] = h;
        const o = i * 4;
        const g = Math.max(0, Math.min(255, shade * 255));
        d[o] = g;
        d[o + 1] = g;
        d[o + 2] = g;
        d[o + 3] = 255;
      }
    }
  }, THREE.SRGBColorSpace);

  const roughnessMap = canvasTex((img, size) => {
    const d = img.data;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const i = y * size + x;
        const u = x / size;
        const v = y / size;
        let rough = 0.85;
        if (kind === "tile") {
          const ts = 128;
          const gx = x % ts;
          const gy = y % ts;
          const grout = gx < 7 || gy < 7 || gx > ts - 6 || gy > ts - 6;
          rough = grout ? 1 : 0.32;
        } else if (kind === "wood") {
          rough = y % 72 < 3 ? 0.95 : 0.62;
        } else if (kind === "metal") {
          rough = 0.42;
        } else if (kind === "water") {
          rough = 0.2 + fbm(u * 5, v * 4) * 0.15;
        } else if (kind === "glow") {
          rough = 0.35;
        } else if (kind === "carpet" || kind === "grass" || kind === "plaster" || kind === "asphalt") {
          rough = 0.95;
        } else {
          rough = 0.7;
        }
        const g = Math.max(0, Math.min(255, rough * 255));
        const o = i * 4;
        d[o] = g;
        d[o + 1] = g;
        d[o + 2] = g;
        d[o + 3] = 255;
      }
    }
  }, THREE.NoColorSpace);

  const normalMap = canvasTex((img, size) => {
    const d = img.data;
    const strength =
      kind === "tile" ? 2.4 : kind === "asphalt" || kind === "grass" ? 2.1 : kind === "water" ? 1.6 : kind === "metal" || kind === "glow" ? 0.7 : 1.3;
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const hl = height[y * size + ((x - 1 + size) % size)];
        const hr = height[y * size + ((x + 1) % size)];
        const hd = height[((y + 1) % size) * size + x];
        const hu = height[((y - 1 + size) % size) * size + x];
        const nx = (hl - hr) * strength;
        const ny = (hd - hu) * strength;
        const nz = 1;
        const len = Math.hypot(nx, ny, nz) || 1;
        const o = (y * size + x) * 4;
        d[o] = (nx / len * 0.5 + 0.5) * 255;
        d[o + 1] = (ny / len * 0.5 + 0.5) * 255;
        d[o + 2] = (nz / len * 0.5 + 0.5) * 255;
        d[o + 3] = 255;
      }
    }
  }, THREE.NoColorSpace);

  return { map: albedo, roughnessMap, normalMap };
}

const cache = new Map<SurfaceKind, SurfaceSet>();

export function surfaceTextures(kind: SurfaceKind): SurfaceSet {
  let set = cache.get(kind);
  if (!set) {
    set = build(kind);
    cache.set(kind, set);
  }
  return set;
}

export function classifySurface(p: {
  c: string;
  m?: number;
  rg?: number;
  trans?: number;
  t: string;
  ei?: number;
}): SurfaceKind {
  if ((p.ei ?? 0) > 0.85 && (p.m ?? 0) < 0.4) return "glow";
  if ((p.trans ?? 0) > 0.45) return "water";
  if ((p.m ?? 0) >= 0.4 && (p.rg ?? 1) < 0.55) return "metal";
  const col = new THREE.Color(p.c);
  const hsl = { h: 0, s: 0, l: 0 };
  col.getHSL(hsl);
  if (hsl.l < 0.2 && hsl.s < 0.35) return "asphalt";
  if (hsl.h > 0.22 && hsl.h < 0.46 && hsl.s > 0.18 && hsl.l > 0.18 && hsl.l < 0.62) return "wood";
  if (hsl.h > 0.22 && hsl.h < 0.48 && hsl.s > 0.12 && (p.t === "sphere" || (p.rg ?? 0) > 0.82)) return "grass";
  if ((p.rg ?? 1) < 0.22) return "tile";
  if ((p.rg ?? 0) > 0.72 && hsl.l > 0.72) return "plaster";
  if (hsl.s > 0.25 && hsl.l < 0.58 && (p.rg ?? 0) > 0.48) return "carpet";
  return "paint";
}

export function floorSurface(levelId: string): SurfaceKind {
  if (levelId === "medence" || levelId === "folyoso") return "tile";
  if (levelId === "poolrooms") return "water";
  if (levelId === "jatszo") return "grass";
  if (levelId === "szoba") return "carpet";
  return "asphalt";
}

export function repeatScale(kind: SurfaceKind) {
  if (kind === "tile") return 0.7;
  if (kind === "wood") return 0.5;
  if (kind === "asphalt") return 2.4;
  if (kind === "carpet") return 0.85;
  if (kind === "grass") return 1.15;
  if (kind === "metal") return 0.4;
  if (kind === "water") return 1.5;
  return 1.05;
}

export function normalScaleFor(kind: SurfaceKind) {
  if (kind === "tile") return 0.9;
  if (kind === "asphalt" || kind === "grass") return 1.05;
  if (kind === "water") return 0.45;
  if (kind === "metal" || kind === "glow") return 0.22;
  if (kind === "carpet") return 0.7;
  if (kind === "wood") return 0.55;
  if (kind === "plaster") return 0.38;
  return 0.28;
}

export function envIntensityFor(kind: SurfaceKind) {
  if (kind === "metal") return 1.8;
  if (kind === "water") return 1.25;
  if (kind === "tile") return 0.9;
  if (kind === "asphalt") return 0.65;
  return 0.42;
}
