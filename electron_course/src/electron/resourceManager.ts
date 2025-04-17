import osUitls from "os-utils";
import os from "os";
import fs from "fs";

const POLLING_INTERVAL = 1000; // 1 second

export function getStaticResources() {
    const totalStorage = getStorageData().total;
    const cpuModel = os.cpus()[0].model;
    const totalMemoryGB = Math.floor(os.totalmem() / 1024);
    return {
        cpuModel,
        totalMemoryGB,
        totalStorageGB: totalStorage,
    };
}

function getCpuUsage() {
    return new Promise<number>((resolve) => osUitls.cpuUsage(resolve));
}

function getRamUsage() {
    return 1 - osUitls.freememPercentage();
}

function getStorageData() {
    const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
    const total = stats.bsize * stats.blocks;
    const free = stats.bsize * stats.bfree;

    return {
        total: Math.floor(total / 1_000_000_000),
        usage: 1 - free / total,
    };
}

export function pollResources(mainWindow: Electron.BrowserWindow) {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        const ramUsage = getRamUsage();
        const storageData = getStorageData();
        mainWindow.webContents.send("statistics", {
            data: {
                cpuUsage: (cpuUsage * 100).toFixed(2) + "%",
                ramUsage: (ramUsage * 100).toFixed(2) + "%",
                storageUsage: storageData.usage * 100 + "%",
            },
        });
    }, POLLING_INTERVAL);
}
