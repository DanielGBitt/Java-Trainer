import { localStorageProvider } from "./localStorage";
import type { StorageProvider } from "@/types/storage";

export const storage: StorageProvider = localStorageProvider;
