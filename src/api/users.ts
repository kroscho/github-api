import { http } from "@/config/axios";
import {
  Following,
  GetUserRequest,
  GetUsersRequest,
  User,
} from "@/models/user";

export const getUser = async (data: GetUserRequest): Promise<User> => {
  const response = await http.get<User>(`/users/${data.userName}`);

  return response.data;
};

export const getUsers = async (data: GetUsersRequest): Promise<User[]> => {
  const response = await http.get<User[]>("/users", {
    params: {
      since: data.since ?? undefined,
      per_page: data.per_page ?? undefined,
    },
  });

  return response.data;
};

export const getFollofings = async (
  data: GetUserRequest
): Promise<Following[]> => {
  const response = await http.get<Following[]>(
    `/users/${data.userName}/following`
  );

  return response.data;
};
