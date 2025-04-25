const electron = require("electron");

// Extend the Window interface to include the 'electron' property
declare global {
    interface Window {
        electron: {
            logThings: (message: string) => void;
        };
    }
}

electron.contextBridge.exposeInMainWorld("electron", {
    logThings: (message: string) => {
        console.log(message);
    },
}) satisfies Window["electron"];
