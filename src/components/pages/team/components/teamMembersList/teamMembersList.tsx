import React from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import { UserCard } from "@/components/dummies/userCard";
import { User } from "@/models/user";

interface TeamMemberListProps {
  members: User[];
  onRemove: (member: User) => void;
}

export const TeamMemberList: React.FC<TeamMemberListProps> = ({
  members,
  onRemove,
}) => {
  return (
    <Box>
      <Typography variant="h5">Команда</Typography>
      {members.length === 0 ? (
        <Typography variant="body2" color="textSecondary">
          Добавьте пользователей в команду
        </Typography>
      ) : (
        <List>
          {members.map((member) => (
            <ListItem key={member.login} sx={{ padding: "8px 0" }}>
              <UserCard
                login={member.login}
                avatarUrl={member.avatar_url}
                userUrl={member.html_url}
                onDelete={() => onRemove(member)}
              />
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};
