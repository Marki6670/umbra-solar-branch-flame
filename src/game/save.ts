import { getLevel, LEVEL_IDS, type Level } from "@/game/levels";
import { sim } from "@/game/sim";
import { useGame, type Quality } from "@/game/store";

export const SAVE_VERSION = 1;

export type SaveSettings = {
  sensitivity: number;
  volume: number;
  invertY: boolean;
  invertX: boolean;
  quality: Quality;
  explicitQuality: boolean;
};

export type SaveData = {
  version: number;
  updatedAt: number;
  levelId: string;
  x: number;
  y: number;
  z: number;
  yaw: number;
  pitch: number;
  collected: string[];
  visited: string[];
  playSeconds: number;
  settings: SaveSettings;
};

const AUTO = "rozsaszin-ora:auto";
const SLOT = (n: number) => `rozsaszin-ora:slot:${n}`;
const SETTINGS = "rozsaszin-ora:settings";

function storage(): Storage | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const k = "__ora";
    localStorage.setItem(k, "1");
    localStorage.removeItem(k);
    return localStorage;
  } catch {
    return null;
  }
}

function num(v: unknown, fallback = 0) {
  return typeof v === "number" && Number.isFinite(v) ? v : fallback;
}

function defaultSettings(): SaveSettings {
  return {
    sensitivity: 1,
    volume: 0.65,
    invertY: false,
    invertX: false,
    quality: "max",
    explicitQuality: false,
  };
}

function asQuality(v: unknown): Quality {
  return v === "low" || v === "high" || v === "max" ? v : "max";
}

export function normalizeSave(raw: unknown): SaveData | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Partial<SaveData>;
  if (typeof o.levelId !== "string" || !LEVEL_IDS.includes(o.levelId)) return null;
  const settingsIn = (o.settings ?? {}) as Partial<SaveSettings>;
  const settings: SaveSettings = {
    ...defaultSettings(),
    ...settingsIn,
    quality: asQuality(settingsIn.quality),
    sensitivity: Math.min(2.4, Math.max(0.35, num(settingsIn.sensitivity, 1))),
    volume: Math.min(1, Math.max(0, num(settingsIn.volume, 0.65))),
    invertY: Boolean(settingsIn.invertY),
    invertX: Boolean(settingsIn.invertX),
    explicitQuality: Boolean(settingsIn.explicitQuality),
  };
  const collected = Array.isArray(o.collected) ? o.collected.filter((id) => typeof id === "string") : [];
  const visited = Array.isArray(o.visited) ? o.visited.filter((id) => typeof id === "string") : [o.levelId];
  return {
    version: SAVE_VERSION,
    updatedAt: num(o.updatedAt, Date.now()),
    levelId: o.levelId,
    x: num(o.x),
    y: num(o.y, 0.05),
    z: num(o.z),
    yaw: num(o.yaw),
    pitch: Math.min(1.15, Math.max(-1.15, num(o.pitch))),
    collected,
    visited,
    playSeconds: Math.max(0, num(o.playSeconds)),
    settings,
  };
}

function readKey(key: string): SaveData | null {
  const ls = storage();
  if (!ls) return null;
  for (const name of [key, `${key}:bak`]) {
    const raw = ls.getItem(name);
    if (!raw) continue;
    try {
      const parsed = normalizeSave(JSON.parse(raw));
      if (parsed) return parsed;
    } catch {
      /* try backup */
    }
  }
  return null;
}

function writeKey(key: string, data: SaveData): boolean {
  const ls = storage();
  if (!ls) return false;
  try {
    const prev = ls.getItem(key);
    if (prev) ls.setItem(`${key}:bak`, prev);
    ls.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function capture(): SaveData {
  const s = useGame.getState();
  return {
    version: SAVE_VERSION,
    updatedAt: Date.now(),
    levelId: s.levelId,
    x: sim.x,
    y: sim.y,
    z: sim.z,
    yaw: sim.yaw,
    pitch: sim.pitch,
    collected: s.collected,
    visited: s.visited,
    playSeconds: sim.playSeconds,
    settings: {
      sensitivity: s.sensitivity,
      volume: s.volume,
      invertY: s.invertY,
      invertX: s.invertX,
      quality: s.quality,
      explicitQuality: true,
    },
  };
}

export function saveAuto(): boolean {
  if (useGame.getState().mode === "title" && sim.playSeconds < 0.2) return false;
  return writeKey(AUTO, capture());
}

export function saveSlot(n: number): boolean {
  const data = capture();
  const ok = writeKey(SLOT(n), data);
  writeKey(AUTO, data);
  return ok;
}

export function loadAuto(): SaveData | null {
  return readKey(AUTO);
}

export function loadSlot(n: number): SaveData | null {
  return readKey(SLOT(n));
}

export function deleteSlot(n: number) {
  const ls = storage();
  if (!ls) return;
  ls.removeItem(SLOT(n));
  ls.removeItem(`${SLOT(n)}:bak`);
}

export function newestSave(): SaveData | null {
  const all = [loadAuto(), loadSlot(1), loadSlot(2), loadSlot(3)].filter((s): s is SaveData => !!s);
  all.sort((a, b) => b.updatedAt - a.updatedAt);
  return all[0] ?? null;
}

export function hasAnySave() {
  return newestSave() !== null;
}

export function loadSettings(): SaveSettings | null {
  const ls = storage();
  if (!ls) return null;
  try {
    const raw = ls.getItem(SETTINGS);
    if (!raw) return null;
    const o = JSON.parse(raw) as Partial<SaveSettings>;
    return {
      ...defaultSettings(),
      ...o,
      quality: asQuality(o.quality),
      explicitQuality: Boolean(o.explicitQuality),
    };
  } catch {
    return null;
  }
}

export function saveSettings(partial: Partial<SaveSettings>) {
  const prev = loadSettings() ?? defaultSettings();
  const next = { ...prev, ...partial };
  const ls = storage();
  if (!ls) return;
  try {
    ls.setItem(SETTINGS, JSON.stringify(next));
  } catch {
    /* ignore quota */
  }
}

export function exportSave() {
  const blob = new Blob([JSON.stringify(capture(), null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "rozsaszin-ora-mentes.json";
  a.click();
  URL.revokeObjectURL(url);
}

export function parseImport(text: string): SaveData | null {
  try {
    return normalizeSave(JSON.parse(text));
  } catch {
    return null;
  }
}

export function levelName(id: string) {
  return getLevel(id).name;
}

export function formatWhen(ms: number) {
  try {
    return new Date(ms).toLocaleString("hu-HU", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

export function formatPlay(sec: number) {
  const m = Math.floor(sec / 60);
  if (m < 1) return "1 percnél kevesebb";
  return `${m} perc`;
}

export function memoryCount(data: { collected: string[] }, level?: Level) {
  if (!level) return data.collected.length;
  return data.collected.filter((id) => id.startsWith(level.id)).length;
}
