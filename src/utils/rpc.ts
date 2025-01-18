import { SendChannels } from "electron/preload";

export const invokeIPC = (channel: SendChannels, args?: any[]) => {
  const sendArgs = args ? args : [];
  return window.ipcRenderer.invoke(channel, sendArgs);
};

export const sendIPC = (channel: SendChannels, args?: any[]) => {
  const sendArgs = args ? args : [];
  return window.ipcRenderer.send(channel, sendArgs);
};
