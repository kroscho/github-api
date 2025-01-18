import { FC, useEffect, useState } from "react";
import { styled } from "@mui/system";
import { getFollofings } from "@/api";
import { MY_GITHUB_USERNAME } from "@/config/consts";
import { Following } from "@/models/user";
import { FollowingCard } from "@/components/dummies/followingCard";

const FollowingsContainer = styled("div")({
  paddingBottom: "32px",
  width: "100%",
});

interface FollowingsProps {}

export const Followings: FC<FollowingsProps> = ({}) => {
  const [follogings, setFollofings] = useState<Following[]>([]);

  useEffect(() => {
    const act = async () => {
      const followingsResponse = await getFollofings({
        userName: MY_GITHUB_USERNAME,
      });
      setFollofings(followingsResponse);
    };
    act();
  }, []);

  return (
    <FollowingsContainer>
      {follogings.map((following) => (
        <FollowingCard
          key={following.login}
          login={following.login}
          avatarUrl={following.avatar_url}
          userUrl={following.html_url}
        />
      ))}
    </FollowingsContainer>
  );
};
