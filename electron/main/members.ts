import { User } from "@/models/user";
import { existsSync, readFileSync, writeFileSync } from "fs";

type getPathFunc = (...paths: string[]) => string;

export const getMembers = (getAssetPath: getPathFunc): User[] => {
  const membersPath = getAssetPath("members", "members.json");
  try {
    if (existsSync(membersPath)) {
      const data = readFileSync(membersPath, "utf-8");
      return JSON.parse(data);
    } else {
      // если файл не сущеесутвует, то создаем этот файл
      const newMembers = JSON.stringify([]);
      writeFileSync(membersPath, newMembers);
      return [];
    }
  } catch (error) {
    console.error("Ошибка при чтении файла:", error);
    return [];
  }
};

export const saveMembersToFile = (getAssetPath: getPathFunc, data: User[]) => {
  const membersPath = getAssetPath("members", "members.json");
  try {
    writeFileSync(membersPath, JSON.stringify(data, null, 2), "utf-8");
  } catch (error) {
    console.error("Ошибка при записи файла:", error);
  }
};
