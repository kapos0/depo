import { app, BrowserWindow } from "electron";
import { ipcMainHandle, isDevMode } from "./utils.js";
import { getStaticResources, pollResources } from "./resourceManager.js";
import { getPreloadPath, getUIPath } from "./pathResolver.js";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
    });
    if (isDevMode()) {
        mainWindow.loadURL("http://localhost:5173");
    } else {
        mainWindow.loadFile(getUIPath());
    }
    pollResources(mainWindow);
    ipcMainHandle("getStaticData", () => {
        return getStaticResources();
    });
});
