import {
  FolderOpen,
  Map,
  Maximize,
  Menu,
  Play,
  RotateCcw,
  Save,
  Settings,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  backToTitle,
  beginFresh,
  beginFrom,
  closeNote,
  continueGame,
  downloadSave,
  importText,
  manualLoad,
  manualSave,
  pauseGame,
  resumeGame,
  toggleFullscreen,
  travelTo,
} from "@/game/actions";
import { audio } from "@/game/audio";
import { LEVEL_LIST } from "@/game/levels";
import {
  deleteSlot,
  formatPlay,
  formatWhen,
  hasAnySave,
  levelName,
  loadAuto,
  loadSlot,
  saveSettings,
  type SaveData,
} from "@/game/save";
import { sim, syncSettings } from "@/game/sim";
import { useGame, type Quality } from "@/game/store";

const primary =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-5 font-medium text-bg disabled:opacity-40";
const ghost =
  "inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border bg-surface/80 px-5 text-fg disabled:opacity-40";

function useTouchUI() {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    const check = () => setOn(mq.matches || window.innerWidth < 820);
    check();
    mq.addEventListener("change", check);
    window.addEventListener("resize", check);
    return () => {
      mq.removeEventListener("change", check);
      window.removeEventListener("resize", check);
    };
  }, []);
  return on;
}

export function TitleScreen() {
  const [levelsOpen, setLevelsOpen] = useState(false);
  const [canContinue, setCanContinue] = useState(false);
  useEffect(() => setCanContinue(hasAnySave()), []);
  return (
    <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-bg via-bg/80 to-bg/15 p-5 md:justify-center md:bg-gradient-to-r md:p-14">
      <div className="mx-auto w-full max-w-xl md:mx-0">
        <p className="font-sans text-xs tracking-widest text-accent">DREAMCORE SÉTA</p>
        <h1 className="mt-2 font-display text-5xl leading-none text-fg md:text-7xl">Rózsaszín óra</h1>
        <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
          Hat hely volt. Most a víz tovább tart. A padló tükröz, az emlék megmarad.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" className={primary} onClick={beginFresh}>
            <Play className="h-5 w-5" />
            Belépés
          </button>
          <button type="button" className={ghost} disabled={!canContinue} onClick={continueGame}>
            <RotateCcw className="h-5 w-5" />
            Folytatás
          </button>
          <button type="button" className={ghost} onClick={() => setLevelsOpen((v) => !v)}>
            <Map className="h-5 w-5" />
            Pályák
          </button>
        </div>
        {levelsOpen && (
          <div className="mt-4 grid max-h-64 gap-2 overflow-y-auto">
            {LEVEL_LIST.map((level) => (
              <button
                key={level.id}
                type="button"
                className="min-h-12 rounded-2xl border border-border bg-surface/80 px-4 py-3 text-left"
                onClick={() => travelTo(level.id)}
              >
                <span className="mr-3 font-display text-accent">{level.index}</span>
                {level.name}
              </button>
            ))}
          </div>
        )}
        <p className="mt-5 text-sm text-muted">WASD séta · egér nézelődés · Shift futás · E emlék · Esc menü</p>
      </div>
    </div>
  );
}

export function Hud() {
  const levelId = useGame((s) => s.levelId);
  const collected = useGame((s) => s.collected);
  const prompt = useGame((s) => s.prompt);
  const quality = useGame((s) => s.quality);
  const volume = useGame((s) => s.volume);
  const banner = useGame((s) => s.banner);
  const level = LEVEL_LIST.find((item) => item.id === levelId) ?? LEVEL_LIST[0];
  const here = collected.filter((id) => id.startsWith(level.id)).length;
  const total = LEVEL_LIST.reduce((n, item) => n + item.memories.length, 0);
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      <div className="flex items-start justify-between gap-3 p-4">
        <div className="min-w-0">
          <p className="truncate font-display text-2xl text-fg">{level.name}</p>
          <p className="text-sm text-muted">
            {level.index} / {String(LEVEL_LIST.length).padStart(2, "0")} · itt {here}/3 · összesen {collected.length}/{total}
            {quality === "max" ? <span className="ml-2 text-accent">RAY MAX</span> : null}
          </p>
        </div>
        <div className="pointer-events-auto flex shrink-0 gap-2">
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/80 text-fg"
            aria-label={volume > 0.01 ? "Némítás" : "Hang"}
            onClick={() => {
              const next = volume > 0.01 ? 0 : 0.65;
              useGame.getState().patch({ volume: next });
              audio.ensure();
              audio.setVolume(next);
              saveSettings({ volume: next });
            }}
          >
            {volume > 0.01 ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full border border-border bg-surface/80 text-fg"
            aria-label="Menü"
            onClick={pauseGame}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
      {banner ? (
        <p key={banner} className="banner-in absolute left-1/2 top-24 -translate-x-1/2 text-center font-display text-3xl text-fg">{banner}</p>
      ) : null}
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary" />
      {prompt ? (
        <p key={prompt} className="prompt-in absolute bottom-36 left-0 right-0 text-center text-sm text-fg md:bottom-16">{prompt}</p>
      ) : null}
    </div>
  );
}

