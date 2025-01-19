import { FC } from "react";
import { Box, Grid } from "@mui/material";
import { TeamMemberList } from "./components";
import { UsersList } from "@/components/widget/usersList";
import { useTeamPage } from "./hooks";

export const TeamPage: FC = () => {
  const { teamMembers, handleRemoveMember, handleAddMember } = useTeamPage();

  return (
    <Box mt={4}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TeamMemberList members={teamMembers} onRemove={handleRemoveMember} />
        </Grid>
        <Grid item xs={12} md={6}>
          <UsersList onAdd={handleAddMember} teamMembers={teamMembers} />
        </Grid>
      </Grid>
    </Box>
  );
};
