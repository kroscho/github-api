import { FC, useCallback, useEffect, useState } from "react";
import { Box, List, ListItem, Typography } from "@mui/material";
import { UserCard } from "@/components/dummies/userCard";
import { User } from "@/models/user";
import { getUsers } from "@/api";
import { UsersSearchBar } from "./usersSearchBar/usersSearchBar";
import { ListWithSkeletons } from "@/components/wrapper/listWithSkeletons";

interface UsersListProps {
  onAdd: (user: User) => void;
  teamMembers: User[];
}

export const UsersList: FC<UsersListProps> = ({ onAdd, teamMembers }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchingError, setSearchingError] = useState(false);
  const [findedUser, setFindedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const handleGetUsers = useCallback(async () => {
    try {
      setLoading(true);
      const usersResponse = await getUsers({
        since: 50000000,
        per_page: 30,
      });
      setUsers(usersResponse);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    handleGetUsers();
  }, []);

  const renderUserNotFoundMessage = () => (
    <Typography variant="body2" color="textSecondary">
      Пользователь по вашему запросу не найден
    </Typography>
  );

  const renderEmptyMessage = () => (
    <Typography variant="body2" color="textSecondary">
      Нет пользователей
    </Typography>
  );

  const findedUserIsTeamMember = teamMembers.find(
    (member) => member.login === findedUser?.login
  );

  return (
    <Box>
      <Typography variant="h5" mb={2}>
        Пользователи
      </Typography>
      <UsersSearchBar
        setSearchingError={setSearchingError}
        setFindedUser={setFindedUser}
      />
      <ListWithSkeletons isLoading={loading}>
        <>
          {searchingError ? (
            renderUserNotFoundMessage()
          ) : users.length === 0 ? (
            renderEmptyMessage()
          ) : (
            <>
              {findedUser ? (
                <UserCard
                  login={findedUser.login}
                  avatarUrl={findedUser.avatar_url}
                  userUrl={findedUser.html_url}
                  onAdd={
                    findedUserIsTeamMember ? undefined : () => onAdd(findedUser)
                  }
                />
              ) : (
                <List>
                  {users.map((user) => {
                    const isTeamMember = teamMembers.find(
                      (member) => member.login === user.login
                    );
                    return (
                      <ListItem key={user.login} sx={{ padding: "8px 0" }}>
                        <UserCard
                          login={user.login}
                          avatarUrl={user.avatar_url}
                          userUrl={user.html_url}
                          onAdd={isTeamMember ? undefined : () => onAdd(user)}
                        />
                      </ListItem>
                    );
                  })}
                </List>
              )}
            </>
          )}
        </>
      </ListWithSkeletons>
    </Box>
  );
};
