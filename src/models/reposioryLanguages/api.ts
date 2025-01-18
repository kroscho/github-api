export interface GetRepositoryLanguagesRequest {
  userName: string;
  repoName: string;
}

export interface RepositoryLanguages {
  [language: string]: number;
}
