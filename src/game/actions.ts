import { audio } from "@/game/audio";
import { getLevel } from "@/game/levels";
import {
  exportSave,
  loadSlot,
  newestSave,
  parseImport,
  saveAuto,
  saveSettings,
  saveSlot,
  type SaveData,
} from "@/game/save";
import { resolveAll, sim, syncSettings } from "@/game/sim";
import { useGame } from "@/game/store";

function lookLock() {
  try {
    document.querySelector("canvas")?.requestPointerLock?.();
  } catch {
    /* pointer lock is optional */
  }
}

export function applyLevel(
  id: string,
  pose?: { x: number; y: number; z: number; yaw: number; pitch: number },
) {
  const level = getLevel(id);
  sim.boxes = level.boxes;
  sim.memories = level.memories;
  sim.waters = level.waters;
  sim.wet = 0;
  sim.splash = 0;
  sim.portalX = level.portal.x;
  sim.portalZ = level.portal.z;
  sim.portalTo = level.portal.to;
  sim.portalLabel = level.portal.label;
  sim.levelId = level.id;
  sim.x = pose?.x ?? level.spawn.x;
  sim.y = pose?.y ?? level.spawn.y;
  sim.z = pose?.z ?? level.spawn.z;
  sim.yaw = pose?.yaw ?? level.spawn.yaw;
  sim.pitch = pose?.pitch ?? 0;
  if (!Number.isFinite(sim.x) || Math.abs(sim.x) > 90 || Math.abs(sim.z) > 90) {
    sim.x = level.spawn.x;
    sim.y = level.spawn.y;
    sim.z = level.spawn.z;
    sim.yaw = level.spawn.yaw;
  }
  sim.vx = 0;
  sim.vy = 0;
  sim.vz = 0;
  sim.portalLock = 1.7;
  sim.nearId = null;
  sim.grounded = false;
  resolveAll();
}

function pushVisited(id: string) {
  const visited = useGame.getState().visited;
  return visited.includes(id) ? visited : [...visited, id];
}

export function travelTo(id: string) {
  if (sim.transitioning) return;
  if (!getLevel(id)) return;
  sim.transitioning = true;
  sim.playing = false;
  sim.vx = 0;
  sim.vz = 0;
  useGame.getState().patch({ fading: true, mode: "play", prompt: "" });
  window.setTimeout(() => {
    applyLevel(id);
    const level = getLevel(id);
    useGame.getState().patch({
      fading: false,
      mode: "play",
      levelId: id,
      banner: level.name,
      visited: pushVisited(id),
      prompt: "",
      note: null,
    });
    sim.playing = true;
    sim.transitioning = false;
    audio.ensure();
    audio.setMood(id);
    saveAuto();
  }, 420);
}

export function beginFresh() {
  audio.ensure();
  audio.setVolume(useGame.getState().volume);
  sim.playSeconds = 0;
  sim.transitioning = true;
  sim.playing = false;
  useGame.getState().patch({ fading: true });
  window.setTimeout(() => {
    applyLevel("medence");
    useGame.getState().patch({
      mode: "play",
      levelId: "medence",
      collected: [],
      visited: ["medence"],
      note: null,
      fading: false,
      banner: "Medence, 3:17",
      prompt: "",
      playSeconds: 0,
      toast: "",
    });
    sim.playing = true;
    sim.transitioning = false;
    audio.setMood("medence");
    lookLock();
    saveAuto();
  }, 280);
}

export function beginFrom(data: SaveData) {
  audio.ensure();
  const settings = data.settings;
  useGame.getState().patch({
    sensitivity: settings.sensitivity,
    volume: settings.volume,
    invertY: settings.invertY,
    invertX: settings.invertX,
    quality: settings.quality,
    collected: data.collected,
    visited: data.visited,
    playSeconds: data.playSeconds,
    levelId: data.levelId,
    note: null,
    prompt: "",
    toast: "",
    fading: true,
  });
  syncSettings(settings);
  audio.setVolume(settings.volume);
  saveSettings(settings);
  sim.playSeconds = data.playSeconds;
  sim.transitioning = true;
  window.setTimeout(() => {
    applyLevel(data.levelId, data);
    useGame.getState().patch({
      mode: "play",
      fading: false,
      banner: getLevel(data.levelId).name,
    });
    sim.playing = true;
    sim.transitioning = false;
    audio.setMood(data.levelId);
    lookLock();
  }, 280);
}

export function continueGame() {
  const data = newestSave();
  if (!data) beginFresh();
  else beginFrom(data);
}

export function pauseGame() {
  sim.playing = false;
  sim.keys.clear();
  sim.joyX = 0;
  sim.joyY = 0;
  useGame.getState().patch({
    mode: "paused",
    playSeconds: sim.playSeconds,
    prompt: "",
  });
  saveAuto();
  try {
    if (document.pointerLockElement) document.exitPointerLock();
  } catch {
    /* ignore */
  }
}

export function resumeGame() {
  const mode = useGame.getState().mode;
  if (mode !== "paused" && mode !== "note") return;
  sim.keys.clear();
  sim.prevE = false;
  sim.prevJ = false;
  sim.playing = true;
  useGame.getState().patch({ mode: "play", note: null });
  lookLock();
}

export function backToTitle() {
  sim.playing = false;
  sim.keys.clear();
  saveAuto();
  useGame.getState().patch({ mode: "title", note: null, prompt: "", fading: false });
  try {
    if (document.pointerLockElement) document.exitPointerLock();
  } catch {
    /* ignore */
  }
}

export function openMemory() {
  const id = sim.nearId;
  if (!id) return;
  const level = getLevel(useGame.getState().levelId);
  const mem = level.memories.find((item) => item.id === id);
  if (!mem) return;
  const state = useGame.getState();
  const already = state.collected.includes(mem.id);
  const collected = already ? state.collected : [...state.collected, mem.id];
  sim.playing = false;
  sim.useLock = 0.45;
  audio.chime();
  state.patch({
    mode: "note",
    note: mem,
    collected,
    toast: already ? "" : "Emlék megmaradt",
  });
  saveAuto();
}

export function closeNote() {
  sim.useLock = 0.45;
  sim.prevE = true;
  sim.keys.delete("KeyE");
  sim.playing = true;
  useGame.getState().patch({ mode: "play", note: null });
}

export function manualSave(slot: number) {
  const ok = saveSlot(slot);
  useGame.getState().patch({
    toast: ok ? `${slot}. hely elmentve` : "A mentés nem sikerült",
    playSeconds: sim.playSeconds,
  });
}

export function manualLoad(slot: number) {
  const data = loadSlot(slot);
  if (!data) {
    useGame.getState().patch({ toast: "Ez a hely üres" });
    return;
  }
  beginFrom(data);
}

export function downloadSave() {
  exportSave();
}

export function importText(text: string) {
  const data = parseImport(text);
  if (!data) {
    useGame.getState().patch({ toast: "Ezt a fájlt nem tudom beolvasni" });
    return;
  }
  beginFrom(data);
}

export async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else await document.documentElement.requestFullscreen();
  } catch {
    useGame.getState().patch({ toast: "A teljes képernyő itt nem elérhető" });
  }
}
