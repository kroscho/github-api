import { FC, useEffect, useState } from "react";
import { styled } from "@mui/system";
import { getFollofings } from "@/api";
import { MY_GITHUB_USERNAME } from "@/config/consts";
import { Following } from "@/models/user";
import { ListWithSkeletons } from "@/components/wrapper/listWithSkeletons";
import { List, ListItem } from "@mui/material";
import { UserCard } from "@/components/dummies/userCard";

const FollowingsContainer = styled("div")({
  paddingBottom: "32px",
  width: "100%",
});

interface FollowingsProps {}

export const Followings: FC<FollowingsProps> = ({}) => {
  const [follogings, setFollofings] = useState<Following[]>([]);
  const [loading, setLoading] = useState(true);

  const handleGetFollofings = async () => {
    try {
      setLoading(true);
      const followingsResponse = await getFollofings({
        userName: MY_GITHUB_USERNAME,
      });
      setFollofings(followingsResponse);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetFollofings();
  }, []);

  return (
    <FollowingsContainer>
      <ListWithSkeletons isLoading={loading}>
        <List>
          {follogings.map((following) => {
            return (
              <ListItem key={following.login} sx={{ padding: "8px 0" }}>
                <UserCard
                  key={following.login}
                  login={following.login}
                  avatarUrl={following.avatar_url}
                  userUrl={following.html_url}
                />
              </ListItem>
            );
          })}
        </List>
      </ListWithSkeletons>
    </FollowingsContainer>
  );
};
