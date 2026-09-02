import type { ProgressData } from "@/types/storage";

const STORAGE_KEY = "java-trainer-progress";

function isClient(): boolean {
  return typeof window !== "undefined";
}

export const localStorageProvider = {
  getProgress(): ProgressData | null {
    if (!isClient()) return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as ProgressData;
    } catch {
      return null;
    }
  },

  saveProgress(data: ProgressData): void {
    if (!isClient()) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage full or unavailable
    }
  },

  updateProgress(partial: Partial<ProgressData>): void {
    const current = this.getProgress();
    if (!current) return;
    this.saveProgress({ ...current, ...partial });
  },

  resetProgress(): void {
    if (!isClient()) return;
    localStorage.removeItem(STORAGE_KEY);
  },

  exportProgress(): string {
    const data = this.getProgress();
    return JSON.stringify(data, null, 2);
  },

  importProgress(json: string): void {
    try {
      const data = JSON.parse(json) as ProgressData;
      if (data.version !== 1) {
        throw new Error("Versión de datos no soportada");
      }
      this.saveProgress(data);
    } catch {
      throw new Error("Formato de datos inválido");
    }
  },
};
