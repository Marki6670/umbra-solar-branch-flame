import { create } from "zustand";
import type { Memory } from "@/game/levels";

export type Quality = "low" | "high" | "max";
export type Mode = "title" | "play" | "paused" | "note";

export type GameState = {
  mode: Mode;
  levelId: string;
  quality: Quality;
  sensitivity: number;
  volume: number;
  invertY: boolean;
  invertX: boolean;
  collected: string[];
  visited: string[];
  note: Memory | null;
  toast: string;
  prompt: string;
  fading: boolean;
  banner: string;
  playSeconds: number;
  patch: (partial: Partial<Omit<GameState, "patch">>) => void;
};

export const useGame = create<GameState>((set) => ({
  mode: "title",
  levelId: "medence",
  quality: "max",
  sensitivity: 1,
  volume: 0.65,
  invertY: false,
  invertX: false,
  collected: [],
  visited: ["medence"],
  note: null,
  toast: "",
  prompt: "",
  fading: false,
  banner: "",
  playSeconds: 0,
  patch: (partial) => set(partial),
}));