function SlotRow({
  label,
  data,
  onSave,
  onLoad,
  onDelete,
}: {
  label: string;
  data: SaveData | null;
  onSave?: () => void;
  onLoad?: () => void;
  onDelete?: () => void;
}) {
  return (
    <div className="rounded-2xl border border-border bg-bg/60 p-3">
      <div className="flex items-baseline justify-between gap-3">
        <p className="font-medium text-fg">{label}</p>
        <p className="text-sm text-muted">{data ? formatWhen(data.updatedAt) : "üres"}</p>
      </div>
      <p className="mt-1 text-sm text-muted">
        {data
          ? `${levelName(data.levelId)} · ${data.collected.length} emlék · ${formatPlay(data.playSeconds)}`
          : "Még nincs itt semmi."}
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {onSave ? (
          <button type="button" className={ghost} onClick={onSave}>
            Mentés ide
          </button>
        ) : null}
        <button type="button" className={ghost} disabled={!data || !onLoad} onClick={onLoad}>
          Betöltés
        </button>
      </div>
      {onDelete ? (
        <button type="button" className={`${ghost} mt-2`} disabled={!data} onClick={onDelete}>
          Törlés
        </button>
      ) : null}
    </div>
  );
}

export function PauseLayer() {
  const [tab, setTab] = useState<"main" | "save" | "levels" | "settings">("main");
  const [rev, setRev] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const sensitivity = useGame((s) => s.sensitivity);
  const volume = useGame((s) => s.volume);
  const invertY = useGame((s) => s.invertY);
  const invertX = useGame((s) => s.invertX);
  const quality = useGame((s) => s.quality);
  const collected = useGame((s) => s.collected);
  const refresh = () => setRev((n) => n + 1);
  const auto = rev >= 0 ? loadAuto() : null;

  const setQuality = (next: Quality) => {
    useGame.getState().patch({ quality: next });
    saveSettings({ quality: next, explicitQuality: true });
  };

  return (
    <div className="absolute inset-0 z-30 flex items-end justify-center bg-bg/55 p-4 sm:items-center">
      <div className="max-h-full w-full max-w-lg overflow-y-auto rounded-3xl border border-border bg-surface p-5 text-fg">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-3xl">
            {tab === "main" ? "Szünet" : tab === "save" ? "Mentés" : tab === "levels" ? "Pályák" : "Beállítás"}
          </h2>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-muted"
            aria-label="Bezár"
            onClick={resumeGame}
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {tab === "main" && (
          <div className="grid gap-3">
            <button type="button" className={primary} onClick={resumeGame}>
              <Play className="h-5 w-5" />
              Folytatás
            </button>
            <button type="button" className={ghost} onClick={() => setTab("save")}>
              <Save className="h-5 w-5" />
              Mentések
            </button>
            <button type="button" className={ghost} onClick={() => setTab("levels")}>
              <Map className="h-5 w-5" />
              Pályaválasztó
            </button>
            <button type="button" className={ghost} onClick={() => setTab("settings")}>
              <Settings className="h-5 w-5" />
              Beállítások
            </button>
            <button type="button" className={ghost} onClick={backToTitle}>
              Főmenü
            </button>
          </div>
        )}
        {tab === "save" && (
          <div className="grid gap-3">
            <SlotRow label="Automatikus" data={auto} onLoad={auto ? () => beginFrom(auto) : undefined} />
            {[1, 2, 3].map((n) => {
              const data = loadSlot(n);
              return (
                <SlotRow
                  key={n}
                  label={`${n}. hely`}
                  data={data}
                  onSave={() => {
                    manualSave(n);
                    refresh();
                  }}
                  onLoad={() => manualLoad(n)}
                  onDelete={() => {
                    deleteSlot(n);
                    refresh();
                  }}
                />
              );
            })}
            <div className="flex flex-wrap gap-2">
              <button type="button" className={ghost} onClick={downloadSave}>
                <FolderOpen className="h-5 w-5" />
                Fájlba
              </button>
              <button type="button" className={ghost} onClick={() => fileRef.current?.click()}>
                Beolvasás
              </button>
              <input
                ref={fileRef}
                type="file"
                accept="application/json,.json"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (!file) return;
                  void file.text().then(importText);
                  e.target.value = "";
                }}
              />
            </div>
            <button type="button" className={ghost} onClick={() => setTab("main")}>
              Vissza
            </button>
          </div>
        )}
        {tab === "levels" && (
          <div className="grid gap-2">
            {LEVEL_LIST.map((level) => {
              const got = collected.filter((id) => id.startsWith(level.id)).length;
              return (
                <button
                  key={level.id}
                  type="button"
                  className="flex min-h-12 items-center justify-between rounded-2xl border border-border bg-bg/50 px-4 py-3 text-left"
                  onClick={() => travelTo(level.id)}
                >
                  <span>
                    <span className="mr-3 font-display text-accent">{level.index}</span>
                    {level.name}
                  </span>
                  <span className="text-sm text-muted">{got}/3</span>
                </button>
              );
            })}
            <button type="button" className={ghost} onClick={() => setTab("main")}>
              Vissza
            </button>
          </div>
        )}
        {tab === "settings" && (
          <div className="grid gap-4">
            <label className="grid gap-1 text-sm text-muted">
              Egérérzékenység
              <input
                type="range"
                min={0.4}
                max={2.2}
                step={0.05}
                value={sensitivity}
                onChange={(e) => {
                  const sensitivityNext = Number(e.target.value);
                  useGame.getState().patch({ sensitivity: sensitivityNext });
                  syncSettings({ sensitivity: sensitivityNext, invertY, invertX });
                  saveSettings({ sensitivity: sensitivityNext });
                }}
              />
            </label>
            <label className="grid gap-1 text-sm text-muted">
              Hangerő
              <input
                type="range"
                min={0}
                max={1}
                step={0.01}
                value={volume}
                onChange={(e) => {
                  const volumeNext = Number(e.target.value);
                  useGame.getState().patch({ volume: volumeNext });
                  audio.ensure();
                  audio.setVolume(volumeNext);
                  saveSettings({ volume: volumeNext });
                }}
              />
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className={ghost}
                onClick={() => {
                  const next = !invertX;
                  useGame.getState().patch({ invertX: next });
                  syncSettings({ sensitivity, invertY, invertX: next });
                  saveSettings({ invertX: next });
                }}
              >
                X tengely {invertX ? "fordított" : "normál"}
              </button>
              <button
                type="button"
                className={ghost}
                onClick={() => {
                  const next = !invertY;
                  useGame.getState().patch({ invertY: next });
                  syncSettings({ sensitivity, invertY: next, invertX });
                  saveSettings({ invertY: next });
                }}
              >
                Y tengely {invertY ? "fordított" : "normál"}
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  ["low", "Alacsony"],
                  ["high", "Közepes"],
                  ["max", "Ray MAX"],
                ] as const
              ).map(([id, label]) => (
                <button key={id} type="button" className={id === quality ? primary : ghost} onClick={() => setQuality(id)}>
                  {label}
                </button>
              ))}
            </div>
            <p className="text-sm leading-relaxed text-muted">
              Ray MAX: a padló élőben visszatükrözi a teret, a fémek a fényt, bloom és éles árnyék. Gyenge gépen a középső nyugodtabb.
            </p>
            <button type="button" className={ghost} onClick={() => void toggleFullscreen()}>
              <Maximize className="h-5 w-5" />
              Teljes képernyő
            </button>
            <button type="button" className={ghost} onClick={() => setTab("main")}>
              Vissza
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export function NoteCard() {
  const note = useGame((s) => s.note);
  if (!note) return null;
  return (
    <div className="note-in absolute inset-0 z-30 grid place-items-center bg-bg/45 p-5">
      <article key={note.id} className="note-card can-select w-full max-w-md rounded-2xl border border-border bg-fg p-6 text-bg">
        <p className="text-xs tracking-widest text-surface">EMLÉK</p>
        <h3 className="mt-2 font-display text-4xl">{note.title}</h3>
        <p className="mt-4 text-lg leading-relaxed">{note.body}</p>
        <button type="button" className="mt-6 inline-flex h-12 items-center justify-center rounded-full bg-bg px-5 text-fg" onClick={closeNote}>
          Vissza a sétához
        </button>
      </article>
    </div>
  );
}

