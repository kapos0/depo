/// <reference types="vite-plugin-electron/electron-env" />

interface Window {
    electron: {
        logThings: (message: string) => void;
    };
}
