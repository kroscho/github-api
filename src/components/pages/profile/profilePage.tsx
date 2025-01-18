import { styled } from "@mui/material";
import { useEffect, useState } from "react";
import { getUser } from "@/api";
import { User } from "@/models/user";
import { MY_GITHUB_USERNAME } from "@/config/consts";
import { Repositories } from "@/components/widget/repositories";
import { ProfileTabEnum } from "@/constants";
import { ProfileInfo, ProfileTabs } from "./components";
import { Followings } from "@/components/widget/followings";
import { TeamTab } from "@/components/widget/teamTab";

const ProfileContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  padding: "32px 0",
});

export const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState(ProfileTabEnum.REPOSITORIES);

  const onChangeTab = (_: React.SyntheticEvent, newValue: ProfileTabEnum) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const act = async () => {
      const user = await getUser({ userName: MY_GITHUB_USERNAME });
      setUser(user);
    };
    act();
  }, []);

  if (!user) return null;

  return (
    <ProfileContainer>
      <ProfileInfo
        avatarUrl={user.avatar_url}
        login={user.login}
        profileUrl={user.html_url}
        createdAt={user.created_at}
      />
      <ProfileTabs activeTab={activeTab} onChangeTab={onChangeTab} />
      {activeTab === ProfileTabEnum.REPOSITORIES && <Repositories />}
      {activeTab === ProfileTabEnum.FOLLOWING && <Followings />}
      {activeTab === ProfileTabEnum.TEAM && <TeamTab />}
    </ProfileContainer>
  );
};
