import React, { useState } from "react";
import { Box, Grid } from "@mui/material";
import { TeamMemberList } from "./components";
import { User } from "@/models/user";
import { UsersList } from "@/components/widget/usersList";

export const TeamPage: React.FC = () => {
  const [teamMembers, setTeamMembers] = useState<User[]>([]);

  const handleRemoveMember = (user: User) => {
    setTeamMembers((prev) =>
      prev.filter((member) => member.login !== user.login)
    );
  };

  const handleAddMember = (user: User) => {
    const userAlreadyInTeam = teamMembers.find(
      (member) => member.login === user.login
    );
    if (!userAlreadyInTeam) {
      setTeamMembers((prev) => [user, ...prev]);
    }
  };

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
