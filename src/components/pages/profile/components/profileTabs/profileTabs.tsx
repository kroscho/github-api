import { ProfileTabEnum, profileTabsList } from "@/constants";
import { Box, Tab, Tabs } from "@mui/material";
import { FC } from "react";

interface ProfileTabsProps {
  activeTab: string;
  onChangeTab: (_: React.SyntheticEvent, newValue: ProfileTabEnum) => void;
}

export const ProfileTabs: FC<ProfileTabsProps> = ({
  activeTab,
  onChangeTab,
}) => {
  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={onChangeTab}
            aria-label="profile-tabs"
          >
            {profileTabsList.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
      </Box>
    </>
  );
};
