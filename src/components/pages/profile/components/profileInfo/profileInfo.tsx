import { Link, styled, Typography } from "@mui/material";
import { FC } from "react";

const Avatar = styled("img")({
  borderRadius: "50%",
  width: "150px",
  height: "150px",
  marginBottom: "16px",
});

interface ProfileInfoProps {
  avatarUrl: string;
  login: string;
  profileUrl: string;
  createdAt: string;
}

export const ProfileInfo: FC<ProfileInfoProps> = ({
  avatarUrl,
  login,
  profileUrl,
  createdAt,
}) => {
  return (
    <>
      <Avatar src={avatarUrl} alt="User Avatar" />
      <Typography variant="h6">
        <Link
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          color="textPrimary"
          underline="none"
        >
          {login}
        </Link>
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Аккаунт создан: {new Date(createdAt).toLocaleDateString()}
      </Typography>
    </>
  );
};
