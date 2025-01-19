import { User } from "@/models/user";

export type WorkerMessageType = "UPDATE_COUNT" | "ADD_MEMBER" | "REMOVE_MEMBER";

export interface UpdateCountMessage {
  type: "UPDATE_COUNT";
  count: number;
}

export interface AddMemberMessage {
  type: "ADD_MEMBER";
  user: User;
}

export interface RemoveMemberMessage {
  type: "REMOVE_MEMBER";
  user: User;
}

export type WorkerMessage =
  | UpdateCountMessage
  | AddMemberMessage
  | RemoveMemberMessage;
