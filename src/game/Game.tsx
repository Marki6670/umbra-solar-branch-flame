import { Canvas } from "@react-three/fiber";
import { Component, useEffect, useLayoutEffect, useState, type ReactNode } from "react";
import * as THREE from "three";
import { openMemory, pauseGame, resumeGame, closeNote, travelTo } from "@/game/actions";
import { audio } from "@/game/audio";
import { Fade, Hud, NoteCard, PauseLayer, TitleScreen, Toast, TouchControls, WaterLens } from "@/game/overlay";
import { loadSettings, saveAuto } from "@/game/save";
import { installProbe, sim, syncSettings } from "@/game/sim";
import { useGame } from "@/game/store";
import { World } from "@/game/world";

class ViewError extends Component<{ children: ReactNode }, { message: string | null }> {
  state = { message: null as string | null };
  static getDerivedStateFromError(error: Error) {
    return { message: error.message || "ismeretlen hiba" };
  }
  render() {
    if (this.state.message) {
      return (
        <div className="grid h-full place-items-center p-6 text-center text-fg">
          <p>A kép megakadt: {this.state.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export function Game() {
  const [booted, setBooted] = useState(false);
  const mode = useGame((s) => s.mode);
  const quality = useGame((s) => s.quality);
  const banner = useGame((s) => s.banner);
  const toast = useGame((s) => s.toast);

  useLayoutEffect(() => {
    const saved = loadSettings();
    const small = window.matchMedia("(pointer: coarse)").matches || window.innerWidth < 820;
    const nextQuality = saved?.explicitQuality ? saved.quality : small ? "low" : "max";
    useGame.getState().patch({
      quality: nextQuality,
      sensitivity: saved?.sensitivity ?? 1,
      volume: saved?.volume ?? 0.65,
      invertY: saved?.invertY ?? false,
      invertX: saved?.invertX ?? false,
    });
    syncSettings(useGame.getState());
    installProbe();
    setBooted(true);
  }, []);

  useEffect(() => {
    sim.onUse = () => openMemory();
    sim.onPortal = (to) => travelTo(to);
    sim.onPrompt = (text) => {
      if (useGame.getState().prompt !== text) useGame.getState().patch({ prompt: text });
    };
    sim.onStep = () => audio.step();
    window.__dreamGoto = (id: string) => travelTo(id);
    return () => {
      sim.onUse = undefined;
      sim.onPortal = undefined;
      sim.onPrompt = undefined;
      sim.onStep = undefined;
    };
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.code === "Escape") {
        const current = useGame.getState().mode;
        if (current === "play") pauseGame();
        else if (current === "paused") resumeGame();
        else if (current === "note") closeNote();
        return;
      }
      if (!sim.playing) return;
      if (e.code === "Space" || e.code.startsWith("Arrow")) e.preventDefault();
      sim.keys.add(e.code);
    };
    const up = (e: KeyboardEvent) => {
      sim.keys.delete(e.code);
    };
    const clear = () => sim.keys.clear();
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", clear);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", clear);
    };
  }, []);

  useEffect(() => {
    if (!banner) return;
    const id = window.setTimeout(() => {
      if (useGame.getState().banner === banner) useGame.getState().patch({ banner: "" });
    }, 3400);
    return () => window.clearTimeout(id);
  }, [banner]);

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => {
      if (useGame.getState().toast === toast) useGame.getState().patch({ toast: "" });
    }, 2200);
    return () => window.clearTimeout(id);
  }, [toast]);

  useEffect(() => {
    const saveIfPlaying = () => {
      const current = useGame.getState().mode;
      if (current === "title") return;
      saveAuto();
    };
    const id = window.setInterval(saveIfPlaying, 20000);
    const onHide = () => {
      if (document.visibilityState === "hidden") saveIfPlaying();
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onHide);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onHide);
    };
  }, []);

  return (
    <div className="game-root relative h-dvh w-full overflow-hidden bg-bg text-fg">
      <div className="absolute inset-0">
        {booted ? (
          <ViewError>
            <Canvas
              key={quality}
              className="h-full w-full"
              dpr={quality === "max" ? [1, 1.5] : quality === "high" ? [1, 1.25] : [1, 1]}
              shadows={quality === "low" ? false : "soft"}
              camera={{ fov: 68, near: 0.08, far: 220, position: [0, 2.2, 8] }}
              gl={{
                antialias: quality !== "max",
                alpha: false,
                powerPreference: "high-performance",
                toneMapping: THREE.ACESFilmicToneMapping,
              }}
            >
              <World />
            </Canvas>
          </ViewError>
        ) : null}
      </div>
      <div className="vhs pointer-events-none absolute inset-0 z-10" />
      <div className="vignette pointer-events-none absolute inset-0 z-10" />
      <WaterLens />
      {mode === "title" ? <TitleScreen /> : null}
      {mode === "play" || mode === "note" ? <Hud /> : null}
      {mode === "play" ? <TouchControls /> : null}
      {mode === "paused" ? <PauseLayer /> : null}
      {mode === "note" ? <NoteCard /> : null}
      <Toast />
      <Fade />
    </div>
  );
}
