export enum ProfileTabEnum {
  REPOSITORIES = "repositories",
  FOLLOWING = "following",
}

export const profileTabsList = [
  { label: "Репозитории", value: ProfileTabEnum.REPOSITORIES },
  { label: "Подписки", value: ProfileTabEnum.FOLLOWING },
];
