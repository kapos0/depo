import { ipcMain, WebContents, WebFrameMain } from "electron";
import { getUIPath } from "./pathResolver.js";
import { pathToFileURL } from "url";

export function isDevMode(): boolean {
    return process.env.NODE_ENV === "development";
}

export function ipcMainHandle<Key extends keyof EventPayloadMapping>(
    key: Key,
    handler: () => EventPayloadMapping[Key]
) {
    ipcMain.handle(key, (event) => {
        if (event.senderFrame) {
            validateEventFrame(event.senderFrame);
            return handler();
        } else throw new Error("Bad Things Happend");
    });
}

export function ipcWebContentsSend<Key extends keyof EventPayloadMapping>(
    key: Key,
    webContents: WebContents,
    payload: EventPayloadMapping[Key]
) {
    webContents.send(key, payload);
}

export function validateEventFrame(frame: WebFrameMain) {
    if (isDevMode() && new URL(frame.url).host === "localhost:5173") return;
    if (frame.url !== pathToFileURL(getUIPath()).toString())
        throw new Error("Bad Event"); //than can be really complicated this works only one index.html file
}
