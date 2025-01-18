import { FC } from "react";
import { styled } from "@mui/system";
import { Typography, Card, CardContent, Link, Avatar } from "@mui/material";

const FollowingCardContainer = styled(Card)({
  marginBottom: "16px",
});

interface FollowingCardProps {
  login: string;
  userUrl: string;
  avatarUrl: string;
}

export const FollowingCard: FC<FollowingCardProps> = ({
  login,
  userUrl,
  avatarUrl,
}) => {
  return (
    <FollowingCardContainer>
      <CardContent sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
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
      </CardContent>
    </FollowingCardContainer>
  );
};
