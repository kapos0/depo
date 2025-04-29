import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
    logThings(message: string) {
        console.log(message);
    },
});
