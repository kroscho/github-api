import { app, BrowserWindow, shell, ipcMain, IpcMainEvent } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "node:os";
import { update } from "./update";
import { SendChannels } from "electron/preload";
import { getMembers, saveMembersToFile } from "./members";
import { User } from "@/models/user";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬ dist-electron
// │ ├─┬ main
// │ │ └── index.js    > Electron-Main
// │ └─┬ preload
// │   └── index.mjs   > Preload-Scripts
// ├─┬ dist
// │ └── index.html    > Electron-Renderer
//
process.env.APP_ROOT = path.join(__dirname, "../..");

export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
export const VITE_DEV_SERVER_URL = process.env.VITE_DEV_SERVER_URL;

const RESOURCES_PATH = app.isPackaged
  ? path.join(process.resourcesPath, "assets")
  : path.join(__dirname, "../../assets");

const getAssetPath = (...paths: string[]): string => {
  return path.join(RESOURCES_PATH, ...paths);
};

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;

// Disable GPU Acceleration for Windows 7
if (os.release().startsWith("6.1")) app.disableHardwareAcceleration();

// Set application name for Windows 10+ notifications
if (process.platform === "win32") app.setAppUserModelId(app.getName());

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let mainWindow: BrowserWindow | null = null;
let teamWindow: BrowserWindow | null = null;

const preload = path.join(__dirname, "../preload/index.mjs");
const indexHtml = path.join(RENDERER_DIST, "index.html");

async function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Profile window",
    width: 1280,
    height: 850,
    icon: path.join(process.env.VITE_PUBLIC, "favicon.ico"),
    webPreferences: {
      preload,
      // Warning: Enable nodeIntegration and disable contextIsolation is not secure in production
      // nodeIntegration: true,

      // Consider using contextBridge.exposeInMainWorld
      // Read more on https://www.electronjs.org/docs/latest/tutorial/context-isolation
      // contextIsolation: false,
    },
  });

  mainWindow.removeMenu();

  if (VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(VITE_DEV_SERVER_URL);
    // Open devTool if the app is not packaged
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(indexHtml);
  }

  // Test actively push message to the Electron-Renderer
  mainWindow.webContents.on("did-finish-load", () => {
    mainWindow?.webContents.send(
      "main-process-message",
      new Date().toLocaleString()
    );
  });

  // Make all links open with the browser, not with the application
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith("https:")) shell.openExternal(url);
    return { action: "deny" };
  });

  // Auto update
  update(mainWindow);

  mainWindow.on("close", () => {
    if (teamWindow) {
      teamWindow.close();
    }
  });
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  mainWindow = null;
  if (process.platform !== "darwin") app.quit();
});

app.on("second-instance", () => {
  if (mainWindow) {
    // Focus on the main window if the user tried to open another
    if (mainWindow.isMinimized()) mainWindow.restore();
    mainWindow.focus();
  }
});

app.on("activate", () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});

const ipcMainOn = (
  channel: SendChannels,
  listener: (event: IpcMainEvent, ...args: any[]) => void
) => ipcMain.on(channel, listener);

ipcMainOn("open-team-window", (event) => {
  if (teamWindow) {
    // Если окно уже открыто, просто фокусируем его
    teamWindow.focus();
  } else {
    // Создаем новое окно
    teamWindow = new BrowserWindow({
      title: "Team Window",
      width: 1280,
      height: 850,
      icon: path.join(process.env.VITE_PUBLIC, "favicon.ico"),
      webPreferences: {
        preload,
        // nodeIntegration: true, // Если нужно
        contextIsolation: true, // Для безопасности
      },
    });

    teamWindow.removeMenu();

    if (VITE_DEV_SERVER_URL) {
      teamWindow.loadURL(`${VITE_DEV_SERVER_URL}/team`);
      teamWindow.webContents.openDevTools();
    } else {
      teamWindow.loadFile(path.join(RENDERER_DIST, "team.html"));
    }

    teamWindow.on("closed", () => {
      teamWindow = null;
    });
  }
  event.returnValue = true;
});

ipcMainOn("add-member", (event, userArgs: User[]) => {
  if (userArgs.length === 0) return;
  const user = userArgs[0];
  const members = getMembers(getAssetPath);
  members.push(user);
  saveMembersToFile(getAssetPath, members);
  event.returnValue = true;
});

ipcMainOn("remove-member", (event, userArgs: User[]) => {
  if (userArgs.length === 0) return;
  const user = userArgs[0];
  const members = getMembers(getAssetPath);
  const filteredMembers = members.filter(
    (member) => member.login !== user.login
  );
  saveMembersToFile(getAssetPath, filteredMembers);
  event.returnValue = true;
});

ipcMainOn("get-members", (event) => {
  const members = getMembers(getAssetPath);
  event.returnValue = members;
});
