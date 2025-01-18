import { ProfileTabEnum, profileTabsList } from "@/constants";
import { Box, styled, Tab, Tabs } from "@mui/material";
import { FC } from "react";

interface ProfileTabsProps {
  activeTab: string;
  onChangeTab: (_: React.SyntheticEvent, newValue: ProfileTabEnum) => void;
}

const StyledTab = styled(Tab)(({ theme }) => ({
  padding: theme.spacing(2),
  fontSize: "1rem",

  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(1),
    fontSize: "0.75rem",
  },
}));

export const ProfileTabs: FC<ProfileTabsProps> = ({
  activeTab,
  onChangeTab,
}) => {
  return (
    <>
      <Box sx={{ width: "100%", marginBottom: "32px" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={activeTab}
            onChange={onChangeTab}
            aria-label="profile-tabs"
          >
            {profileTabsList.map((tab) => (
              <StyledTab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
        </Box>
      </Box>
    </>
  );
};
