import { create } from "zustand";

export interface RoadmapStore {
  activeNode: number;
  setActiveNode: (index: number) => void;
}

export const useRoadmapStore = create<RoadmapStore>((set) => ({
  activeNode: -1,
  setActiveNode: (index: number) => set({ activeNode: index }),
}));

let audioCtx: AudioContext | null = null;

// Premium subtle synthesized milestone chime
export function playChime() {
  if (typeof window === "undefined") return;

  try {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === "suspended") {
      audioCtx.resume();
    }

    const playTone = (time: number, freq: number) => {
      if (!audioCtx) return;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, time);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.5, time + 0.08);

      gain.gain.setValueAtTime(0.08, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(time);
      osc.stop(time + 0.09);
    };

    playTone(audioCtx.currentTime, 880);
    playTone(audioCtx.currentTime + 0.07, 1320);
  } catch {
    // Audio policies or unsupported in background
  }
}
