import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { isDevMode } from "./utils.js";
import { getStaticResources, pollResources } from "./resourceManager.js";
import { getPreloadPath } from "./pathResolver.js";

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
    });
    if (isDevMode()) {
        mainWindow.loadURL("http://localhost:5173");
    } else {
        mainWindow.loadFile(
            path.join(app.getAppPath(), "/dist-react/index.html")
        );
    }
    pollResources(mainWindow);
    ipcMain.handle("getStaticData", () => {
        return getStaticResources();
    });
});
