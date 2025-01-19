import { User } from "@/models/user";
import { UpdateCountMessage } from "./workerMessages";

let teamMembers: User[] = [];
let connections: MessagePort[] = [];

const loadMembersFromFile = async () => {
  const response = await fetch("../../assets/members/members.json");
  if (response.ok) {
    const data = await response.json();
    teamMembers = data;
  } else {
    console.error("Ошибка при загрузке участников:", response.statusText);
  }
};

const ctx = self as unknown as SharedWorkerGlobalScope;

ctx.onconnect = async (event: MessageEvent) => {
  const port = event.ports[0];
  connections.push(port);

  await loadMembersFromFile();

  // Отправляем текущее количество участников при подключении
  const updateCountMessage: UpdateCountMessage = {
    type: "UPDATE_COUNT",
    count: teamMembers.length,
  };

  port.postMessage(updateCountMessage);

  port.onmessage = function (e: MessageEvent) {
    const message = e.data;

    switch (message.type) {
      case "ADD_MEMBER":
        if (
          !teamMembers.find((member) => member.login === message.user.login)
        ) {
          teamMembers = [...teamMembers, message.user];
        } else {
          console.log("Member already exists:", message.user);
        }
        break;
      case "REMOVE_MEMBER":
        teamMembers = teamMembers.filter(
          (member) => member.login !== message.user.login
        );
        break;
    }

    const updateCountMessage: UpdateCountMessage = {
      type: "UPDATE_COUNT",
      count: teamMembers.length,
    };
    // Обновляем всех подключенных клиентов
    connections.forEach((conn) => conn.postMessage(updateCountMessage));
  };
};
