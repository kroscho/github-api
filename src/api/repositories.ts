import { http } from "@/config/axios";
import {
  GetRepositoryLanguagesRequest,
  RepositoryLanguages,
} from "@/models/reposioryLanguages";
import { GetRepositoriesRequest, Repository } from "@/models/repository";

export const getRepositories = async (
  data: GetRepositoriesRequest
): Promise<Repository[]> => {
  const response = await http.get<Repository[]>(
    `/users/${data.userName}/repos`
  );

  return response.data;
};

export const getRepositoryLanguages = async (
  data: GetRepositoryLanguagesRequest
): Promise<RepositoryLanguages> => {
  const response = await http.get<RepositoryLanguages>(
    `/repos/${data.userName}/${data.repoName}/languages`
  );

  return response.data;
};
