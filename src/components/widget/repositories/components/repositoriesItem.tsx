import { FC, useEffect, useState } from "react";
import { Repository } from "@/models/repository";
import { getRepositoryLanguages } from "@/api";
import { MY_GITHUB_USERNAME } from "@/config/consts";
import { RepositoryLanguages } from "@/models/reposioryLanguages";
import { RepositoryCard } from "@/components/dummies/repositoryCard";

interface RepositoriesItemProps {
  repo: Repository;
}

export const RepositoriesItem: FC<RepositoriesItemProps> = ({ repo }) => {
  const [languages, setLanguages] = useState<RepositoryLanguages>({});

  useEffect(() => {
    const act = async () => {
      const langsResponse = await getRepositoryLanguages({
        userName: MY_GITHUB_USERNAME,
        repoName: repo.name,
      });
      setLanguages(langsResponse);
    };
    act();
  }, []);

  return (
    <RepositoryCard
      name={repo.name}
      repoUrl={repo.svn_url}
      description={repo.description}
      createdAt={repo.created_at}
      cloneUrl={repo.clone_url}
      languages={Object.keys(languages)}
    />
  );
};
