import { SendChannels } from "electron/preload";

export const invokeIPC = async <T>(
  channel: SendChannels,
  args?: any[]
): Promise<T> => {
  const sendArgs = args ? args : [];
  return window.ipcRenderer.invoke(channel, sendArgs);
};

export const sendIPC = <T>(channel: SendChannels, args?: any[]): T => {
  const sendArgs = args ? args : [];
  return window.ipcRenderer.sendSync(channel, sendArgs);
};
