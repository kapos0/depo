import { create } from "zustand";

type ThemeState = {
    theme: string;
    setTheme: (theme: string) => void;
};

export const useThemeStore = create<ThemeState>((set) => ({
    theme: localStorage.getItem("preferred-theme") || "night",
    setTheme: (theme: string) => {
        localStorage.setItem("preferred-theme", theme);
        set({ theme });
    },
}));
