export enum ProfileTabEnum {
  REPOSITORIES = "repositories",
  FOLLOWING = "following",
  TEAM = "team",
}

export const profileTabsList = [
  { label: "Репозитории", value: ProfileTabEnum.REPOSITORIES },
  { label: "Подписки", value: ProfileTabEnum.FOLLOWING },
  { label: "Команда", value: ProfileTabEnum.TEAM },
];
