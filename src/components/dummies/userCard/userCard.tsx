import { FC } from "react";
import { styled } from "@mui/system";
import {
  Typography,
  Card,
  CardContent,
  Link,
  Avatar,
  Button,
  Stack,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

const UserCardContainer = styled(Card)({
  // marginBottom: "16px",
  width: "100%",
});

interface UserCardProps {
  login: string;
  userUrl: string;
  avatarUrl: string;
  onDelete?: () => void;
  onAdd?: () => void;
}

export const UserCard: FC<UserCardProps> = ({
  login,
  userUrl,
  avatarUrl,
  onDelete,
  onAdd,
}) => {
  const isMobile = useMediaQuery("(max-width:600px");

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 2,
          justifyContent: "space-between",
        }}
      >
        <Stack direction="row" gap={1} flexWrap={"wrap"}>
          <Avatar
            src={avatarUrl}
            alt="User Avatar"
            sx={{ width: 50, height: 50 }}
          />
          <Typography variant="h6">
            <Link
              href={userUrl}
              target="_blank"
              rel="noopener noreferrer"
              color="textPrimary"
              underline="none"
            >
              {login}
            </Link>
          </Typography>
        </Stack>
        {onDelete &&
          (isMobile ? (
            <IconButton onClick={onDelete} color="error">
              <DeleteIcon />
            </IconButton>
          ) : (
            <Button variant="outlined" color="error" onClick={onDelete}>
              Убрать
            </Button>
          ))}
        {onAdd &&
          (isMobile ? (
            <IconButton onClick={onAdd} color="primary">
              <AddIcon />
            </IconButton>
          ) : (
            <Button variant="outlined" color="primary" onClick={onAdd}>
              Добавить
            </Button>
          ))}
      </CardContent>
    </Card>
  );
};
