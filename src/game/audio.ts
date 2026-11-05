import { useGame } from "@/game/store";

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let filter: BiquadFilterNode | null = null;
let oscA: OscillatorNode | null = null;
let oscB: OscillatorNode | null = null;
let noise: AudioBuffer | null = null;

const MOOD: Record<string, [number, number, number]> = {
  medence: [98, 146.8, 520],
  poolrooms: [92.5, 138.6, 440],
  utca: [82.4, 123.5, 640],
  folyoso: [130.8, 196, 900],
  jatszo: [73.4, 110, 480],
  motel: [87.3, 130.8, 380],
  szoba: [65.4, 98, 260],
};

function noiseBuffer(ac: AudioContext) {
  if (noise) return noise;
  const buffer = ac.createBuffer(1, ac.sampleRate * 0.12, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  noise = buffer;
  return buffer;
}

export const audio = {
  ensure() {
    if (typeof window === "undefined") return;
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    if (!ctx) {
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = useGame.getState().volume * 0.4;
      master.connect(ctx.destination);
      filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 520;
      const g = ctx.createGain();
      g.gain.value = 0.07;
      oscA = ctx.createOscillator();
      oscB = ctx.createOscillator();
      oscA.type = "sine";
      oscB.type = "triangle";
      oscA.frequency.value = 98;
      oscB.frequency.value = 146.8;
      oscA.connect(filter);
      oscB.connect(filter);
      filter.connect(g);
      g.connect(master);
      oscA.start();
      oscB.start();
      document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "visible") void ctx?.resume();
      });
    }
    if (ctx.state === "suspended") void ctx.resume();
    this.setVolume(useGame.getState().volume);
  },
  setVolume(v: number) {
    if (!master || !ctx) return;
    master.gain.setTargetAtTime(Math.max(0, v) * 0.4, ctx.currentTime, 0.05);
  },
  setMood(id: string) {
    if (!ctx || !oscA || !oscB || !filter) return;
    const mood = MOOD[id] ?? MOOD.medence;
    const t = ctx.currentTime;
    oscA.frequency.setTargetAtTime(mood[0], t, 0.4);
    oscB.frequency.setTargetAtTime(mood[1], t, 0.4);
    filter.frequency.setTargetAtTime(mood[2], t, 0.5);
  },
  chime() {
    if (!ctx || !master) return;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(523.25, t);
    o.frequency.exponentialRampToValueAtTime(784, t + 0.18);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.45);
    o.connect(g);
    g.connect(master);
    o.start(t);
    o.stop(t + 0.5);
  },
  step() {
    if (!ctx || !master || useGame.getState().volume <= 0.01) return;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuffer(ctx);
    const band = ctx.createBiquadFilter();
    band.type = "bandpass";
    band.frequency.value = 180 + Math.random() * 80;
    band.Q.value = 0.7;
    const g = ctx.createGain();
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0.05, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
    src.connect(band);
    band.connect(g);
    g.connect(master);
    src.start(t);
    src.stop(t + 0.1);
  },
};