export function Toast() {
  const toast = useGame((s) => s.toast);
  if (!toast) return null;
  return (
    <p className="toast-in absolute left-1/2 top-6 z-40 -translate-x-1/2 rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg">
      {toast}
    </p>
  );
}

export function Fade() {
  const fading = useGame((s) => s.fading);
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-40 bg-bg transition-opacity duration-300 ${fading ? "opacity-100" : "opacity-0"}`}
    />
  );
}

function HoldButton({
  label,
  pressed,
  on,
}: {
  label: string;
  pressed?: boolean;
  on: (down: boolean) => void;
}) {
  return (
    <button
      type="button"
      className={`h-14 min-w-16 rounded-full border border-border px-4 text-sm ${pressed ? "bg-primary text-bg" : "bg-surface/80 text-fg"}`}
      onPointerDown={(e) => {
        e.preventDefault();
        on(true);
      }}
      onPointerUp={() => on(false)}
      onPointerCancel={() => on(false)}
    >
      {label}
    </button>
  );
}

export function TouchControls() {
  const on = useTouchUI();
  const mode = useGame((s) => s.mode);
  const [stick, setStick] = useState({ x: 0, y: 0 });
  const [sprint, setSprint] = useState(false);
  const stickId = useRef(-1);
  const lookId = useRef(-1);
  const origin = useRef({ x: 0, y: 0 });
  const lookAt = useRef({ x: 0, y: 0 });
  if (!on || mode !== "play") return null;
  return (
    <>
      <div
        className="safe-bottom absolute bottom-4 left-4 z-30 grid h-36 w-36 place-items-center rounded-full border border-border bg-surface/50"
        onPointerDown={(e) => {
          stickId.current = e.pointerId;
          origin.current = { x: e.clientX, y: e.clientY };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (e.pointerId !== stickId.current) return;
          let dx = e.clientX - origin.current.x;
          let dy = e.clientY - origin.current.y;
          const mag = Math.hypot(dx, dy);
          const max = 48;
          if (mag > max) {
            dx = (dx / mag) * max;
            dy = (dy / mag) * max;
          }
          setStick({ x: dx, y: dy });
          sim.joyX = dx / max;
          sim.joyY = -dy / max;
        }}
        onPointerUp={(e) => {
          if (e.pointerId !== stickId.current) return;
          stickId.current = -1;
          setStick({ x: 0, y: 0 });
          sim.joyX = 0;
          sim.joyY = 0;
        }}
        onPointerCancel={(e) => {
          if (e.pointerId !== stickId.current) return;
          stickId.current = -1;
          setStick({ x: 0, y: 0 });
          sim.joyX = 0;
          sim.joyY = 0;
        }}
      >
        <span className="h-12 w-12 rounded-full bg-primary" style={{ transform: `translate(${stick.x}px, ${stick.y}px)` }} />
      </div>
      <div
        className="absolute bottom-0 right-0 top-0 z-20 w-[58%]"
        onPointerDown={(e) => {
          if ((e.target as HTMLElement).closest("button")) return;
          lookId.current = e.pointerId;
          lookAt.current = { x: e.clientX, y: e.clientY };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (e.pointerId !== lookId.current) return;
          const dx = e.clientX - lookAt.current.x;
          const dy = e.clientY - lookAt.current.y;
          lookAt.current = { x: e.clientX, y: e.clientY };
          const xSign = sim.invertX ? -1 : 1;
          const ySign = sim.invertY ? -1 : 1;
          sim.yaw -= dx * sim.sens * 1.8 * xSign;
          sim.pitch = Math.max(-1.15, Math.min(1.15, sim.pitch - dy * sim.sens * 1.8 * ySign));
        }}
        onPointerUp={(e) => {
          if (e.pointerId === lookId.current) lookId.current = -1;
        }}
        onPointerCancel={(e) => {
          if (e.pointerId === lookId.current) lookId.current = -1;
        }}
      />
      <div className="safe-bottom absolute bottom-4 right-4 z-30 flex flex-col gap-2">
        <HoldButton label="Ugrás" on={(down) => (sim.jumpHeld = down)} />
        <HoldButton
          label="Futás"
          pressed={sprint}
          on={(down) => {
            if (!down) return;
            const next = !sim.sprintToggle;
            sim.sprintToggle = next;
            setSprint(next);
          }}
        />
        <HoldButton label="Emlék" on={(down) => (sim.interactHeld = down)} />
      </div>
    </>
  );
}
