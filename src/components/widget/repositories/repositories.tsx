import { FC, useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Repository } from "@/models/repository";
import { getRepositories } from "@/api";
import { MY_GITHUB_USERNAME } from "@/config/consts";
import { RepositoriesItem } from "./components/repositoriesItem";

const RepositoriesContainer = styled("div")({
  paddingBottom: "32px",
  width: "100%",
});

interface RepositoriesProps {}

export const Repositories: FC<RepositoriesProps> = ({}) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);

  useEffect(() => {
    const act = async () => {
      const repositories = await getRepositories({
        userName: MY_GITHUB_USERNAME,
      });
      setRepositories(repositories);
    };
    act();
  }, []);

  return (
    <RepositoriesContainer>
      {repositories.map((repo) => (
        <RepositoriesItem key={repo.name} repo={repo} />
      ))}
    </RepositoriesContainer>
  );
};
