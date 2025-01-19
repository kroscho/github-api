import { FC, useEffect, useState } from "react";
import { styled } from "@mui/system";
import { Repository } from "@/models/repository";
import { getRepositories } from "@/api";
import { MY_GITHUB_USERNAME } from "@/config/consts";
import { RepositoriesItem } from "./components/repositoriesItem";
import { List, ListItem } from "@mui/material";
import { ListWithSkeletons } from "@/components/wrapper/listWithSkeletons";

const RepositoriesContainer = styled("div")({
  paddingBottom: "32px",
  width: "100%",
});

interface RepositoriesProps {}

export const Repositories: FC<RepositoriesProps> = ({}) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetRepositories = async () => {
    try {
      setLoading(true);
      const repositories = await getRepositories({
        userName: MY_GITHUB_USERNAME,
      });
      setRepositories(repositories);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetRepositories();
  }, []);

  return (
    <RepositoriesContainer>
      <ListWithSkeletons isLoading={loading}>
        <List>
          {repositories.map((repo) => {
            return (
              <ListItem key={repo.name} sx={{ padding: "8px 0" }}>
                <RepositoriesItem repo={repo} />
              </ListItem>
            );
          })}
        </List>
      </ListWithSkeletons>
    </RepositoriesContainer>
  );
};
