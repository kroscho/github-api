import { User } from "@/models/user";
import { sendIPC } from "@/utils";
import { AddMemberMessage, RemoveMemberMessage } from "@/workers";
import { useEffect, useState } from "react";

let worker: SharedWorker;

export const useTeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);

  const fetchMembers = async () => {
    try {
      const members = sendIPC<User[]>("get-members");
      setTeamMembers(members);
    } catch (error) {
      console.error("Error fetching members:", error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  useEffect(() => {
    worker = new SharedWorker(
      new URL("../../../../workers/sharedWorker", import.meta.url)
    );

    worker.port.start();

    return () => {
      worker.port.close();
    };
  }, [worker]);

  const handleRemoveMember = (user: User) => {
    setTeamMembers((prev) =>
      prev.filter((member) => member.login !== user.login)
    );
    sendIPC("remove-member", [user]);
    const removeMemberMessage: RemoveMemberMessage = {
      type: "REMOVE_MEMBER",
      user,
    };
    worker.port.postMessage(removeMemberMessage);
  };

  const handleAddMember = (user: User) => {
    const userAlreadyInTeam = teamMembers.find(
      (member) => member.login === user.login
    );
    if (!userAlreadyInTeam) {
      sendIPC("add-member", [user]);
      setTeamMembers((prev) => [user, ...prev]);
      const addMemberMessage: AddMemberMessage = {
        type: "ADD_MEMBER",
        user,
      };
      worker.port.postMessage(addMemberMessage);
    }
  };

  return {
    teamMembers,
    handleRemoveMember,
    handleAddMember,
  };
};
